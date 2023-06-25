import { useEffect, useState } from "react";
import { initUser, initCurrentContact, initGroup } from "../data/initValues";
import { socketEmiter } from "./socletEmiter";
import getMe from "../utils/authGetMe";

function UseSocketlisener(socket) {
  const [user, setUser] = useState({ ...initUser, socketId: socket.id });
  const [newMessages, setNewMessages] = useState([]);
  const [currentContact, setCurrentContact] = useState(initCurrentContact);
  const [currentGroup, setCurrentGroup] = useState(initGroup);

  /// 1)  lifecycle events
  useEffect(() => {
    const asyncFn = async () => {
      const resulte = await getMe();
      setUser({ ...resulte.data.user, socketId: socket.id });
    };

    asyncFn();
  }, []);

  useEffect(() => {
    if (user.groupsList.length > 0) {
      const groups = user.groupsList.map((group) => group.conversation);
      socketEmiter("join_all_groups", groups);
    }
  }, [user]);

  useEffect(() => {
    socket.on("get_contact", setNewContact);
    socket.on("set_currentGroup", setNewGroup);
    socket.on("send_message", addNewMessage);
    socket.on("group_message", addGroupMessage);

    return () => {
      socket.off("group_message", addGroupMessage);
      socket.off("set_currentGroup", setNewGroup);
      socket.off("send_message", addNewMessage);
      socket.off("get_contact", setNewContact);
    };
  });

  //2) callback function
  function addNewMessage(payload) {
    if (payload.sender === currentContact.contactEmail) {
      setCurrentContact({
        ...currentContact,
        messages: [...currentContact.messages, payload],
      });
    } else {
      setNewMessages([...newMessages, payload]);
    }
  }

  function setNewContact(payload) {
    setCurrentContact({ ...payload });
    setNewMessages(
      newMessages.filter((mes) => mes?.sender !== payload?.contactEmail)
    );
    setCurrentGroup(initGroup);
  }

  function setNewGroup(payload) {
    const { messages, contacts, _id } = payload.conversation;

    setCurrentGroup({
      groupName: payload.groupName,
      groupMembers: contacts,
      groupChannel: _id,
      messages,
    });
    setCurrentContact(initCurrentContact);
  }

  function addGroupMessage(payload) {
    const { sender, text, date } = payload;

    setCurrentGroup({
      ...currentGroup,
      messages: [...currentGroup.messages, { sender, text, date }],
    });
  }

  return { user, currentContact, newMessages, currentGroup };
}

export default UseSocketlisener;
