import React, { useState } from 'react';

const SearchBar = ({ chatHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = chatHistory.filter(msg =>
    msg.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search messages..."
        className="w-full p-2 border rounded-lg"
      />
      {searchTerm && (
        <div className="mt-2 max-h-40 overflow-y-auto">
          {filteredMessages.map(msg => (
            <div key={msg.id} className="p-2 bg-gray-100 rounded-lg mb-1">
              <p>{msg.content}</p>
              <p className="text-xs text-gray-500">{msg.sender}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;