import React, { useState, useRef } from 'react';
import { startCall, endCall } from '../utils/webrtc';

const CallManager = ({ userId, groupId }) => {
  const [callActive, setCallActive] = useState(false);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  const handleStartCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;
      startCall(groupId, stream, (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
      });
      setCallActive(true);
    } catch (err) {
      console.error('Error starting call:', err);
    }
  };

  const handleEndCall = () => {
    endCall(groupId);
    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
    setCallActive(false);
  };

  return (
    <div className="p-4 border-t">
      <div className="flex space-x-2">
        <button
          onClick={handleStartCall}
          disabled={callActive}
          className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
        >
          Start Call
        </button>
        <button
          onClick={handleEndCall}
          disabled={!callActive}
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
        >
          End Call
        </button>
      </div>
      <div className="mt-2 flex space-x-2">
        <video ref={localVideoRef} autoPlay muted className="w-1/2 rounded-lg" />
        <video ref={remoteVideoRef} autoPlay className="w-1/2 rounded-lg" />
      </div>
    </div>
  );
};

export default CallManager;