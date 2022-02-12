import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/user/userApi";

const SignIn = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const data = {
      email: "canpolatt@yahoo.com",
      password: "can12345",
    };
    const response = dispatch(login(data));
    console.log(response);
  };

  return (
    <div>
      <button onClick={handleClick}>Gonder</button>
    </div>
  );
};

export default SignIn;
