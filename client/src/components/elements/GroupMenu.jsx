import React, { useState } from "react";
import { ImEyeBlocked } from "react-icons/im";
import { contactsRequestsId } from "../../utils/contactsRequests";
import { goupsRequestId } from "../../utils/groupsRequests";
import { filtermembers } from "../../hooksAndFunctions/filterMembers";
import "./css/groupmenue.css";

function GroupMenu({ user, currentGroup, handelBlock, blockList }) {
  const [upateGroup, setpateGroup] = useState(currentGroup);
  const [isList, togglelList] = useState(false);
  const [addMembers, setaddMembers] = useState([]);

  const submitBlockContact = async () => {
    contactsRequestsId({ blockList }, "POST", user._id);
  };

  const submitAddContacts = async () => {
    const thisGroup = user.groupsList.find(
      (group) => group.groupName === currentGroup.groupName
    );
    const resulte = await goupsRequestId(
      {
        addMembers,
        groupName: thisGroup.groupName,
        conversationId: thisGroup.conversation,
      },
      "POST",
      thisGroup.groupId
    );
    if (resulte.status === "success") {
      setpateGroup({
        ...upateGroup,
        groupMembers: [...upateGroup.groupMembers, ...addMembers],
      });
    }
  };

  return (
    <div className="group-mnue">
      <button
        className="btn-add-contact btn btn-outline-success"
        onClick={() => togglelList(!isList)}>
        Add Contact
      </button>

      {isList || (
        <div>
          <p>Block Group Member Messages</p>
          <ul>
            {upateGroup.groupMembers
              .filter((member) => member !== user.email)
              .map((member, index) => {
                const blockClass = blockList.some((a) => a === member);

                return (
                  <li className="contact" key={index}>
                    <small>{member}</small>
                    <button
                      className={blockClass ? "block" : ""}
                      value={member}
                      onClick={() => {
                        const isBlock = blockList.some((a) => a === member);
                        if (isBlock) {
                          const deletBlock = blockList.filter(
                            (block) => block !== member
                          );
                          return handelBlock([...deletBlock]);
                        } else {
                          return handelBlock([...blockList, member]);
                        }
                      }}>
                      <ImEyeBlocked />
                    </button>
                  </li>
                );
              })}
          </ul>
          <button
            className="btn btn-outline-success btn-save"
            onClick={submitBlockContact}>
            Save Changes
          </button>
        </div>
      )}

      {isList && (
        <div>
          <p>Add New Members</p>
          <ul className="add-contact-list">
            {filtermembers(upateGroup.groupMembers, user.contactList).map(
              (contact) => (
                <il className="contact-item">
                  <span>{contact.contactName}</span>
                  <input
                    type="checkBox"
                    checked={addMembers.includes(contact.contactEmail)}
                    value={contact.contactEmail}
                    onChange={(e) => {
                      const removeContact = addMembers.filter(
                        (le) => le !== contact.contactEmail
                      );
                      e.target.checked
                        ? setaddMembers([...addMembers, contact.contactEmail])
                        : setaddMembers(removeContact);
                    }}
                  />
                </il>
              )
            )}
          </ul>
          <button
            className="btn btn-outline-success btn-save"
            onClick={submitAddContacts}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default GroupMenu;
