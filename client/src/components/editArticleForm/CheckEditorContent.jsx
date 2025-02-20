import React, { useEffect, useState } from "react";

const CheckEditorContent = ({ contentText, content }) => {
  const [jsonString, setJsonString] = useState("");
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    // 確保 editorContent 存在後再轉換為 JSON 字串
    if (content) {
      setJsonString(JSON.stringify(content, null, 2));
    }
  }, [content]);

  useEffect(() => {}, [contentText]);

  const toggleBtn = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="output">
      <h3>儲存後的輸出內容：{toggle ? "文字" : "json"}</h3>
      <button
        onClick={toggleBtn}
        className="mt-2 px-3 py-1 rounded-md bg-sky-300"
      >
        切換
      </button>
      <pre>{toggle ? contentText : jsonString}</pre>
    </div>
  );
};

export default CheckEditorContent;
