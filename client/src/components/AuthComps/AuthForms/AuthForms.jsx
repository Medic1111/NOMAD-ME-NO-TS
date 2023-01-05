import classes from "./AuthForms2.module.css";
import React, { useContext } from "react";
import AuthFeed from "../AuthFeed/AuthFeed";
import ImgUpload from "../../ImgUpload/ImgUpload";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import { Slide } from "react-awesome-reveal";
import { authCtx } from "../../../features/auth-ctx";
import { uploadCtx } from "../../../features/upload-ctx";

const AuthForms = () => {
  const authMgr = useContext(authCtx);
  const uploadMgr = useContext(uploadCtx);

  return (
    <Slide className={`${classes.formBox} flex_center`}>
      <form
        onSubmit={(e) => authMgr.onSubmit(e)}
        className={`${classes.form} flex_col_center`}
      >
        <h3 className={classes.h3}>
          {authMgr.showLogin ? "LOGIN" : "SIGN UP"}
        </h3>
        {authMgr.showLogin || (
          <React.Fragment>
            <ImgUpload title={"Profile Picture (optional)"} />
            <label className={`label_standard`} htmlFor="username">
              Email
            </label>

            <input
              className={`${classes.input} input_standard`}
              type="email"
              id="email"
              name="email"
              value={authMgr.formData.email}
              onChange={(e) => authMgr.onInputChange(e)}
              maxLength={50}
              required
            />
          </React.Fragment>
        )}
        <label className={`label_standard`} htmlFor="username">
          Username
        </label>
        <input
          className={`${classes.input} input_standard`}
          type="text"
          id="username"
          name="username"
          value={authMgr.formData.username}
          onChange={(e) => authMgr.onInputChange(e)}
          maxLength={14}
          required
        />
        <label className={`label_standard`} htmlFor="password">
          Password
        </label>
        <input
          className={`${classes.input} input_standard`}
          type="password"
          id="password"
          name="password"
          value={authMgr.formData.password}
          onChange={(e) => authMgr.onInputChange(e)}
          required
        />
        <AuthFeed />
        <InputSubmit
          disabled={uploadMgr.isLoading ? true : false}
          className={`${classes.btn} btn_standard`}
          text={authMgr.showLogin ? "Login" : "Sign Up"}
        />
      </form>
    </Slide>
  );
};

export default AuthForms;
