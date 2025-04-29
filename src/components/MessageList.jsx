import React from 'react';

const MessageList = ({ chatHistory, userId }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {chatHistory.map((msg) => (
        <div
          key={msg.id}
          className={`mb-2 p-2 rounded-lg ${
            msg.sender === userId ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
          } max-w-[70%]`}
        >
          <p className="text-sm font-semibold">{msg.sender}</p>
          {msg.content ? (
            <p>{msg.content}</p>
          ) : (
            <a href={URL.createObjectURL(msg.file)} download={msg.file.name}>
              {msg.file.name}
            </a>
          )}
          <p className="text-xs text-gray-500">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;