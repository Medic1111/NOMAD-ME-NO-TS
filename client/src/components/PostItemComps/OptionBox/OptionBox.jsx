import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postCtx } from "../../../features/posts-ctx";
import { uiCtx } from "../../../features/ui-ctx";
import { uploadCtx } from "../../../features/upload-ctx";

const OptionBox = ({ username, _id }) => {
  const uiMgr = useContext(uiCtx);
  const postMgr = useContext(postCtx);
  const uploadMgr = useContext(uploadCtx);
  const nav = useNavigate();

  return (
    <div className={`flex items-center justify-center gap-5`}>
      <span
        className={
          "cursor-pointer text-green-500 hover:text-green-600 underline"
        }
        onClick={() => {
          postMgr.onDelPost(username, _id);
        }}
      >
        delete
      </span>
      <span
        className={
          "cursor-pointer text-green-500 hover:text-green-600 underline"
        }
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
