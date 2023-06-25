import React, { useEffect, useState } from "react";
import Message from "../UI/Message";
import GroupMenu from "./GroupMenu";
import { BsFillSendFill } from "react-icons/bs";
import { socketEmiter } from "../../hooksAndFunctions/socletEmiter";
import { RiArrowGoBackLine } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { filterBlockMessages } from "../../hooksAndFunctions/filterMembers";
import "./css/chet.css";

function Chet({ currentContact, user, responsiveHandler, currentGroup }) {
  const [textMessage, setTextMessage] = useState("");
  const [blockList, setblockList] = useState([]);
  const [isMnue, toggleMnue] = useState(false);

  useEffect(() => {
    setblockList(user.blockList);
  }, [user]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (textMessage === "") {
      return;
    }
    const date = Date.now();

    const contactMessage = {
      text: textMessage,
      receiver: currentContact.contactEmail,
      channel: currentContact.contactId,
      sender: user.email,
      date,
      conversationId: currentContact.conversationId,
    };

    const groupMessage = {
      sender: user.email,
      text: textMessage,
      date,
      conversationId: currentGroup.groupChannel,
    };

    if (currentContact.contactEmail) {
      socketEmiter("send_message", contactMessage);
      currentContact.messages.push(contactMessage);
    }

    if (currentGroup.groupName) {
      socketEmiter("group_message", groupMessage);
    }
    setTextMessage("");
  };

  const addToBlockList = (updateBlocKList) => {
    setblockList([...updateBlocKList]);
  };

  return (
    <div className="chet">
      <div className="current-contact">
        <small>{currentContact.contactName || currentGroup.groupName}</small>
        <small>
          {currentContact.contactEmail ||
            currentGroup.groupMembers.map((member, index) => (
              <span className="members" key={index}>
                {/* {member} */}
              </span>
            ))}
        </small>
        {currentGroup.groupName && (
          <button className="btn-mnue" onClick={() => toggleMnue(!isMnue)}>
            <AiOutlineMenu />
          </button>
        )}

        <small
          onClick={() => {
            return responsiveHandler({ sideBar: true, chet: false });
          }}>
          {window.innerWidth < 571 && <RiArrowGoBackLine />}
        </small>
      </div>
      <div className="chet-window">
        {isMnue & !currentContact.contactEmail && (
          <GroupMenu
            currentGroup={currentGroup}
            user={user}
            handelBlock={addToBlockList}
            blockList={blockList}
          />
        )}
        {isMnue || (
          <ul>
            {currentContact.messages.map((mes, index) => (
              <li key={index}>
                <Message
                  message={mes}
                  myEmail={user.email}
                  currentContact={currentContact}
                />
              </li>
            ))}
            {filterBlockMessages(blockList, currentGroup.messages).map(
              (mes, index) => (
                <li key={index}>
                  <Message
                    message={mes}
                    myEmail={user.email}
                    currentGroup={currentGroup}
                  />
                </li>
              )
            )}
          </ul>
        )}
      </div>
      <form onSubmit={sendMessage} className="chet-form">
        <div className="text-box">
          <textarea
            type="text"
            placeholder="Enter Message"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
          />
        </div>
        <button className="btn-send" type="submit">
          {<BsFillSendFill />}
        </button>
      </form>
    </div>
  );
}

export default Chet;
