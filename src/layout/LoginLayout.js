import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div>
      Login Layout
      <Outlet />
    </div>
  );
};

export default LoginLayout;
