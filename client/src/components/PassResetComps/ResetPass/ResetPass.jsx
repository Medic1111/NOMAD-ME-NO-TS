import classes from "./ResetPass.module.css";
import { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const { callApi } = useAxios();
  const nav = useNavigate();

  const [newData, setNewData] = useState({
    username: "",
    temp_password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const newDataChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitNewDataHandler = async (e) => {
    e.preventDefault();
    let success = await callApi(
      "POST",
      "/api/v1/users/reset_password",
      newData
    );
    success && nav("/auth");
  };

  return (
    <form
      onSubmit={(e) => submitNewDataHandler(e)}
      className={`${classes.form} flex_col_center`}
    >
      <p className={classes.p}>
        Please check your mailbox and fill out this form.
      </p>
      <input
        placeholder="username (check email received)"
        value={newData.username}
        name="username"
        onChange={newDataChangeHandler}
        required
        type={"text"}
        className={`input_standard ${classes.input}`}
      />
      <input
        placeholder="temporary password (check email received)"
        value={newData.temp_password}
        name="temp_password"
        onChange={newDataChangeHandler}
        required
        type={"text"}
        className={`input_standard ${classes.input}`}
      />
      <input
        value={newData.newPassword}
        placeholder="new password"
        name="newPassword"
        onChange={newDataChangeHandler}
        required
        type={"password"}
        className={`input_standard ${classes.input}`}
      />
      <input
        value={newData.newPasswordConfirm}
        placeholder="confirm new password"
        name="newPasswordConfirm"
        onChange={newDataChangeHandler}
        required
        type={"password"}
        className={`input_standard ${classes.input}`}
      />
      <InputSubmit text={"submit"} className={`btn_standard ${classes.btn}`} />
    </form>
  );
};

export default ResetPass;
