// Content Script for Commentator Extension
// Detects video players, mutes original audio, and manages sync

console.log('Commentator extension content script loaded');

// State
let videoElement = null;
let originalVolume = 1;
let isCommentaryActive = false;
let syncOffset = 0;
let syncMonitorInterval = null;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

function initialize() {
  console.log('Initializing Commentator extension...');
  
  // Detect video players
  detectVideoPlayers();
  
  // Set up mutation observer for dynamically loaded videos
  setupVideoDetectionObserver();
  
  // Listen for messages from background script
  chrome.runtime.onMessage.addListener(handleMessage);
  
  // Detect match and notify background
  detectAndReportMatch();
}

// Detect video players on the page
function detectVideoPlayers() {
  // Common video selectors for major streaming platforms
  const videoSelectors = [
    'video',
    '.video-player video',
    '[data-testid="video-player"] video',
    '.player-video video',
    '#video-player video',
    '.netflix-player video',
    '.dazn-player video'
  ];
  
  for (let selector of videoSelectors) {
    const videos = document.querySelectorAll(selector);
    
    for (let video of videos) {
      if (isValidVideoElement(video)) {
        console.log('Video player detected:', video);
        setVideoElement(video);
        return; // Use first valid video found
      }
    }
  }
  
  console.log('No video players detected yet');
}

// Check if video element is valid for commentary
function isValidVideoElement(video) {
  // Must be a video element
  if (video.tagName !== 'VIDEO') return false;
  
  // Must have reasonable dimensions (not a tiny thumbnail)
  const rect = video.getBoundingClientRect();
  if (rect.width < 200 || rect.height < 150) return false;
  
  // Must have duration (not a live stream without duration is OK)
  if (video.readyState < 2) return false; // HAVE_CURRENT_DATA
  
  // Should be visible
  if (video.style.display === 'none' || video.hidden) return false;
  
  return true;
}

// Set the active video element
function setVideoElement(video) {
  if (videoElement === video) return; // Already set
  
  videoElement = video;
  originalVolume = video.volume;
  
  // Set up video event listeners
  setupVideoEventListeners(video);
  
  // Get video info
  const videoInfo = getVideoInfo(video);
  
  // Notify background script
  chrome.runtime.sendMessage({
    type: 'VIDEO_DETECTED',
    data: videoInfo
  });
  
  console.log('Video element set:', videoInfo);
}

// Get information about the video
function getVideoInfo(video) {
  const rect = video.getBoundingClientRect();
  
  return {
    currentTime: video.currentTime,
    duration: video.duration,
    paused: video.paused,
    muted: video.muted,
    volume: video.volume,
    width: rect.width,
    height: rect.height,
    src: video.src || video.currentSrc,
    readyState: video.readyState
  };
}

// Set up event listeners for video element
function setupVideoEventListeners(video) {
  // Remove existing listeners if any
  if (video._commentatorListeners) {
    video._commentatorListeners.forEach(({ event, handler }) => {
      video.removeEventListener(event, handler);
    });
  }
  
  const listeners = [];
  
  // Play/pause events
  const playHandler = () => {
    if (isCommentaryActive) {
      chrome.runtime.sendMessage({
        type: 'VIDEO_PLAY',
        currentTime: video.currentTime
      });
    }
  };
  
  const pauseHandler = () => {
    if (isCommentaryActive) {
      chrome.runtime.sendMessage({
        type: 'VIDEO_PAUSE',
        currentTime: video.currentTime
      });
    }
  };
  
  // Seek events
  const seekHandler = () => {
    if (isCommentaryActive) {
      chrome.runtime.sendMessage({
        type: 'VIDEO_SEEK',
        currentTime: video.currentTime
      });
    }
  };
  
  // Volume change events (prevent unmuting)
  const volumeChangeHandler = () => {
    if (isCommentaryActive && !video.muted) {
      // Re-mute if user tries to unmute
      video.muted = true;
      video.volume = 0;
    }
  };
  
  video.addEventListener('play', playHandler);
  video.addEventListener('pause', pauseHandler);
  video.addEventListener('seeked', seekHandler);
  video.addEventListener('volumechange', volumeChangeHandler);
  
  listeners.push(
    { event: 'play', handler: playHandler },
    { event: 'pause', handler: pauseHandler },
    { event: 'seeked', handler: seekHandler },
    { event: 'volumechange', handler: volumeChangeHandler }
  );
  
  video._commentatorListeners = listeners;
}

