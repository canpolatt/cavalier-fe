import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.persist.userSlice);
  if (auth.userType === "ADMIN") {
    return { ...auth, isAdmin: true };
  } else {
    return auth;
  }
};

export default useAuth;
