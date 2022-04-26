import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, permittedRoles }) => {
  const auth = useAuth();
  const authType = auth.userType;

  return auth.isLoggedIn ? (
    permittedRoles.some((item) => authType.includes(item)) ? (
      <> {children}</>
    ) : (
      <Navigate to={"/401"} />
    )
  ) : (
    <Navigate to={"/"} />
  );
};

export default ProtectedRoute;
