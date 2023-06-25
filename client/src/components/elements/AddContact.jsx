import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./css/addForms.css";
import contactsRequests from "../../utils/contactsRequests";

function AddContact({ setForm, myUser }) {
  const [newContact, setContact] = useState({ email: "", name: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    contactsRequests([{ ...myUser }, newContact], "POST");
    setForm(null);
  };

  return (
    <div className="add-form">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Password"
            onChange={(e) =>
              setContact({ ...newContact, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={(e) =>
            setContact({ ...newContact, email: e.target.value })
          }>
          <Form.Label>add Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <div className="add-form-btns">
          <Button variant="success" type="submit">
            Submit
          </Button>
          <Button onClick={() => setForm("")} variant="success" type="submit">
            close
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddContact;
