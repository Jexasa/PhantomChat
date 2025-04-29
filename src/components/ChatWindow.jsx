import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SearchBar from './SearchBar';
import CallManager from './CallManager';

const ChatWindow = ({ chatHistory, onSendMessage, onSendFile, userId, groupId }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg flex flex-col h-[80vh]">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Group: {groupId || 'No group'}</h2>
        <SearchBar chatHistory={chatHistory} />
      </div>
      <MessageList chatHistory={chatHistory} userId={userId} />
      <CallManager userId={userId} groupId={groupId} />
      <MessageInput onSendMessage={onSendMessage} onSendFile={onSendFile} />
    </div>
  );
};

export default ChatWindow;