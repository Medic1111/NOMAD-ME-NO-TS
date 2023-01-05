import classes from "./SettingsPassForm.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import { uiCtx } from "../../../features/ui-ctx";
import { userCtx } from "../../../features/user-ctx";
import { authCtx } from "../../../features/auth-ctx";
import { useAxios } from "../../../hooks/useAxios";
import { app_error } from "../../../utils/app_error";

const SettingsPassForm = () => {
  const nav = useNavigate();
  const { callApi } = useAxios();
  const uiMgr = useContext(uiCtx);
  const userMgr = useContext(userCtx);
  const authMgr = useContext(authCtx);

  const [inputData, setInputData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onChangePassword = async (e) => {
    e.preventDefault();
    if (inputData.newPassword !== inputData.confirmPassword) {
      let err = { response: "Passwords don't match" };
      return app_error(err, uiMgr.setIsError, uiMgr.setErrorMsg);
    }
    let success = await callApi(
      "PATCH",
      `/api/v1/users/${userMgr.currentUser.user.id}/new_password`,
      inputData
    );
    uiMgr.dispatch({ type: "CLOSE" });
    success && authMgr.logoutHandler();
  };

  return (
    <form
      onSubmit={onChangePassword}
      className={`${classes.form} flex_col_center`}
    >
      <p className={classes.warning}>Change Password</p>
      <input
        className={`input_standard ${classes.input}`}
        placeholder="enter current password"
        type={"password"}
        required
        value={inputData.currentPassword}
        name="currentPassword"
        onChange={handleInputChange}
      />
      <input
        className={`input_standard ${classes.input}`}
        placeholder="enter new password"
        type={"password"}
        required
        value={inputData.newPassword}
        name="newPassword"
        onChange={handleInputChange}
      />
      <input
        className={`input_standard ${classes.input}`}
        placeholder="confirm new password"
        type={"password"}
        required
        value={inputData.confirmPassword}
        name="confirmPassword"
        onChange={handleInputChange}
      />
      <InputSubmit
        className={`${classes.submit} btn_standard`}
        text={"change password"}
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

export default SettingsPassForm;
