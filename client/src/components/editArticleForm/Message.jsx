import React, { useState, useEffect } from "react";

const Message = ({ message, messageStatus }) => {
  const [showMessage, setShowMessage] = useState(false); // 控制訊息顯示與否

  useEffect(() => {
    if (message) {
      setShowMessage(true);

      // 只有在 messageStatus 是成功時，才設置定時器讓訊息消失
      if (messageStatus) {
        // 4秒後隱藏訊息
        const timer = setTimeout(() => {
          setShowMessage(false);
        }, 4000);

        // 清理定時器
        return () => clearTimeout(timer);
      }
    }
  }, [message, messageStatus]); // 監聽 message 和 messageStatus

  return (
    <div>
      {showMessage && (
        <div
          className="bg-white py-4 px-5 rounded-lg mb-5"
          style={{
            color: messageStatus ? "green" : "red",
            marginTop: "10px",
          }}
        >
          <strong>Message:</strong> {message}
        </div>
      )}
    </div>
  );
};

export default Message;
