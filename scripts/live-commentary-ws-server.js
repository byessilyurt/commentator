const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8090 });

// In-memory store: { [streamId]: [{ gameTime, audio, timestamp }] }
const streams = {};
// Listeners: { [streamId]: Set of ws connections }
const listeners = {};

wss.on('connection', (ws) => {
  let mode = null; // 'commentator' or 'listener'
  let streamId = null;
  let listenerGameTime = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'start-commentator') {
        // { type: 'start-commentator', streamId }
        mode = 'commentator';
        streamId = data.streamId;
        if (!streams[streamId]) streams[streamId] = [];
        if (!listeners[streamId]) listeners[streamId] = new Set();
        ws.send(JSON.stringify({ type: 'ack', role: 'commentator' }));
      } else if (data.type === 'audio-chunk' && mode === 'commentator') {
        // { type: 'audio-chunk', streamId, gameTime, audio, timestamp }
        if (!streams[streamId]) streams[streamId] = [];
        streams[streamId].push({
          gameTime: data.gameTime,
          audio: data.audio, // base64 string
          timestamp: data.timestamp,
        });
        // Broadcast to listeners
        if (listeners[streamId]) {
          for (const client of listeners[streamId]) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'audio-chunk',
                gameTime: data.gameTime,
                audio: data.audio,
                timestamp: data.timestamp,
              }));
            }
          }
        }
      } else if (data.type === 'start-listener') {
        // { type: 'start-listener', streamId, gameTime }
        mode = 'listener';
        streamId = data.streamId;
        listenerGameTime = data.gameTime;
        if (!listeners[streamId]) listeners[streamId] = new Set();
        listeners[streamId].add(ws);
        // Send all chunks >= requested gameTime
        if (streams[streamId]) {
          for (const chunk of streams[streamId]) {
            if (chunk.gameTime >= listenerGameTime) {
              ws.send(JSON.stringify({
                type: 'audio-chunk',
                gameTime: chunk.gameTime,
                audio: chunk.audio,
                timestamp: chunk.timestamp,
              }));
            }
          }
        }
        ws.send(JSON.stringify({ type: 'ack', role: 'listener' }));
      }
    } catch (e) {
      ws.send(JSON.stringify({ type: 'error', message: e.message }));
    }
  });

  ws.on('close', () => {
    if (mode === 'listener' && streamId && listeners[streamId]) {
      listeners[streamId].delete(ws);
    }
  });
});

console.log('Live commentary WebSocket server running on ws://localhost:8081'); 