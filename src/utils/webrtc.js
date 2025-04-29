export const initPeer = (peerId, onData) => {
  const peer = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  const channel = peer.createDataChannel('chat');
  channel.onmessage = (event) => {
    onData(peerId, JSON.parse(event.data));
  };

  peer.onicecandidate = (event) => {
    if (event.candidate) {
      // Signaling mechanism needed (e.g., WebSocket or manual exchange)
      console.log('ICE candidate:', event.candidate);
    }
  };

  peer.ondatachannel = (event) => {
    event.channel.onmessage = (e) => onData(peerId, JSON.parse(e.data));
  };

  return peer;
};

export const sendMessage = (peer, data) => {
  const channel = peer.dataChannels?.chat || peer.getDataChannels()[0];
  if (channel?.readyState === 'open') {
    channel.send(JSON.stringify(data));
  }
};

export const sendFile = (peer, file) => {
  const channel = peer.dataChannels?.chat || peer.getDataChannels()[0];
  if (channel?.readyState === 'open') {
    channel.send(JSON.stringify({ type: 'file', file }));
  }
};

export const startCall = async (groupId, stream, onRemoteStream) => {
  const peer = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  stream.getTracks().forEach(track => peer.addTrack(track, stream));

  peer.ontrack = (event) => {
    onRemoteStream(event.streams[0]);
  };

  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);

  // Signaling mechanism needed to exchange offer/answer
  console.log('Offer:', offer);
};

export const endCall = (groupId) => {
  // Close peer connection
};