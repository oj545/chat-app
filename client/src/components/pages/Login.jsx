import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import authentication from "../../utils/authRequests";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    authentication(login, "login");
  };

  return (
    <div className="auth-form">
      <Form onSubmit={submitHandler}>
        bob35@gmail.com -123456
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={(e) => setLogin({ ...login, email: e.target.value })}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
