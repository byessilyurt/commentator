# Commentator Chrome Extension

This Chrome extension enables users to watch football matches with alternative commentary, perfectly synchronized with any streaming platform.

## Features

- 🎯 **Automatic Match Detection**: Detects football matches on popular streaming platforms
- 🔇 **Audio Muting**: Automatically mutes original commentary
- 🎤 **Alternative Commentary**: Plays synchronized commentary from YouTube Live streams
- ⚡ **Real-time Sync**: Maintains perfect synchronization with crowd-sourced offset data
- 🎛️ **Manual Sync Control**: Fine-tune sync with +/- buttons
- 🌐 **Multi-platform Support**: Works with Netflix, DAZN, Amazon Prime, Sky, and more

## Supported Platforms

- Netflix
- DAZN
- Amazon Prime Video
- Sky Sports
- BeIN Sports
- ESPN
- Peacock TV
- And more...

## Installation

### For Development

1. Clone the repository
2. Navigate to the `chrome-extension` directory
3. Run `./build.sh` to build the extension
4. Open Chrome and go to `chrome://extensions/`
5. Enable "Developer mode"
6. Click "Load unpacked" and select the `build/` directory

### From Chrome Web Store

*Coming soon - extension will be published to Chrome Web Store*

## How to Use

1. **Install the Extension**: Add it to Chrome from the Web Store or load it manually
2. **Navigate to a Football Stream**: Go to any supported streaming platform
3. **Play a Football Match**: Start watching a live or recorded football match
4. **Open Extension**: Click the Commentator icon in your browser toolbar
5. **Select Commentary**: Choose from available live commentaries
6. **Enjoy**: The extension will mute original audio and play alternative commentary
7. **Adjust Sync**: Use the +/- buttons if commentary drifts out of sync

## Technical Details

### Architecture

- **Content Script**: Detects video players and manages audio muting
- **Background Service Worker**: Handles API communication and YouTube integration
- **Popup Interface**: Provides user controls for commentary selection and sync
- **Offscreen Document**: Manages YouTube audio playback (Manifest V3 requirement)

### Sync Algorithm

The extension uses a multi-layer synchronization approach:

1. **Initial Offset**: Uses saved user preference or crowd-sourced average
2. **Event-based Calibration**: Adjusts sync based on match events (goals, cards)
3. **Continuous Monitoring**: Maintains sync with periodic checks
4. **Manual Fine-tuning**: Allows user adjustments with smooth transitions

### Privacy & Permissions

The extension requires these permissions:

- **activeTab**: To detect video players on the current tab
- **storage**: To save user sync preferences
- **scripting**: To inject content scripts for video detection
- **offscreen**: To play YouTube audio (Manifest V3 requirement)
- **host_permissions**: To communicate with the Commentator API

**Privacy**: The extension only processes data necessary for functionality. No personal data is collected or transmitted beyond sync offset reports (anonymous).

## Development

### File Structure

```
chrome-extension/
├── manifest.json          # Extension manifest
├── background.js          # Background service worker
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic
├── offscreen.html        # Offscreen document for audio
├── youtube-player.js     # YouTube IFrame API integration
├── src/
│   └── content.js        # Enhanced content script
├── icons/                # Extension icons (16, 32, 48, 128px)
├── build.sh              # Build script
└── README.md             # This file
```

### Building

```bash
# Make build script executable
chmod +x build.sh

# Build extension
./build.sh
```

This creates a `build/` directory with all files and a `commentator-extension.zip` ready for Chrome Web Store.

### Testing

1. Load the extension in Chrome (Developer mode)
2. Navigate to a streaming platform (Netflix, DAZN, etc.)
3. Play a football match
4. Click the extension icon
5. Verify match detection and commentary selection

### API Integration

The extension communicates with the Commentator platform API:

- **Match Detection**: `GET /api/matches/detect`
- **Live Commentaries**: `GET /api/commentaries/live`
- **Sync Reports**: `POST /api/sync/{commentaryId}/report`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on multiple platforms
5. Submit a pull request

## Troubleshooting

### Extension Not Detecting Video

- Refresh the page and try again
- Check if the streaming platform is supported
- Ensure video is actually playing
- Try clicking the extension icon to force detection

### Commentary Out of Sync

- Use the +/- sync buttons in the extension popup
- Try refreshing the page and restarting commentary
- Check your internet connection stability
- Report persistent sync issues to help improve the algorithm

### No Commentaries Available

- Ensure you're watching a live football match
- Check if commentators are streaming for this specific match
- Try again during peak match times
- Visit the web platform to see upcoming commentaries

## Support

- **Web Platform**: http://localhost:3000 (development)
- **Issues**: Report bugs on GitHub
- **Feature Requests**: Submit via GitHub issues

## License

MIT License - see LICENSE file for details.