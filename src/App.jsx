import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import PeerConnection from './components/PeerConnection';
import { generateKeyPair, encryptMessage, decryptMessage } from './utils/crypto';
import { initPeer, sendMessage, sendFile } from './utils/webrtc';
import { saveChatHistory, loadChatHistory, saveKeyPair, loadKeyPair } from './utils/storage';

const App = () => {
  const [userId] = useState(crypto.randomUUID());
  const [peers, setPeers] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [keyPair, setKeyPair] = useState(null);
  const [groupId, setGroupId] = useState('');

  useEffect(() => {
    const initialize = async () => {
      let keys = await loadKeyPair(userId);
      if (!keys) {
        keys = await generateKeyPair();
        await saveKeyPair(userId, keys);
      }
      setKeyPair(keys);

      const history = await loadChatHistory(userId);
      setChatHistory(history || []);

      const peer = initPeer(userId, async (peerId, data) => {
        if (data.type === 'message') {
          const decrypted = await decryptMessage(data.message, keys.privateKey);
          const newMessage = { id: crypto.randomUUID(), sender: peerId, content: decrypted, timestamp: Date.now() };
          setChatHistory(prev => {
            const updated = [...prev, newMessage];
            saveChatHistory(userId, updated);
            return updated;
          });
        } else if (data.type === 'file') {
          // Handle file reception
          const newFile = { id: crypto.randomUUID(), sender: peerId, file: data.file, timestamp: Date.now() };
          setChatHistory(prev => {
            const updated = [...prev, newFile];
            saveChatHistory(userId, updated);
            return updated;
          });
        }
      });
      setPeers({ [userId]: peer });
    };
    initialize();
  }, [userId]);

  const handleSendMessage = async (content, deleteAfter) => {
    const encrypted = await encryptMessage(content, keyPair.publicKey);
    const message = { id: crypto.randomUUID(), sender: userId, content, timestamp: Date.now(), deleteAfter };
    setChatHistory(prev => {
      const updated = [...prev, message];
      saveChatHistory(userId, updated);
      return updated;
    });

    Object.values(peers).forEach(peer => {
      sendMessage(peer, { type: 'message', message: encrypted });
    });

    if (deleteAfter) {
      setTimeout(() => {
        setChatHistory(prev => {
          const updated = prev.filter(msg => msg.id !== message.id);
          saveChatHistory(userId, updated);
          return updated;
        });
      }, deleteAfter * 1000);
    }
  };

  const handleSendFile = async (file) => {
    const fileData = { id: crypto.randomUUID(), sender: userId, file, timestamp: Date.now() };
    setChatHistory(prev => {
      const updated = [...prev, fileData];
      saveChatHistory(userId, updated);
      return updated;
    });

    Object.values(peers).forEach(peer => {
      sendFile(peer, file);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">P2P Chat</h1>
      <PeerConnection userId={userId} peers={peers} setPeers={setPeers} groupId={groupId} setGroupId={setGroupId} />
      <ChatWindow
        chatHistory={chatHistory}
        onSendMessage={handleSendMessage}
        onSendFile={handleSendFile}
        userId={userId}
        groupId={groupId}
      />
    </div>
  );
};

export default App;