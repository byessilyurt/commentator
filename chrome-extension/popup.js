// Popup script for Commentator Extension
console.log('Commentator popup loaded');

// State
let currentMatch = null;
let availableCommentaries = [];
let selectedCommentary = null;
let isCommentaryActive = false;
let currentSyncOffset = 0;

// DOM elements
const loadingEl = document.getElementById('loading');
const noMatchEl = document.getElementById('no-match');
const matchDetectedEl = document.getElementById('match-detected');
const statusIndicatorEl = document.getElementById('status-indicator');
const statusTextEl = document.getElementById('status-text');
const matchInfoEl = document.getElementById('match-info');
const commentariesListEl = document.getElementById('commentaries-list');
const syncControlsEl = document.getElementById('sync-controls');
const syncOffsetEl = document.getElementById('sync-offset');
const stopBtnEl = document.getElementById('stop-btn');
const webAppBtnEl = document.getElementById('web-app-btn');

// Initialize popup
document.addEventListener('DOMContentLoaded', initialize);

async function initialize() {
  console.log('Initializing popup...');
  
  // Set up event listeners
  setupEventListeners();
  
  // Get current sync status
  const syncStatus = await getSyncStatus();
  if (syncStatus.isPlaying) {
    isCommentaryActive = true;
    selectedCommentary = syncStatus.currentCommentary;
    currentSyncOffset = syncStatus.syncOffset;
  }
  
  // Get current video info
  const videoInfo = await getCurrentVideoInfo();
  
  if (videoInfo) {
    // Detect match
    await detectMatch();
  } else {
    showNoMatch();
  }
}

// Set up event listeners
function setupEventListeners() {
  // Sync control buttons
  document.querySelectorAll('.sync-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.dataset.delta);
      adjustSync(delta);
    });
  });
  
  // Stop button
  stopBtnEl.addEventListener('click', stopCommentary);
  
  // Web app button
  webAppBtnEl.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000' });
  });
}

// Get current sync status from background
async function getSyncStatus() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'GET_SYNC_STATUS' }, resolve);
  });
}

// Get current video info from content script
async function getCurrentVideoInfo() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_VIDEO_INFO' }, (response) => {
          resolve(response);
        });
      } else {
        resolve(null);
      }
    });
  });
}

// Detect match from current page
async function detectMatch() {
  try {
    showLoading();
    
    // Get current tab info
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tabs[0]) {
      showNoMatch();
      return;
    }
    
    const tab = tabs[0];
    
    // Send detection request to background
    const result = await new Promise((resolve) => {
      chrome.runtime.sendMessage({
        type: 'DETECT_MATCH',
        url: tab.url,
        title: tab.title
      }, resolve);
    });
    
    if (result.match) {
      currentMatch = result.match;
      await loadCommentaries(result.match.id);
      showMatchDetected();
    } else if (result.suggestions && result.suggestions.length > 0) {
      // Show manual match selection
      showMatchSuggestions(result.suggestions);
    } else {
      showNoMatch();
    }
    
  } catch (error) {
    console.error('Error detecting match:', error);
    showNoMatch();
  }
}

// Load available commentaries for match
async function loadCommentaries(matchId) {
  try {
    availableCommentaries = await new Promise((resolve) => {
      chrome.runtime.sendMessage({
        type: 'GET_COMMENTARIES',
        matchId: matchId
      }, resolve);
    });
    
    renderCommentaries();
    
  } catch (error) {
    console.error('Error loading commentaries:', error);
    availableCommentaries = [];
    renderCommentaries();
  }
}

// Render commentaries list
function renderCommentaries() {
  commentariesListEl.innerHTML = '';
  
  if (availableCommentaries.length === 0) {
    commentariesListEl.innerHTML = `
      <div style="text-align: center; padding: 20px; opacity: 0.8;">
        <div>📻</div>
        <div style="margin: 8px 0;">No live commentaries available</div>
        <div style="font-size: 12px;">Check back during match time</div>
      </div>
    `;
    return;
  }
  
  availableCommentaries.forEach(commentary => {
    const card = createCommentaryCard(commentary);
    commentariesListEl.appendChild(card);
  });
}

