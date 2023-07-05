import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import { uiCtx } from "../../../features/ui-ctx";
import { userCtx } from "../../../features/user-ctx";
import { authCtx } from "../../../features/auth-ctx";
import { useAxios } from "../../../hooks/useAxios";
import { formCom } from "../../../styles/form_common";
const SettingsDelForm = () => {
  const nav = useNavigate();
  const uiMgr = useContext(uiCtx);
  const userMgr = useContext(userCtx);
  const authMgr = useContext(authCtx);
  const [password, setPassword] = useState("");
  const { callApi } = useAxios();

  const onDeleteAccount = async (e) => {
    e.preventDefault();
    let success = await callApi(
      "DELETE",
      `/api/v1/users/${userMgr.currentUser.user.id}`,
      { password }
    );
    uiMgr.dispatch({ type: "CLOSE" });
    success && authMgr.logoutHandler();
  };

  return (
    <div
      className={`${formCom.container} bg-slate-50 w-[100vw] fixed top-0 h-screen mt-0 p-10 flex-col `}
    >
      <form onSubmit={onDeleteAccount} className={formCom.form}>
        <p className={formCom.title}>ARE YOU SURE?</p>
        <p className={formCom.title}>This action cannot be undone</p>
        <input
          className={formCom.input}
          placeholder="enter password"
          type={"password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputSubmit className={formCom.submitBtn} text={"delete account"} />
        <Button
          className={formCom.submitBtn}
          text={"cancel"}
          onClick={() => {
            nav(`/users/${userMgr.currentUser.user._id}`);
            uiMgr.dispatch({ type: "CLOSE" });
          }}
        />
      </form>
    </div>
  );
};

export default SettingsDelForm;
