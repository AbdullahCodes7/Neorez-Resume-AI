import React, { useState, useEffect } from "react";
import Button from "./button";

function AiWriteInput({ onClick, value, onchange }) {
  const [localValue, setLocalValue] = useState("");

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Initialize the local value with the sanitized Redux value
  useEffect(() => {
    if (value) {
      setLocalValue(stripHtmlTags(value));
    }
  }, [value]);

  // Handle user input
  const handleInputChange = (e) => {
    setLocalValue(e.target.value); // Update local value for editing
    onchange(e.target.value); // Pass the raw input to the parent or Redux
  };

  return (
    <div className="flex items-center justify-between gap-3 w-full">
      <textarea
        type="text"
        className="w-full px-3 outline-none"
        placeholder="Describe your job role, experience, and specific details here. e.g., 'I managed a team of 10 developers and increased productivity by 20%'"
        value={localValue} // Use the local state for the input
        onChange={handleInputChange} // Allow unrestricted editing
      />
      <Button
        text="Generate"
        className="btn-primary px-[22px] py-2 font-normal"
        onClick={onClick}
      />
    </div>
  );
}

export default AiWriteInput;
