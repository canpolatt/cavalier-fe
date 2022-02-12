import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.persist.userSlice);
  console.log(auth);
  return auth;
};

export default useAuth;
