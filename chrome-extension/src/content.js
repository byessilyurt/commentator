// Enhanced Content Script for Commentator Extension
// This file replaces the basic content.js with more robust video detection

console.log('Commentator extension content script loaded (enhanced)');

// State management
class CommentatorContentScript {
  constructor() {
    this.videoElement = null;
    this.originalVolume = 1;
    this.originalMuted = false;
    this.isCommentaryActive = false;
    this.syncOffset = 0;
    this.syncMonitorInterval = null;
    this.videoObserver = null;
    this.lastVideoTime = 0;
    this.syncCheckInterval = null;
    
    this.init();
  }
  
  init() {
    console.log('Initializing Commentator extension...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }
  
  start() {
    // Detect existing video players
    this.detectVideoPlayers();
    
    // Set up observers for dynamic content
    this.setupVideoDetectionObserver();
    
    // Listen for messages from background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
    });
    
    // Detect and report match information
    this.detectAndReportMatch();
    
    // Set up periodic video detection (fallback)
    setInterval(() => {
      if (!this.videoElement) {
        this.detectVideoPlayers();
      }
    }, 5000);
  }
  
  // Enhanced video detection for multiple platforms
  detectVideoPlayers() {
    const platformSelectors = {
      // Netflix
      netflix: [
        '.watch-video video',
        '.NFPlayer video',
        '[data-uia="player"] video'
      ],
      
      // DAZN
      dazn: [
        '.player-container video',
        '.dazn-player video',
        '[data-testid="video-player"] video'
      ],
      
      // Amazon Prime Video
      amazon: [
        '.webPlayerContainer video',
        '.webPlayerSDKContainer video',
        '[data-testid="web-player-view"] video'
      ],
      
      // Sky
      sky: [
        '.sky-player video',
        '.player-wrapper video'
      ],
      
      // BeIN Sports
      bein: [
        '.bein-player video',
        '.video-player video'
      ],
      
      // ESPN
      espn: [
        '.player-container video',
        '.espn-player video'
      ],
      
      // Generic selectors (fallback)
      generic: [
        'video',
        '.video-player video',
        '.player video',
        '[class*="player"] video',
        '[id*="player"] video',
        '[data-testid*="video"] video',
        '[data-testid*="player"] video'
      ]
    };
    
    // Detect platform
    const hostname = window.location.hostname.toLowerCase();
    let platform = 'generic';
    
    if (hostname.includes('netflix')) platform = 'netflix';
    else if (hostname.includes('dazn')) platform = 'dazn';
    else if (hostname.includes('amazon') || hostname.includes('primevideo')) platform = 'amazon';
    else if (hostname.includes('sky')) platform = 'sky';
    else if (hostname.includes('bein')) platform = 'bein';
    else if (hostname.includes('espn')) platform = 'espn';
    
    // Try platform-specific selectors first, then generic
    const selectorsToTry = [
      ...(platformSelectors[platform] || []),
      ...platformSelectors.generic
    ];
    
    for (let selector of selectorsToTry) {
      const videos = document.querySelectorAll(selector);
      
      for (let video of videos) {
        if (this.isValidVideoElement(video)) {
          console.log(`Video player detected on ${platform}:`, video);
          this.setVideoElement(video);
          return true;
        }
      }
    }
    
    console.log('No valid video players detected');
    return false;
  }
  
  // Enhanced video validation
  isValidVideoElement(video) {
    if (video.tagName !== 'VIDEO') return false;
    if (video === this.videoElement) return false; // Already set
    
    // Check dimensions
    const rect = video.getBoundingClientRect();
    if (rect.width < 200 || rect.height < 150) return false;
    
    // Check if video is visible
    if (rect.width === 0 || rect.height === 0) return false;
    if (video.style.display === 'none' || video.hidden) return false;
    
    // Check if video has content
    if (video.readyState < 2 && video.networkState === 3) return false; // No data
    
    // Prefer videos that are currently playing or have played
    const hasPlayedContent = video.currentTime > 0 || !video.paused;
    
    // Prefer larger videos (main content vs thumbnails)
    const area = rect.width * rect.height;
    const isMainVideo = area > 50000; // Roughly 250x200 or larger
    
    return hasPlayedContent || isMainVideo;
  }
  
