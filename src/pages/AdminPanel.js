import React from "react";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const user = useSelector((state) => state.persist.userSlice);
  return <div>Hos geldin {user.name}</div>;
};

export default AdminPanel;
