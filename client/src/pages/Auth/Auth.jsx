import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthForms from "../../components/AuthComps/AuthForms/AuthForms";
import { authCtx } from "../../features/auth-ctx";

const Auth = () => {
  const authMgr = useContext(authCtx);
  return authMgr.isAuth ? <Navigate to={"/posts"} replace /> : <AuthForms />;
};

export default Auth;
