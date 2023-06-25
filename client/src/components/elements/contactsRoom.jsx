import "./css/rooms.css";
import { FaUserAlt } from "react-icons/fa";
import { socketEmiter } from "../../hooksAndFunctions/socletEmiter";

function ContactRoom({ contact, socketId, newMessages }) {
  const getContact = () => {
    socketEmiter("get_contact", {
      contactName: contact.contactName,
      email: contact.contactEmail,
      conversationId: contact.conversation,
      mySocketId: socketId,
    });
  };

  return (
    <>
      <div className="room" onClick={getContact}>
        <div className="contact-ditales">
          <div className="room-top">
            <small className="contact-profile">{<FaUserAlt />}</small>
            <small className="contact-name">{contact.contactName}</small>
            {newMessages > 0 && (
              <span className="new-message">{newMessages}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactRoom;
