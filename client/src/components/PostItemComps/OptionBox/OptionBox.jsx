import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postCtx } from "../../../features/posts-ctx";
import { uiCtx } from "../../../features/ui-ctx";
import { uploadCtx } from "../../../features/upload-ctx";
import classes from "./OptionBox.module.css";

const OptionBox = ({ username, _id }) => {
  const uiMgr = useContext(uiCtx);
  const postMgr = useContext(postCtx);
  const uploadMgr = useContext(uploadCtx);
  const nav = useNavigate();

  return (
    <div className={`${classes.userOptions} flex_center`}>
      <span
        className={classes.span}
        onClick={() => {
          postMgr.onDelPost(username, _id);
        }}
      >
        delete
      </span>
      <span
        className={classes.span}
        onClick={() => {
          postMgr.setPostIdToEdit(_id);
          uiMgr.dispatch({ type: "EDITPOST" });
          nav("/posts");
          uploadMgr.setUrl("");
        }}
      >
        edit
      </span>
    </div>
  );
};

export default OptionBox;
