# Commentator

Commentator is a web application and browser extension that allows you to enjoy football matches with alternative commentary.

## Features

- **Alternative Commentary**: Choose from a variety of commentators or record your own
- **Works with Any Stream**: Use with any football streaming service or platform
- **Manual Synchronization**: Easily sync the commentary with your video player
- **Record Your Own**: Become a commentator and share your commentary with others

## How It Works

1. **Watch Your Match**: Play the football match in your preferred streaming service
2. **Mute Original Commentary**: Mute the original commentators on your video stream
3. **Pick a Commentator**: Browse available commentaries and select your favorite
4. **Sync & Enjoy**: Use our synchronization tools to match the commentary with your video

## Implementation Details

The project consists of two main components:

### Web Application

A Next.js application that allows users to:
- Browse available commentaries
- Record and upload their own commentaries
- Play selected commentaries with manual synchronization controls

### Chrome Extension

A browser extension that:
- Works with any streaming site
- Provides easy synchronization tools
- Allows quick context menu access for timing adjustments
- Remembers your preferred commentaries

## Technical Architecture

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Audio Recording**: Web Audio API for recording commentaries
- **API**: RESTful API for managing commentaries and matches
- **Extension**: JavaScript/TypeScript Chrome extension

## Synchronization Approach

We use a manual synchronization approach that:
1. Allows users to enter the current game time from their video
2. Provides fine-tuning controls (forward/backward skipping)
3. For commentators, includes time announcements to help listeners sync

## Commentary Recording

When recording commentary:
1. Set the starting game time before recording
2. Include periodic time announcements (e.g., "It's now 27 minutes into the game")
3. Describe key events that help listeners sync (goals, cards, etc.)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Chrome Extension Installation

1. Navigate to the `chrome-extension` directory
2. Open Chrome and go to `chrome://extensions/`
3. Enable Developer Mode
4. Click "Load unpacked" and select the `chrome-extension` directory

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
