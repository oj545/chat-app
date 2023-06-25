import React from "react";
import "./css/message.css";
import { useParams } from "react-router-dom";
import useDate from "../../hooksAndFunctions/useDate";

function Message({ message, myEmail }) {
  const { channel } = useParams();

  return (
    <div className="message">
      <small
        className={
          message.sender === myEmail
            ? "my-message message-name "
            : "message-name receiver-message  "
        }>
        <div>
          {channel !== "room" && (
            <span>{message.sender === myEmail ? "" : `${channel}`}</span>
          )}
          {channel === "room" && (
            <span>{message.sender === myEmail ? "" : `${message.sender}`}</span>
          )}

          <p className="message-text">{message.text}</p>
          <span className="message-data">{useDate(message.date)}</span>
        </div>
      </small>
    </div>
  );
}

export default Message;
