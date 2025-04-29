export const generateKeyPair = async () => {
  return await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt']
  );
};

export const encryptMessage = async (message, publicKey) => {
  const encoded = new TextEncoder().encode(message);
  return await window.crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    publicKey,
    encoded
  );
};

export const decryptMessage = async (encrypted, privateKey) => {
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'RSA-OAEP' },
    privateKey,
    encrypted
  );
  return new TextDecoder().decode(decrypted);
};