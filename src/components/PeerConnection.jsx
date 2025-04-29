import React, { useState } from 'react';
import { initPeer } from '../utils/webrtc';

const PeerConnection = ({ userId, peers, setPeers, groupId, setGroupId }) => {
  const [peerId, setPeerId] = useState('');

  const handleJoinGroup = () => {
    if (peerId && !peers[peerId]) {
      const peer = initPeer(peerId, (id, data) => {
        // Handle incoming data
      });
      setPeers(prev => ({ ...prev, [peerId]: peer }));
      setGroupId(peerId);
    }
  };

  return (
    <div className="mb-4 w-full max-w-2xl">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={peerId}
          onChange={(e) => setPeerId(e.target.value)}
          placeholder="Enter peer or group ID"
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={handleJoinGroup}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Join Group
        </button>
      </div>
      <p className="text-sm mt-2">Your ID: {userId}</p>
    </div>
  );
};

export default PeerConnection;