// Set up mutation observer to detect dynamically loaded videos
function setupVideoDetectionObserver() {
  const observer = new MutationObserver((mutations) => {
    let shouldCheckForVideos = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if any video elements were added
        for (let node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'VIDEO' || node.querySelector('video')) {
              shouldCheckForVideos = true;
              break;
            }
          }
        }
      }
    });
    
    if (shouldCheckForVideos && !videoElement) {
      setTimeout(detectVideoPlayers, 1000); // Delay to let video load
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Handle messages from background script
function handleMessage(message, sender, sendResponse) {
  switch (message.type) {
    case 'COMMENTARY_STARTED':
      handleCommentaryStarted(message.commentary, message.syncOffset);
      break;
    
    case 'COMMENTARY_STOPPED':
      handleCommentaryStopped();
      break;
    
    case 'SYNC_ADJUSTED':
      handleSyncAdjusted(message.newOffset);
      break;
    
    case 'GET_VIDEO_INFO':
      sendResponse(videoElement ? getVideoInfo(videoElement) : null);
      break;
  }
}

// Handle commentary started
function handleCommentaryStarted(commentary, offset) {
  console.log('Commentary started:', commentary);
  
  if (!videoElement) {
    console.error('No video element found for commentary');
    return;
  }
  
  isCommentaryActive = true;
  syncOffset = offset;
  
  // Mute original audio
  muteOriginalAudio();
  
  // Start sync monitoring
  startSyncMonitoring();
  
  // Show notification
  showNotification(`Commentary started: ${commentary.title}`, 'success');
}

// Handle commentary stopped
function handleCommentaryStopped() {
  console.log('Commentary stopped');
  
  isCommentaryActive = false;
  
  // Unmute original audio
  unmuteOriginalAudio();
  
  // Stop sync monitoring
  stopSyncMonitoring();
  
  // Show notification
  showNotification('Commentary stopped', 'info');
}

// Handle sync adjustment
function handleSyncAdjusted(newOffset) {
  syncOffset = newOffset;
  console.log('Sync adjusted to:', newOffset + 'ms');
  
  // Show temporary sync indicator
  showSyncIndicator(newOffset);
}

// Mute original video audio
function muteOriginalAudio() {
  if (!videoElement) return;
  
  originalVolume = videoElement.volume;
  videoElement.muted = true;
  videoElement.volume = 0;
  
  console.log('Original audio muted');
}

// Unmute original video audio
function unmuteOriginalAudio() {
  if (!videoElement) return;
  
  videoElement.muted = false;
  videoElement.volume = originalVolume;
  
  console.log('Original audio unmuted');
}

// Start monitoring sync between video and commentary
function startSyncMonitoring() {
  if (syncMonitorInterval) {
    clearInterval(syncMonitorInterval);
  }
  
  syncMonitorInterval = setInterval(() => {
    if (!videoElement || !isCommentaryActive) return;
    
    // Get current video time
    const videoTime = videoElement.currentTime * 1000; // Convert to ms
    
    // Send sync check to background
    chrome.runtime.sendMessage({
      type: 'SYNC_CHECK',
      videoTime: videoTime,
      syncOffset: syncOffset
    });
    
  }, 1000); // Check every second
}

// Stop sync monitoring
function stopSyncMonitoring() {
  if (syncMonitorInterval) {
    clearInterval(syncMonitorInterval);
    syncMonitorInterval = null;
  }
}

// Detect match from current page and report to background
function detectAndReportMatch() {
  const url = window.location.href;
  const title = document.title;
  
  // Also try to get more specific match info from page content
  const enhancedTitle = extractMatchInfoFromPage() || title;
  
  chrome.runtime.sendMessage({
    type: 'DETECT_MATCH',
    url: url,
    title: enhancedTitle
  });
}

// Extract match information from page content
function extractMatchInfoFromPage() {
  // Try to find match info in common locations
  const selectors = [
    '[data-testid="match-title"]',
    '.match-title',
    '.game-title',
    '.event-title',
    'h1',
    '.title'
  ];
  
  for (let selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent) {
      const text = element.textContent.trim();
      // Look for pattern like "Team A vs Team B" or "Team A - Team B"
      if (text.match(/\w+\s+(vs|v|-)?\s+\w+/i)) {
        return text;
      }
    }
  }
  
  return null;
}

// Show notification to user
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `commentator-notification commentator-${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    zIndex: '10000',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    transition: 'opacity 0.3s ease'
  });
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Show sync offset indicator
function showSyncIndicator(offset) {
  // Remove existing indicator
  const existing = document.querySelector('.commentator-sync-indicator');
  if (existing) {
    existing.remove();
  }
  
  // Create new indicator
  const indicator = document.createElement('div');
  indicator.className = 'commentator-sync-indicator';
  
  const offsetSeconds = (offset / 1000).toFixed(1);
  const sign = offset >= 0 ? '+' : '';
  indicator.textContent = `Sync: ${sign}${offsetSeconds}s`;
  
  // Style the indicator
  Object.assign(indicator.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    zIndex: '10001',
    transition: 'opacity 0.3s ease'
  });
  
  document.body.appendChild(indicator);
  
  // Remove after 2 seconds
  setTimeout(() => {
    indicator.style.opacity = '0';
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }, 300);
  }, 2000);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (isCommentaryActive) {
    chrome.runtime.sendMessage({ type: 'STOP_COMMENTARY' });
  }
});