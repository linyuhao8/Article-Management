import React, { useEffect, useState } from "react";

const CheckEditorContent = ({ editorContent }) => {
  const [jsonString, setJsonString] = useState("");

  useEffect(() => {
    // 每次 editorContent 改變時更新 jsonString
    setJsonString(JSON.stringify(editorContent, null, 2));
  }, [editorContent]);

  const handleJson = () => {
    console.log(jsonString);
  };

  return (
    <div className="output">
      <h3>儲存後的輸出內容</h3>
      <pre>{jsonString}</pre>
      <button onClick={handleJson}>json</button>
    </div>
  );
};

export default CheckEditorContent;
