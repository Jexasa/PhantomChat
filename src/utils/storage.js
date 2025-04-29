export const saveChatHistory = async (userId, history) => {
  localStorage.setItem(`chat_${userId}`, JSON.stringify(history));
};

export const loadChatHistory = async (userId) => {
  const history = localStorage.getItem(`chat_${userId}`);
  return history ? JSON.parse(history) : null;
};

export const saveKeyPair = async (userId, keyPair) => {
  const exportedPublic = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
  const exportedPrivate = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
  localStorage.setItem(`keys_${userId}`, JSON.stringify({
    publicKey: arrayBufferToBase64(exportedPublic),
    privateKey: arrayBufferToBase64(exportedPrivate),
  }));
};

export const loadKeyPair = async (userId) => {
  const keys = localStorage.getItem(`keys_${userId}`);
  if (!keys) return null;
  const { publicKey, privateKey } = JSON.parse(keys);
  return {
    publicKey: await window.crypto.subtle.importKey(
      'spki',
      base64ToArrayBuffer(publicKey),
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      true,
      ['encrypt']
    ),
    privateKey: await window.crypto.subtle.importKey(
      'pkcs8',
      base64ToArrayBuffer(privateKey),
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      true,
      ['decrypt']
    ),
  };
};

const arrayBufferToBase64 = (buffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
};

const base64ToArrayBuffer = (base64) => {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};