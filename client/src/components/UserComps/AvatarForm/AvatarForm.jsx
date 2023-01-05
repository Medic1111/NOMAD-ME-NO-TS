import classes from "./AvatarForm.module.css";
import React, { useContext } from "react";
import ImgUpload from "../../ImgUpload/ImgUpload";
import Button from "../../common/Button/Button";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import { uiCtx } from "../../../features/ui-ctx";
import { userCtx } from "../../../features/user-ctx";
import { uploadCtx } from "../../../features/upload-ctx";

const AvatarForm = () => {
  const userMgr = useContext(userCtx);
  const uiMgr = useContext(uiCtx);
  const uploadMgr = useContext(uploadCtx);

  return (
    <article className={classes.article}>
      <h3 className={classes.h3}>Edit Profile Picture</h3>
      <ImgUpload />
      <form
        onSubmit={userMgr.onUpdateAvatar}
        className={`${classes.form} flex_col_center`}
      >
        <InputSubmit
          disabled={uploadMgr.url === "" ? true : false}
          className={
            uploadMgr.url === ""
              ? `${classes.disabled} btn_standard`
              : `${classes.submitBtn} btn_standard`
          }
          text={"update"}
        />
        <Button
          className={`${classes.inputBtn} btn_standard`}
          text={"cancel"}
          onClick={(e) => {
            e.preventDefault();
            uiMgr.dispatch({ type: "CLOSE" });
          }}
        />
      </form>
    </article>
  );
};

export default AvatarForm;
