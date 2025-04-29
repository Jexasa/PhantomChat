import React from 'react';

const FileShare = ({ onSendFile }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onSendFile(file);
    }
  };

  return (
    <label className="p-2 bg-gray-200 rounded-lg cursor-pointer">
      <input type="file" className="hidden" onChange={handleFileChange} />
      📎
    </label>
  );
};

export default FileShare;