// Create commentary card element
function createCommentaryCard(commentary) {
  const card = document.createElement('div');
  card.className = 'commentary-card';
  if (selectedCommentary && selectedCommentary.id === commentary.id) {
    card.classList.add('active');
  }
  
  const isLive = commentary.status === 'live';
  const language = getLanguageFlag(commentary.language);
  
  card.innerHTML = `
    <div class="commentary-header">
      <div class="commentator-name">${commentary.commentator.name}</div>
      ${isLive ? '<div class="live-badge">LIVE</div>' : ''}
    </div>
    <div class="commentary-meta">
      <span>${language} ${getLanguageName(commentary.language)}</span>
      <span>👥 ${commentary.viewCount}</span>
      <span>⭐ ${commentary.rating.toFixed(1)}</span>
    </div>
  `;
  
  card.addEventListener('click', () => selectCommentary(commentary));
  
  return card;
}

// Select commentary
async function selectCommentary(commentary) {
  if (selectedCommentary && selectedCommentary.id === commentary.id) {
    return; // Already selected
  }
  
  selectedCommentary = commentary;
  
  // Update UI
  renderCommentaries();
  
  // Get current video time
  const videoInfo = await getCurrentVideoInfo();
  if (!videoInfo) {
    alert('No video detected. Please make sure a video is playing.');
    return;
  }
  
  // Start commentary
  chrome.runtime.sendMessage({
    type: 'START_COMMENTARY',
    commentary: commentary,
    videoTime: videoInfo.currentTime
  });
  
  // Update UI state
  isCommentaryActive = true;
  updateUIState();
}

// Stop commentary
function stopCommentary() {
  chrome.runtime.sendMessage({ type: 'STOP_COMMENTARY' });
  
  isCommentaryActive = false;
  selectedCommentary = null;
  currentSyncOffset = 0;
  
  updateUIState();
  renderCommentaries();
}

// Adjust sync
function adjustSync(delta) {
  chrome.runtime.sendMessage({
    type: 'ADJUST_SYNC',
    delta: delta
  });
  
  currentSyncOffset += delta;
  updateSyncDisplay();
}

// Update sync display
function updateSyncDisplay() {
  const offsetSeconds = (currentSyncOffset / 1000).toFixed(1);
  const sign = currentSyncOffset >= 0 ? '+' : '';
  syncOffsetEl.textContent = `${sign}${offsetSeconds}s`;
}

// Update UI state based on current status
function updateUIState() {
  if (isCommentaryActive) {
    statusIndicatorEl.classList.remove('inactive');
    statusTextEl.textContent = 'Commentary Active';
    syncControlsEl.classList.remove('hidden');
    stopBtnEl.classList.remove('hidden');
    updateSyncDisplay();
  } else {
    statusIndicatorEl.classList.add('inactive');
    statusTextEl.textContent = 'Match Detected';
    syncControlsEl.classList.add('hidden');
    stopBtnEl.classList.add('hidden');
  }
}

// Show loading state
function showLoading() {
  loadingEl.classList.remove('hidden');
  noMatchEl.classList.add('hidden');
  matchDetectedEl.classList.add('hidden');
}

// Show no match state
function showNoMatch() {
  loadingEl.classList.add('hidden');
  noMatchEl.classList.remove('hidden');
  matchDetectedEl.classList.add('hidden');
}

// Show match detected state
function showMatchDetected() {
  loadingEl.classList.add('hidden');
  noMatchEl.classList.add('hidden');
  matchDetectedEl.classList.remove('hidden');
  
  if (currentMatch) {
    matchInfoEl.textContent = `${currentMatch.homeTeam} vs ${currentMatch.awayTeam}`;
  }
  
  updateUIState();
}

// Show match suggestions for manual selection
function showMatchSuggestions(suggestions) {
  // For now, just show the first suggestion
  // In a full implementation, you'd show a selection UI
  if (suggestions.length > 0) {
    currentMatch = suggestions[0];
    loadCommentaries(currentMatch.id);
    showMatchDetected();
  } else {
    showNoMatch();
  }
}

// Get language flag emoji
function getLanguageFlag(languageCode) {
  const flags = {
    'en': '🇬🇧',
    'es': '🇪🇸',
    'fr': '🇫🇷',
    'de': '🇩🇪',
    'it': '🇮🇹',
    'pt': '🇵🇹',
    'tr': '🇹🇷',
    'ar': '🇸🇦'
  };
  
  return flags[languageCode] || '🌐';
}

// Get language name
function getLanguageName(languageCode) {
  const names = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'tr': 'Turkish',
    'ar': 'Arabic'
  };
  
  return names[languageCode] || 'Unknown';
}