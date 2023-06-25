import React from "react";
import "./css/home.css";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <main>{<Outlet />}</main>
    </div>
  );
}

export default Home;
