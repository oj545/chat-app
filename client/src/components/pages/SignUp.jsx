import React, { useState } from "react";
import authentication from "../../utils/authRequests";
import { Button, Form } from "react-bootstrap";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { GetCookie } from "../../hooksAndFunctions/cookies";
import { useNavigate } from "react-router-dom";
import "./css/authPage.css";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState("Login");

  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitHandler = async (ev) => {
    ev.preventDefault();
    await authentication(signUp, form.toLocaleLowerCase());
    const cookie = GetCookie("jwt");

    if (cookie) {
      navigate("/chet");
    }
  };

  return (
    <div className="auth-form">
      <Form onSubmit={submitHandler}>
        {form === "Signup" && (
          <p className="form-label" onClick={() => setForm("Login")}>
            Login
            <span>
              <BsBoxArrowInUpRight />
            </span>
          </p>
        )}
        {form === "Login" && (
          <p className="form-label" onClick={() => setForm("Signup")}>
            Register
            <span>
              <BsBoxArrowInUpRight />
            </span>
          </p>
        )}
        {form === "Signup" && (
          <>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              onChange={(e) =>
                setSignUp({ ...signUp, firstName: e.target.value })
              }>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              onChange={(e) =>
                setSignUp({ ...signUp, lastName: e.target.value })
              }>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          </>
        )}

        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setSignUp({ ...signUp, password: e.target.value })}
          />
        </Form.Group>
        {form === "Signup" && (
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) =>
                setSignUp({ ...signUp, confirmPassword: e.target.value })
              }
            />
          </Form.Group>
        )}

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
