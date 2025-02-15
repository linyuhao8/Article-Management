import React from "react";

const CheckEditorContent = ({ editorContent }) => {
  return (
    <div className="output">
      <h3>儲存後的輸出內容</h3>
      <pre>{JSON.stringify(editorContent, null, 2)}</pre>
    </div>
  );
};

export default CheckEditorContent;
