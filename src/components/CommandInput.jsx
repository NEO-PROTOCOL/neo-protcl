import React, { useState, useRef, useEffect } from 'react';

/**
 * CommandInput - The primary interaction point for the NEO Protocol Shell.
 * Phase 1: Minimal Implementation
 */
export default function CommandInput({ onCommand, placeholder = "ENTER COMMAND..." }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const command = value.trim();
    if (command) {
      onCommand(command);
      setValue('');
    }
  };

  // Focus input on click anywhere in the container
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    // Auto focus on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div 
      onClick={handleContainerClick}
      className="w-full font-mono cursor-text group"
    >
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-cyan-400 mr-2 opacity-90 group-focus-within:opacity-100 transition-opacity font-bold">
          &gt;
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-500 focus:ring-0 p-0 text-lg md:text-xl uppercase tracking-wider"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
        {value.length === 0 && (
          <span className="w-2 h-5 bg-cyan-400/60 animate-pulse ml-1"></span>
        )}
      </form>
    </div>
  );
}

