// YouTube Player for Offscreen Document
// Handles YouTube IFrame API for audio playback

console.log('YouTube player script loaded');

let player = null;
let isReady = false;
let currentVideoId = null;
let targetSyncOffset = 0;

// YouTube IFrame API ready callback
function onYouTubeIframeAPIReady() {
  console.log('YouTube IFrame API ready');
  
  // Listen for messages from background script
  chrome.runtime.onMessage.addListener(handleMessage);
  
  // Notify that we're ready
  chrome.runtime.sendMessage({ type: 'YOUTUBE_PLAYER_READY' });
}

// Handle messages from background script
function handleMessage(message, sender, sendResponse) {
  console.log('YouTube player received message:', message);
  
  switch (message.type) {
    case 'START_YOUTUBE_AUDIO':
      startAudio(message.videoId, message.startTime);
      break;
    
    case 'STOP_YOUTUBE_AUDIO':
      stopAudio();
      break;
    
    case 'ADJUST_YOUTUBE_SYNC':
      adjustSync(message.delta);
      break;
    
    case 'SET_VOLUME':
      setVolume(message.volume);
      break;
    
    case 'GET_PLAYER_STATE':
      sendResponse(getPlayerState());
      break;
  }
}

// Start audio playback
function startAudio(videoId, startTime = 0) {
  console.log('Starting audio:', videoId, 'at', startTime);
  
  currentVideoId = videoId;
  
  if (player) {
    // Player exists, load new video
    player.loadVideoById({
      videoId: videoId,
      startSeconds: startTime
    });
  } else {
    // Create new player
    player = new YT.Player('player', {
      height: '1',
      width: '1',
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
        fs: 0,
        playsinline: 1,
        start: Math.floor(startTime)
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError
      }
    });
  }
}

// Stop audio playback
function stopAudio() {
  console.log('Stopping audio');
  
  if (player && isReady) {
    player.stopVideo();
  }
  
  currentVideoId = null;
}

// Adjust sync by seeking
function adjustSync(delta) {
  if (!player || !isReady) return;
  
  const currentTime = player.getCurrentTime();
  const newTime = Math.max(0, currentTime + (delta / 1000));
  
  console.log('Adjusting sync:', delta + 'ms', 'from', currentTime, 'to', newTime);
  
  player.seekTo(newTime, true);
}

// Set volume
function setVolume(volume) {
  if (player && isReady) {
    player.setVolume(Math.max(0, Math.min(100, volume)));
  }
}

// Get current player state
function getPlayerState() {
  if (!player || !isReady) {
    return { ready: false };
  }
  
  return {
    ready: true,
    state: player.getPlayerState(),
    currentTime: player.getCurrentTime(),
    duration: player.getDuration(),
    volume: player.getVolume(),
    videoId: currentVideoId
  };
}

// Player ready callback
function onPlayerReady(event) {
  console.log('YouTube player ready');
  isReady = true;
  
  // Set default volume (can be adjusted by user)
  event.target.setVolume(70);
  
  // Start playback if video was loaded
  if (currentVideoId) {
    event.target.playVideo();
  }
  
  // Notify background script
  chrome.runtime.sendMessage({
    type: 'YOUTUBE_PLAYER_STATE_CHANGE',
    state: 'ready'
  });
}

// Player state change callback
function onPlayerStateChange(event) {
  const states = {
    [-1]: 'unstarted',
    [0]: 'ended',
    [1]: 'playing',
    [2]: 'paused',
    [3]: 'buffering',
    [5]: 'cued'
  };
  
  const state = states[event.data] || 'unknown';
  console.log('YouTube player state changed:', state);
  
  // Notify background script of state changes
  chrome.runtime.sendMessage({
    type: 'YOUTUBE_PLAYER_STATE_CHANGE',
    state: state,
    playerState: event.data
  });
  
  // Handle specific states
  switch (event.data) {
    case YT.PlayerState.ENDED:
      // Video ended, notify background
      chrome.runtime.sendMessage({
        type: 'YOUTUBE_AUDIO_ENDED'
      });
      break;
    
    case YT.PlayerState.PLAYING:
      // Started playing, good for sync verification
      break;
    
    case YT.PlayerState.PAUSED:
      // Paused, might need to handle sync
      break;
  }
}

// Player error callback
function onPlayerError(event) {
  console.error('YouTube player error:', event.data);
  
  const errors = {
    2: 'Invalid video ID',
    5: 'HTML5 player error',
    100: 'Video not found or private',
    101: 'Embedding not allowed',
    150: 'Embedding not allowed'
  };
  
  const errorMessage = errors[event.data] || 'Unknown error';
  
  // Notify background script of error
  chrome.runtime.sendMessage({
    type: 'YOUTUBE_PLAYER_ERROR',
    error: errorMessage,
    code: event.data
  });
}

// Periodic sync check (every 5 seconds)
setInterval(() => {
  if (player && isReady && player.getPlayerState() === YT.PlayerState.PLAYING) {
    chrome.runtime.sendMessage({
      type: 'YOUTUBE_SYNC_CHECK',
      currentTime: player.getCurrentTime(),
      videoId: currentVideoId
    });
  }
}, 5000);