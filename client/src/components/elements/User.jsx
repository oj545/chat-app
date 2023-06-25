import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { socketEmiter } from "../../hooksAndFunctions/socletEmiter";
import { useNavigate } from "react-router-dom";
import { RemoveCookie } from "../../hooksAndFunctions/cookies";
import "./css/user.css";

function User({ user, socketId }) {
  const navigate = useNavigate();

  useEffect(() => {
    socketEmiter("connect_me", {
      socketId: socketId,
      email: user.email,
    });
  }, []);

  const logout = () => {
    socketEmiter("remove_me", socketId);
    RemoveCookie("jwt");
    navigate("/signUp");
  };

  return (
    <div className="user">
      {/* <small>{<CgProfile />}</small> */}
      <small className="user-name">{`Hi ${user.firstName} ${user.lastName}`}</small>

      <div className="menu-profile">
        <Button variant="secondery" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default User;
