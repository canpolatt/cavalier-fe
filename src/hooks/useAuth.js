import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.persist.userSlice);
  return auth;
};

export default useAuth;
