import classes from "./RequestTemp.module.css";
import { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import InputSubmit from "../../common/InputSubmit/InputSubmit";

const RequestTemp = ({ setRequestComplete }) => {
  const [email, setEmail] = useState("");
  const { callApi } = useAxios();

  const submitHandler = async (e) => {
    e.preventDefault();
    let success = await callApi("POST", "/api/v1/users/forgot_password", {
      email,
    });
    success && setRequestComplete(true);
  };

  return (
    <form
      onSubmit={submitHandler}
      className={`${classes.form} flex_col_center`}
    >
      <p className={classes.p}>Enter your email</p>
      <input
        placeholder="email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type={"email"}
        className={`input_standard ${classes.input}`}
      />
      <InputSubmit text={"submit"} className={`btn_standard ${classes.btn}`} />
    </form>
  );
};

export default RequestTemp;
