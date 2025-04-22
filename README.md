# Commentator

Commentator is a web application and browser extension that allows you to enjoy football matches with alternative commentary.

## Features

- **Alternative Commentary**: Choose from a variety of commentators or record your own
- **Audio Synchronization**: Commentary is perfectly synchronized with the video stream
- **Original Commentary Removal**: The system filters out the original commentator audio while preserving stadium sounds
- **Record Your Own**: Become a commentator and share your commentary with others

## How It Works

1. **Select a Match**: Choose from available football matches
2. **Pick a Commentator**: Browse commentaries or record your own
3. **Enjoy the Match**: Watch with your chosen commentary perfectly synchronized

## Implementation Details

The project consists of two main components:

### Web Application

A Next.js application that allows users to:
- Browse available matches and commentaries
- Record and upload their own commentaries
- Watch matches with their preferred commentary

### Chrome Extension (Planned)

A browser extension that:
- Integrates with streaming platforms
- Filters out the original commentary audio
- Synchronizes alternative commentary with the video timeline
- Provides audio mixing controls

## Technical Architecture

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Audio Processing**: Web Audio API for recording, filtering and mixing
- **API**: RESTful API for managing commentaries and matches
- **Extension**: JavaScript/TypeScript Chrome extension

## Project Status

This project is currently in the prototype stage, with the following components implemented:

- Basic web interface for browsing and recording commentaries
- Audio recording and playback functionality
- Commentary synchronization with video playback
- API routes for managing commentaries and matches

Future work includes:
- Advanced audio processing for commentary removal
- Chrome extension development
- User authentication and profiles
- Social features for rating commentaries

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
