import React, { useState } from "react";
import ContactRoom from "./contactsRoom";
import GroupRoom from "./GroupRoom";
import AddGroup from "./AddGroup";
import User from "./User";
import AddContact from "./AddContact";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./css/sidebar.css";

function SideBar({ user, responsiveHandler, newMessages }) {
  const [addForm, setForm] = useState(null);

  return (
    <div className="sidebar-controll">
      {user.email && <User user={user} socketId={user.socketId} />}
      <div className="sidbar-buttons">
        <button onClick={() => setForm("contact")} className="btn-add">
          <span>+</span>
          <span>
            <FaUserAlt />
          </span>
        </button>
        <button onClick={() => setForm("groups")} className="btn-add">
          <span>+</span>
          <span>
            <FaUsers />
          </span>
        </button>
      </div>
      {addForm === "contact" && (
        <div>
          <AddContact
            setForm={setForm}
            myUser={{ email: user.email, name: user.firstName }}
          />
        </div>
      )}
      {addForm === "groups" && (
        <div>
          <AddGroup
            setForm={setForm}
            myContacts={user.myContacts}
            user={user}
          />
        </div>
      )}

      <div className="rooms-mnue"></div>
      {addForm || (
        <ul>
          {[...user?.contactList, ...user?.groupsList].map((contact, index) => {
            const filterNewMessage = newMessages.filter(
              (mes) => mes.sender === contact.contactEmail
            );

            return (
              <li
                key={index}
                onClick={() => {
                  if (window.innerWidth < 571) {
                    return responsiveHandler({ sideBar: false, chet: true });
                  } else {
                    return;
                  }
                }}>
                <Link
                  className="room-link"
                  to={
                    contact?.contactName ? `${contact?.contactName}` : "room"
                  }>
                  {contact.contactName && (
                    <ContactRoom
                      contact={contact}
                      socketId={user.socketId}
                      newMessages={filterNewMessage.length}
                    />
                  )}
                  {contact.groupName && <GroupRoom group={contact} />}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SideBar;
