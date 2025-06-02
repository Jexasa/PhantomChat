# P2P Chat Extension  version 0.1.0

A secure, React-based P2P chat web extension with end-to-end encryption, group chat, file sharing, video/voice calls, offline support, and searchable message history.

## Features
- **End-to-End Encryption**: Uses WebCrypto API for secure messaging.
- **P2P Communication**: WebRTC for direct peer-to-peer connections.
- **Group Chat**: Supports multiple users in a single chat.
- **File Sharing**: Send and receive files securely.
- **Message Deletion Timer**: Auto-delete messages after a specified time.
- **Local Storage**: Stores chat history and key pairs locally.
- **Offline Support**: View chat history when offline.
- **Searchable Messages**: Search through chat history.
- **Video/Voice Calls**: WebRTC-based calls with video and audio.


## Usage
- Open the extension popup from the Chrome toolbar.
- Enter a peer or group ID to join a chat.
- Send messages, files, or start video/voice calls.
- Use the search bar to find messages in the chat history.
- Set a timer for messages to auto-delete.

## Notes
- **Signaling Server**: The WebRTC implementation requires a signaling server for ICE candidate exchange. You'll need to implement one (e.g., using WebSocket) or use a service like Firebase.
- **Icons**: Replace `icon48.png` and `icon128.png` in the `public` folder with your own icons.
- **Offline Support**: Chat history is available offline, but new messages require an active connection.

## Dependencies
- React 18.2.0
- Tailwind CSS
- WebCrypto API (built-in)
- WebRTC (built-in)

## License
MIT
