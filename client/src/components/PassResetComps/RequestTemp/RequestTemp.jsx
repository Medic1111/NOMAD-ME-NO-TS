import { useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import { formCom } from "../../../styles/form_common";

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
    <article className={formCom.container}>
      <form onSubmit={submitHandler} className={formCom.form}>
        <p className={formCom.title}>Enter your email</p>
        <input
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type={"email"}
          className={formCom.input}
        />
        <InputSubmit text={"submit"} className={formCom.submitBtn} />
      </form>
    </article>
  );
};

export default RequestTemp;
