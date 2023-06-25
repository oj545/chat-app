import React from "react";
import { FaUsers } from "react-icons/fa";
import { socketEmiter } from "../../hooksAndFunctions/socletEmiter";
import "./css/rooms.css";

function GroupRoom({ group: { conversation, groupName }, user }) {
  const joinRoomHandlre = () => {
    socketEmiter("join_group", {
      channel: conversation,
      groupName,
    });
  };

  return (
    <div onClick={joinRoomHandlre} className="room">
      <div className="contact-ditales">
        <small className="groop-icon">
          <FaUsers />
        </small>
        <small className="group-name">{groupName}</small>
      </div>
    </div>
  );
}

export default GroupRoom;
