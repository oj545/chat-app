import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import goupsRequest from "../../utils/groupsRequests";

function AddGroup({ setForm, user }) {
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    goupsRequest("POST", { groupMembers, groupName });
    setForm(null);
  };

  const handleCheckboxChange = (event) => {
    const filterValue = groupMembers.filter((el) => el !== event.target.value);
    event.target.checked
      ? setGroupMembers([...groupMembers, event.target.value])
      : setGroupMembers([...filterValue]);
  };

  return (
    <div className="add-form">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Add Group Name</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Form.Group>
        <div className="add-form-btns">
          <Button variant="success" type="submit">
            Submit
          </Button>
          <Button onClick={() => setForm("")} variant="success" type="submit">
            close
          </Button>
        </div>
      </Form>
      <ul>
        {user?.contactList.map((contact, index) => {
          return (
            <li key={index} className="contact-item">
              <span>{contact.contactName}</span>
              <input
                type="checkBox"
                value={contact.contactEmail}
                onChange={handleCheckboxChange}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AddGroup;
