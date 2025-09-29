// Background Service Worker for Commentator Extension
// Handles API communication, YouTube integration, and audio playback coordination

const API_BASE_URL = 'http://localhost:3000/api';

// Extension state
let currentCommentary = null;
let syncOffset = 0;
let isPlaying = false;

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Commentator extension installed');
});

// Handle messages from content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'VIDEO_DETECTED':
      handleVideoDetected(message.data, sender.tab);
      break;
    
    case 'GET_COMMENTARIES':
      getCommentariesForMatch(message.matchId).then(sendResponse);
      return true; // Keep message channel open for async response
    
    case 'START_COMMENTARY':
      startCommentary(message.commentary, message.videoTime);
      break;
    
    case 'STOP_COMMENTARY':
      stopCommentary();
      break;
    
    case 'ADJUST_SYNC':
      adjustSync(message.delta);
      break;
    
    case 'GET_SYNC_STATUS':
      sendResponse({
        isPlaying,
        currentCommentary,
        syncOffset
      });
      break;
    
    case 'DETECT_MATCH':
      detectMatch(message.url, message.title).then(sendResponse);
      return true;
  }
});

// Detect match from URL and page title
async function detectMatch(url, title) {
  try {
    const params = new URLSearchParams({
      url: encodeURIComponent(url),
      title: encodeURIComponent(title || '')
    });
    
    const response = await fetch(`${API_BASE_URL}/matches/detect?${params}`);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error detecting match:', error);
    return { match: null, confidence: 'none', suggestions: [] };
  }
}

// Get available commentaries for a match
async function getCommentariesForMatch(matchId) {
  try {
    const response = await fetch(`${API_BASE_URL}/commentaries/live?matchId=${matchId}`);
    const data = await response.json();
    
    return data.commentaries || [];
  } catch (error) {
    console.error('Error fetching commentaries:', error);
    return [];
  }
}

// Start commentary playback
async function startCommentary(commentary, videoTime) {
  try {
    currentCommentary = commentary;
    isPlaying = true;
    
    // Get saved sync offset for this commentary
    const savedOffset = await getSavedSyncOffset(commentary.id);
    syncOffset = savedOffset || commentary.avgLatency || 0;
    
    // Create offscreen document for audio playback
    await createOffscreenDocument();
    
    // Start YouTube audio with offset
    const startTime = Math.max(0, (videoTime * 1000 + syncOffset) / 1000);
    
    chrome.runtime.sendMessage({
      type: 'START_YOUTUBE_AUDIO',
      videoId: commentary.youtubeStreamId,
      startTime: startTime
    });
    
    // Notify content script that commentary started
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'COMMENTARY_STARTED',
          commentary: commentary,
          syncOffset: syncOffset
        });
      }
    });
    
  } catch (error) {
    console.error('Error starting commentary:', error);
    isPlaying = false;
    currentCommentary = null;
  }
}

// Stop commentary playback
function stopCommentary() {
  isPlaying = false;
  currentCommentary = null;
  
  // Stop YouTube audio
  chrome.runtime.sendMessage({
    type: 'STOP_YOUTUBE_AUDIO'
  });
  
  // Notify content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'COMMENTARY_STOPPED'
      });
    }
  });
}

// Adjust sync offset
async function adjustSync(delta) {
  syncOffset += delta;
  
  // Save new offset
  if (currentCommentary) {
    await saveSyncOffset(currentCommentary.id, syncOffset);
    
    // Report to API for crowd-sourced sync improvement
    reportSyncOffset(currentCommentary.id, syncOffset);
  }
  
  // Apply adjustment to YouTube player
  chrome.runtime.sendMessage({
    type: 'ADJUST_YOUTUBE_SYNC',
    delta: delta
  });
  
  // Notify content script of new offset
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'SYNC_ADJUSTED',
        newOffset: syncOffset
      });
    }
  });
}

// Create offscreen document for audio playback (Manifest V3 requirement)
async function createOffscreenDocument() {
  // Check if offscreen document already exists
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT']
  });
  
  if (existingContexts.length > 0) {
    return; // Already exists
  }
  
  // Create new offscreen document
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'Playing alternative commentary audio from YouTube'
  });
}

// Save sync offset to local storage
async function saveSyncOffset(commentaryId, offset) {
  const key = `sync_offset_${commentaryId}`;
  await chrome.storage.local.set({ [key]: offset });
}

// Get saved sync offset from local storage
async function getSavedSyncOffset(commentaryId) {
  const key = `sync_offset_${commentaryId}`;
  const result = await chrome.storage.local.get([key]);
  return result[key] || null;
}

// Report sync offset to API for crowd-sourced improvement
async function reportSyncOffset(commentaryId, offset) {
  try {
    await fetch(`${API_BASE_URL}/sync/${commentaryId}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reportedOffset: offset,
        streamPlatform: await detectStreamPlatform()
      })
    });
  } catch (error) {
    console.error('Error reporting sync offset:', error);
  }
}

// Detect current streaming platform
async function detectStreamPlatform() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      const url = new URL(tabs[0].url);
      const hostname = url.hostname.toLowerCase();
      
      const platforms = {
        'netflix.com': 'netflix',
        'dazn.com': 'dazn',
        'amazon.com': 'prime_video',
        'primevideo.com': 'prime_video',
        'sky.com': 'sky',
        'bein.com': 'bein',
        'espn.com': 'espn',
        'peacocktv.com': 'peacock'
      };
      
      for (let domain in platforms) {
        if (hostname.includes(domain)) {
          return platforms[domain];
        }
      }
    }
  } catch (error) {
    console.error('Error detecting platform:', error);
  }
  
  return 'unknown';
}

// Handle video detected from content script
function handleVideoDetected(videoData, tab) {
  console.log('Video detected:', videoData);
  
  // Store video info for popup
  chrome.storage.local.set({
    currentVideo: {
      ...videoData,
      tabId: tab.id,
      url: tab.url,
      title: tab.title
    }
  });
  
  // Update extension badge
  chrome.action.setBadgeText({
    text: '⚽',
    tabId: tab.id
  });
  
  chrome.action.setBadgeBackgroundColor({
    color: '#4CAF50',
    tabId: tab.id
  });
}