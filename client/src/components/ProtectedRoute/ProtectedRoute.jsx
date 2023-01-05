import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authCtx } from "../../features/auth-ctx";

const ProtectedRoute = ({ children }) => {
  const authMgr = useContext(authCtx);
  return <>{authMgr.isAuth ? children : <Navigate to="/auth" replace />}</>;
};

export default ProtectedRoute;
