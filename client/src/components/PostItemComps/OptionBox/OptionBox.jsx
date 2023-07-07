import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postCtx } from "../../../features/posts-ctx";
import { uiCtx } from "../../../features/ui-ctx";
import { uploadCtx } from "../../../features/upload-ctx";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";

const OptionBox = ({ username, _id }) => {
  const uiMgr = useContext(uiCtx);
  const postMgr = useContext(postCtx);
  const uploadMgr = useContext(uploadCtx);
  const nav = useNavigate();

  return (
    <div className={`flex items-center justify-center gap-5`}>
      <span
        className={
          "cursor-pointer text-xl text-green-500 hover:text-green-600 underline"
        }
        onClick={() => {
          postMgr.onDelPost(username, _id);
        }}
      >
        <AiOutlineDelete />
      </span>
      <span
        className={
          "cursor-pointer text-xl text-green-500 hover:text-green-600 underline"
        }
        onClick={() => {
          postMgr.setPostIdToEdit(_id);
          uiMgr.dispatch({ type: "EDITPOST" });
          nav("/posts");
          uploadMgr.setUrl("");
        }}
      >
        {/* edit */}
        <AiOutlineEdit />
      </span>
    </div>
  );
};

export default OptionBox;
