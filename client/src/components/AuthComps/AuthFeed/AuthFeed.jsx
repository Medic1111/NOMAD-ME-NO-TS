import { useContext } from "react";
import { authCtx } from "../../../features/auth-ctx";

const AuthFeed = () => {
  const authMgr = useContext(authCtx);
  return authMgr.showFeedback ? (
    <p className={`p_feedback`}>{authMgr.feedMsg}</p>
  ) : null;
};
export default AuthFeed;
