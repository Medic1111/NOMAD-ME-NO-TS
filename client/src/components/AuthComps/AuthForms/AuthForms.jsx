import React, { useContext } from "react";
import ImgUpload from "../../ImgUpload/ImgUpload";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import { Slide } from "react-awesome-reveal";
import { authCtx } from "../../../features/auth-ctx";
import { uploadCtx } from "../../../features/upload-ctx";
import { Link } from "react-router-dom";
import { formCom } from "../../../styles/form_common";

const AuthForms = () => {
  const authMgr = useContext(authCtx);
  const uploadMgr = useContext(uploadCtx);

  return (
    <Slide className={formCom.container}>
      <form onSubmit={(e) => authMgr.onSubmit(e)} className={formCom.form}>
        <h3 className={formCom.title}>
          {authMgr.showLogin ? "LOGIN" : "SIGN UP"}
        </h3>
        {authMgr.showLogin || (
          <React.Fragment>
            <ImgUpload title={"Profile Picture (optional)"} />
            <label className={formCom.label} htmlFor="username">
              Email
            </label>

            <input
              className={formCom.input}
              type="email"
              id="email"
              name="email"
              value={authMgr.formData.email}
              onChange={(e) => authMgr.onInputChange(e)}
              maxLength={50}
              placeholder=""
              required
            />
          </React.Fragment>
        )}
        <label className={formCom.label} htmlFor="username">
          Username
        </label>
        <input
          className={formCom.input}
          placeholder="testing"
          type="text"
          id="username"
          name="username"
          value={authMgr.formData.username}
          onChange={(e) => authMgr.onInputChange(e)}
          maxLength={14}
          required
        />
        <label className={formCom.label} htmlFor="password">
          Password
        </label>
        <input
          className={formCom.input}
          type="password"
          id="password"
          name="password"
          value={authMgr.formData.password}
          onChange={(e) => authMgr.onInputChange(e)}
          required
          placeholder="testing"
        />
        <InputSubmit
          disabled={uploadMgr.isLoading ? true : false}
          className={formCom.submitBtn}
          text={authMgr.showLogin ? "Login" : "Sign Up"}
        />
        {authMgr.showLogin && (
          <Link className={formCom.feedback} to={"/auth/password_reset"}>
            Forgot password?
          </Link>
        )}
      </form>
    </Slide>
  );
};

export default AuthForms;
