import React, { useState } from "react";

const PatternBuilder = ({ onTextChange }) => {
  const [text, setText] = useState("");

  const handleText = (e) => {
    const newText = e.currentTarget.value;
    setText(newText);
  };

  const handleSend = () => {
    onTextChange(text);
    setText("");
  };

  return (
    <>
      <div className="p-6 my-6 rounded-lg bg-[rgba(22,33,62,0.9)] border-amber-700 border-2">
        <input
          onChange={handleText}
          type="text"
          value={text}
          className="p-4 mb-4 border-amber-200 text-amber-100"
          placeholder="Chat with Google's Gemini"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-lg bg-amber-900 hover:bg-amber-800/20"
        >
          Send
        </button>
        <p className="text-xs mt-2 text-gray-400">
          Test your understanding of the sequence
        </p>
      </div>
    </>
  );
};

export default PatternBuilder;
