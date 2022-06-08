import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/LoginLayout.css";

const LoginLayout = () => {
  return (
    <div className="login-layout">
      <Outlet />
    </div>
  );
};

export default LoginLayout;
