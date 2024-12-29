"use client"
import React, { useState, useRef } from "react";

const InputIdleAlert = () => {
  const [inputValue, setInputValue] = useState("");
  const idleTimeout = useRef(null);

  // Time in milliseconds to consider user idle
  const IDLE_TIME = 1500;

  const handleChange = (event) => {
    setInputValue(event.target.value);

    // Reset the idle timeout on each input change
    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }

    // Set a new idle timeout
    idleTimeout.current = setTimeout(() => {
      alert(`You stopped typing! Final input: "${event.target.value}"`);
    }, IDLE_TIME);
  };

  const handleFocus = () => {
    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }
  };

  const handleBlur = () => {
    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }
  };

  return (
    <div>
      <label htmlFor="exampleInput">Enter something:</label>
      <input
        id="exampleInput"
        type="text"
        value={inputValue}
        onChange={handleChange} // Detects input change
        onFocus={handleFocus}  // Clears timeout if input regains focus
        onBlur={handleBlur}    // Clears timeout when input loses focus
      />
    </div>
  );
};

export default InputIdleAlert;