  // Set active video element
  setVideoElement(video) {
    if (this.videoElement === video) return;
    
    // Clean up previous video
    if (this.videoElement) {
      this.cleanupVideoListeners(this.videoElement);
    }
    
    this.videoElement = video;
    this.originalVolume = video.volume;
    this.originalMuted = video.muted;
    
    // Set up event listeners
    this.setupVideoEventListeners(video);
    
    // Get video information
    const videoInfo = this.getVideoInfo(video);
    
    // Notify background script
    chrome.runtime.sendMessage({
      type: 'VIDEO_DETECTED',
      data: videoInfo
    });
    
    console.log('Video element set:', videoInfo);
  }
  
  // Get comprehensive video information
  getVideoInfo(video) {
    const rect = video.getBoundingClientRect();
    
    return {
      currentTime: video.currentTime,
      duration: video.duration,
      paused: video.paused,
      muted: video.muted,
      volume: video.volume,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      src: video.src || video.currentSrc,
      readyState: video.readyState,
      networkState: video.networkState,
      playbackRate: video.playbackRate,
      platform: this.detectPlatform()
    };
  }
  
  // Detect streaming platform
  detectPlatform() {
    const hostname = window.location.hostname.toLowerCase();
    
    if (hostname.includes('netflix')) return 'netflix';
    if (hostname.includes('dazn')) return 'dazn';
    if (hostname.includes('amazon') || hostname.includes('primevideo')) return 'amazon';
    if (hostname.includes('sky')) return 'sky';
    if (hostname.includes('bein')) return 'bein';
    if (hostname.includes('espn')) return 'espn';
    if (hostname.includes('peacocktv')) return 'peacock';
    if (hostname.includes('paramountplus')) return 'paramount';
    
    return 'unknown';
  }
  
  // Set up comprehensive video event listeners
  setupVideoEventListeners(video) {
    const events = {
      play: () => this.onVideoPlay(),
      pause: () => this.onVideoPause(),
      seeked: () => this.onVideoSeeked(),
      timeupdate: () => this.onVideoTimeUpdate(),
      volumechange: () => this.onVideoVolumeChange(),
      ratechange: () => this.onVideoRateChange(),
      ended: () => this.onVideoEnded(),
      error: () => this.onVideoError(),
      loadstart: () => this.onVideoLoadStart(),
      canplay: () => this.onVideoCanPlay()
    };
    
    // Store listeners for cleanup
    video._commentatorListeners = [];
    
    Object.entries(events).forEach(([event, handler]) => {
      video.addEventListener(event, handler);
      video._commentatorListeners.push({ event, handler });
    });
  }
  
  // Clean up video event listeners
  cleanupVideoListeners(video) {
    if (video._commentatorListeners) {
      video._commentatorListeners.forEach(({ event, handler }) => {
        video.removeEventListener(event, handler);
      });
      delete video._commentatorListeners;
    }
  }
  
  // Video event handlers
  onVideoPlay() {
    if (this.isCommentaryActive) {
      chrome.runtime.sendMessage({
        type: 'VIDEO_PLAY',
        currentTime: this.videoElement.currentTime
      });
    }
  }
  
  onVideoPause() {
    if (this.isCommentaryActive) {
      chrome.runtime.sendMessage({
        type: 'VIDEO_PAUSE',
        currentTime: this.videoElement.currentTime
      });
    }
  }
  
  onVideoSeeked() {
    if (this.isCommentaryActive) {
      chrome.runtime.sendMessage({
        type: 'VIDEO_SEEK',
        currentTime: this.videoElement.currentTime,
        previousTime: this.lastVideoTime
      });
    }
  }
  
  onVideoTimeUpdate() {
    this.lastVideoTime = this.videoElement.currentTime;
  }
  
  onVideoVolumeChange() {
    // Prevent user from unmuting during commentary
    if (this.isCommentaryActive && (!this.videoElement.muted || this.videoElement.volume > 0)) {
      this.muteOriginalAudio();
    }
  }
  
  onVideoRateChange() {
    if (this.isCommentaryActive) {
      chrome.runtime.sendMessage({
        type: 'VIDEO_RATE_CHANGE',
        playbackRate: this.videoElement.playbackRate
      });
    }
  }
  
  onVideoEnded() {
    if (this.isCommentaryActive) {
      chrome.runtime.sendMessage({
        type: 'VIDEO_ENDED'
      });
    }
  }
  
  onVideoError() {
    console.error('Video error:', this.videoElement.error);
  }
  
