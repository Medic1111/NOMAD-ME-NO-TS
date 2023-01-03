import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authCtx } from "../../features/auth-ctx";

const ProtectedRoute = ({ children }) => {
  const authMgr = useContext(authCtx);
  return <>{authMgr.isAuth ? children : <Navigate to="/auth" replace />}</>;
};

export default ProtectedRoute;
