import React, { useState } from 'react';
import FileShare from './FileShare';

const MessageInput = ({ onSendMessage, onSendFile }) => {
  const [message, setMessage] = useState('');
  const [deleteAfter, setDeleteAfter] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, deleteAfter);
      setMessage('');
      setDeleteAfter(0);
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg"
        />
        <input
          type="number"
          value={deleteAfter}
          onChange={(e) => setDeleteAfter(Number(e.target.value))}
          placeholder="Delete after (s)"
          className="w-24 p-2 border rounded-lg"
        />
        <FileShare onSendFile={onSendFile} />
        <button
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;