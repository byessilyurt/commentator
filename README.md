# Commentator

A platform to enhance football matches with alternative commentary. Watch any football stream and enjoy commentary from your favorite commentators, perfectly synchronized with the action.

## Features

- **Watch with Custom Commentary**: Mute your original stream and listen to our commentators.
- **Record Your Commentary**: Become a commentator and share your insights.
- **Synchronization Tools**: Easily match the commentary with your video.
- **Chrome Extension**: Control commentaries directly from your browser.
- **Works with Any Stream**: Use with any football streaming service.

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (easily adaptable to other databases)
- **Authentication**: JWT-based auth
- **Audio**: Web Audio API, WaveSurfer.js
- **Chrome Extension**: JavaScript/TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/commentator.git
   cd commentator/commentator-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   ```
   npx prisma migrate dev
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The application should now be running at http://localhost:3000.

### Chrome Extension

1. Navigate to the Chrome Extension directory:
   ```
   cd chrome-extension
   ```

2. Build the extension:
   ```
   npm install
   npm run build
   ```

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `chrome-extension/build` directory

## Deployment

### Server Requirements

- Node.js (v18 or newer)
- npm or yarn
- PM2 (optional, for process management)

### Deployment Steps

1. Clone the repository on your server
2. Set up environment variables in a `.env` file:
   ```
   JWT_SECRET=your_secure_jwt_secret
   NODE_ENV=production
   ```

3. Run the deployment script:
   ```
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

4. For manual deployment:
   ```
   npm ci
   npx prisma generate
   npx prisma migrate deploy
   npm run build
   npm start
   ```

## Structure

- `/app`: Main application code
  - `/api`: API routes
  - `/components`: React components
  - `/lib`: Utility functions and libraries
- `/chrome-extension`: Chrome extension code
- `/prisma`: Database schema and migrations
- `/public`: Static assets

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