  onVideoLoadStart() {
    // New video started loading, might need to re-detect
    setTimeout(() => {
      if (this.videoElement && this.isValidVideoElement(this.videoElement)) {
        const videoInfo = this.getVideoInfo(this.videoElement);
        chrome.runtime.sendMessage({
          type: 'VIDEO_UPDATED',
          data: videoInfo
        });
      }
    }, 1000);
  }
  
  onVideoCanPlay() {
    // Video is ready to play
    if (this.videoElement) {
      const videoInfo = this.getVideoInfo(this.videoElement);
      chrome.runtime.sendMessage({
        type: 'VIDEO_READY',
        data: videoInfo
      });
    }
  }
  
  // Set up mutation observer for dynamic content
  setupVideoDetectionObserver() {
    this.videoObserver = new MutationObserver((mutations) => {
      let shouldCheckForVideos = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.tagName === 'VIDEO' || node.querySelector('video')) {
                shouldCheckForVideos = true;
              }
            }
          });
        }
      });
      
      if (shouldCheckForVideos && !this.videoElement) {
        setTimeout(() => this.detectVideoPlayers(), 500);
      }
    });
    
    this.videoObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Handle messages from background script
  handleMessage(message, sender, sendResponse) {
    switch (message.type) {
      case 'COMMENTARY_STARTED':
        this.handleCommentaryStarted(message.commentary, message.syncOffset);
        break;
      
      case 'COMMENTARY_STOPPED':
        this.handleCommentaryStopped();
        break;
      
      case 'SYNC_ADJUSTED':
        this.handleSyncAdjusted(message.newOffset);
        break;
      
      case 'GET_VIDEO_INFO':
        sendResponse(this.videoElement ? this.getVideoInfo(this.videoElement) : null);
        break;
      
      case 'FORCE_VIDEO_DETECTION':
        this.detectVideoPlayers();
        break;
    }
  }
  
  // Handle commentary started
  handleCommentaryStarted(commentary, offset) {
    console.log('Commentary started:', commentary.title);
    
    if (!this.videoElement) {
      this.showNotification('No video detected. Please refresh the page.', 'error');
      return;
    }
    
    this.isCommentaryActive = true;
    this.syncOffset = offset;
    
    // Mute original audio
    this.muteOriginalAudio();
    
    // Start sync monitoring
    this.startSyncMonitoring();
    
    // Show success notification
    this.showNotification(`Commentary started: ${commentary.commentator.name}`, 'success');
  }
  
  // Handle commentary stopped
  handleCommentaryStopped() {
    console.log('Commentary stopped');
    
    this.isCommentaryActive = false;
    this.syncOffset = 0;
    
    // Unmute original audio
    this.unmuteOriginalAudio();
    
    // Stop sync monitoring
    this.stopSyncMonitoring();
    
    // Show notification
    this.showNotification('Commentary stopped', 'info');
  }
  
  // Handle sync adjustment
  handleSyncAdjusted(newOffset) {
    this.syncOffset = newOffset;
    console.log('Sync adjusted to:', newOffset + 'ms');
    
    // Show sync indicator
    this.showSyncIndicator(newOffset);
  }
  
  // Mute original video audio
  muteOriginalAudio() {
    if (!this.videoElement) return;
    
    this.originalVolume = this.videoElement.volume;
    this.originalMuted = this.videoElement.muted;
    
    this.videoElement.muted = true;
    this.videoElement.volume = 0;
    
    console.log('Original audio muted');
  }
  
  // Unmute original video audio
  unmuteOriginalAudio() {
    if (!this.videoElement) return;
    
    this.videoElement.muted = this.originalMuted;
    this.videoElement.volume = this.originalVolume;
    
    console.log('Original audio unmuted');
  }
  
  // Start sync monitoring
  startSyncMonitoring() {
    if (this.syncCheckInterval) {
      clearInterval(this.syncCheckInterval);
    }
    
    this.syncCheckInterval = setInterval(() => {
      if (!this.videoElement || !this.isCommentaryActive) return;
      
      const videoTime = this.videoElement.currentTime * 1000;
      
      chrome.runtime.sendMessage({
        type: 'SYNC_CHECK',
        videoTime: videoTime,
        syncOffset: this.syncOffset,
        paused: this.videoElement.paused
      });
      
    }, 1000);
  }
  
  // Stop sync monitoring
  stopSyncMonitoring() {
    if (this.syncCheckInterval) {
      clearInterval(this.syncCheckInterval);
      this.syncCheckInterval = null;
    }
  }
  
  // Detect and report match information
  detectAndReportMatch() {
    const url = window.location.href;
    const title = document.title;
    
    // Try to extract more specific match info
    const enhancedTitle = this.extractMatchInfoFromPage() || title;
    
    chrome.runtime.sendMessage({
      type: 'DETECT_MATCH',
      url: url,
      title: enhancedTitle
    });
  }
  
  // Extract match information from page content
  extractMatchInfoFromPage() {
    // Platform-specific selectors for match information
    const selectors = [
      // Generic
      '[data-testid*="match"]',
      '[data-testid*="game"]',
      '[data-testid*="event"]',
      '.match-title',
      '.game-title',
      '.event-title',
      
      // Netflix
      '.video-title',
      '.title-card h3',
      
      // DAZN
      '.event-info h1',
      '.match-header h1',
      
      // Amazon Prime
      '.title h1',
      '.content-title',
      
      // Generic fallbacks
      'h1',
      'h2',
      '.title'
    ];
    
    for (let selector of selectors) {
      const elements = document.querySelectorAll(selector);
      
      for (let element of elements) {
        const text = element.textContent?.trim();
        if (text && this.looksLikeMatchTitle(text)) {
          return text;
        }
      }
    }
    
    return null;
  }
  
  // Check if text looks like a match title
  looksLikeMatchTitle(text) {
    // Look for patterns like "Team A vs Team B", "Team A - Team B", etc.
    const patterns = [
      /\w+\s+(vs|v\.?|versus)\s+\w+/i,
      /\w+\s+-\s+\w+/,
      /\w+\s+x\s+\w+/i
    ];
    
    return patterns.some(pattern => pattern.test(text));
  }
  
  // Show notification to user
  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.commentator-notification');
    existing.forEach(el => el.remove());
    
    const notification = document.createElement('div');
    notification.className = `commentator-notification commentator-${type}`;
    notification.textContent = message;
    
    const colors = {
      success: '#4CAF50',
      error: '#f44336',
      info: '#2196F3',
      warning: '#FF9800'
    };
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: colors[type] || colors.info,
      color: 'white',
      padding: '12px 20px',
      borderRadius: '6px',
      fontSize: '14px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      zIndex: '10000',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      transition: 'all 0.3s ease',
      maxWidth: '300px',
      wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    });
    
    // Remove after delay
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, type === 'error' ? 5000 : 3000);
  }
  
  // Show sync offset indicator
  showSyncIndicator(offset) {
    // Remove existing indicator
    const existing = document.querySelector('.commentator-sync-indicator');
    if (existing) existing.remove();
    
    const indicator = document.createElement('div');
    indicator.className = 'commentator-sync-indicator';
    
    const offsetSeconds = (offset / 1000).toFixed(1);
    const sign = offset >= 0 ? '+' : '';
    indicator.textContent = `Sync: ${sign}${offsetSeconds}s`;
    
    Object.assign(indicator.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '25px',
      fontSize: '18px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '600',
      zIndex: '10001',
      transition: 'all 0.3s ease',
      border: '2px solid #4CAF50'
    });
    
    document.body.appendChild(indicator);
    
    // Animate in
    requestAnimationFrame(() => {
      indicator.style.transform = 'translate(-50%, -50%) scale(1)';
      indicator.style.opacity = '1';
    });
    
    // Remove after delay
    setTimeout(() => {
      indicator.style.opacity = '0';
      indicator.style.transform = 'translate(-50%, -50%) scale(0.8)';
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.parentNode.removeChild(indicator);
        }
      }, 300);
    }, 2000);
  }
  
  // Cleanup on page unload
  cleanup() {
    if (this.isCommentaryActive) {
      chrome.runtime.sendMessage({ type: 'STOP_COMMENTARY' });
    }
    
    if (this.videoObserver) {
      this.videoObserver.disconnect();
    }
    
    if (this.syncCheckInterval) {
      clearInterval(this.syncCheckInterval);
    }
    
    if (this.videoElement) {
      this.cleanupVideoListeners(this.videoElement);
    }
  }
}

// Initialize the content script
const commentatorScript = new CommentatorContentScript();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  commentatorScript.cleanup();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden && commentatorScript.isCommentaryActive) {
    // Page hidden, pause sync monitoring to save resources
    commentatorScript.stopSyncMonitoring();
  } else if (!document.hidden && commentatorScript.isCommentaryActive) {
    // Page visible again, resume sync monitoring
    commentatorScript.startSyncMonitoring();
  }
});