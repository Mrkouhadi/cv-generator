import React, { useRef } from "react";

const FileSaveButton = () => {
  const inputRef = useRef<any>();

  const handleButtonClick = () => {
    // Simulate a click on the file input element
    inputRef.current?.click();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Save File</button>
      <input type="file" ref={inputRef} style={{ display: "none" }} />
    </div>
  );
};

export default FileSaveButton;
