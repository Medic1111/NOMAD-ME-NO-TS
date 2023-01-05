import classes from "./SettingsDelForm.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import { uiCtx } from "../../../features/ui-ctx";
import { userCtx } from "../../../features/user-ctx";
import { authCtx } from "../../../features/auth-ctx";
import { useAxios } from "../../../hooks/useAxios";

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
    <form
      onSubmit={onDeleteAccount}
      className={`${classes.form} flex_col_center`}
    >
      <p className={classes.warning}>ARE YOU SURE?</p>
      <p className={classes.warning}>This action cannot be undone</p>
      <input
        className={`input_standard ${classes.input}`}
        placeholder="enter password"
        type={"password"}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputSubmit
        className={`${classes.submit} btn_standard`}
        text={"delete account"}
      />
      <Button
        className={`btn_standard ${classes.cancel}`}
        text={"cancel"}
        onClick={() => {
          nav(`/users/${userMgr.currentUser.user._id}`);
          uiMgr.dispatch({ type: "CLOSE" });
        }}
      />
    </form>
  );
};

export default SettingsDelForm;
