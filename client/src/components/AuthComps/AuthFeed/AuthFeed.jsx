import { useContext } from "react";
import { authCtx } from "../../../features/auth-ctx";
import { formCom } from "../../../styles/form_common";
const AuthFeed = () => {
  const authMgr = useContext(authCtx);
  return authMgr.showFeedback ? (
    <p className={formCom.feedback}>{authMgr.feedMsg}</p>
  ) : null;
};
export default AuthFeed;
