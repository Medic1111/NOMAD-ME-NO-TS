import React, { useContext } from "react";
import ImgUpload from "../../ImgUpload/ImgUpload";
import Button from "../../common/Button/Button";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import { uiCtx } from "../../../features/ui-ctx";
import { userCtx } from "../../../features/user-ctx";
import { uploadCtx } from "../../../features/upload-ctx";
import { formCom } from "../../../styles/form_common";

const AvatarForm = () => {
  const userMgr = useContext(userCtx);
  const uiMgr = useContext(uiCtx);
  const uploadMgr = useContext(uploadCtx);

  return (
    <article
      className={`${formCom.container} bg-slate-50 w-[100vw] fixed top-0 h-screen mt-0 p-10 flex-col `}
    >
      <h3 className={formCom.title}>Edit Profile Picture</h3>
      <form onSubmit={userMgr.onUpdateAvatar} className={formCom.form}>
        <ImgUpload />

        <InputSubmit
          disabled={uploadMgr.url === "" ? true : false}
          className={
            uploadMgr.url === ""
              ? `${formCom.submitBtn}`
              : `${formCom.submitBtn}`
          }
          text={"update"}
        />
        <Button
          className={formCom.submitBtn}
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
