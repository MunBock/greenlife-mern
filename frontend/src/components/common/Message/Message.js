import React from "react";

import "./message.css";

const Message = ({ children }) => {
  return (
    <div className="message-place">
      <div className="message">{children}</div>
    </div>
  );
};

export default Message;
