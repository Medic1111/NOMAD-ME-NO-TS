import classes from "./NewPostForm.module.css";
import "react-quill/dist/quill.snow.css";
import { useState, useContext } from "react";
import Label from "../../NavComps/Label/Label";
import ImgUpload from "../../ImgUpload/ImgUpload";
import Button from "../../common/Button/Button";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import ReactQuill from "react-quill";
import { uploadCtx } from "../../../features/upload-ctx";
import { userCtx } from "../../../features/user-ctx";
import { postCtx } from "../../../features/posts-ctx";
import { uiCtx } from "../../../features/ui-ctx";

const NewPostForm = () => {
  const postMgr = useContext(postCtx);
  const uiMgr = useContext(uiCtx);
  const uploadMgr = useContext(uploadCtx);
  const userMgr = useContext(userCtx);
  const [label, setLabel] = useState("none");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();
    postMgr.onCreateNewPost({
      author: userMgr.currentUser.user._id,
      title,
      label,
      content,
      url: uploadMgr.url,
    });
  };

  return (
    <article className={`${classes.article} flex_col_center`}>
      <ImgUpload />
      <form
        onSubmit={handleCreatePost}
        className={`${classes.form} flex_col_center`}
      >
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${classes.input} input_standard`}
          type="text"
          placeholder="Title"
          maxLength={26}
          required
        />
        <ReactQuill
          className={`${classes.textArea} input_standard`}
          theme="snow"
          value={content}
          onChange={setContent}
        />
        <Label label={label} setLabel={setLabel} />
        <InputSubmit
          disabled={uploadMgr.url === "" ? true : false}
          text="post"
          className={
            uploadMgr.url === ""
              ? `${classes.disabled} btn_standard`
              : `${classes.submitBtn} btn_standard`
          }
        />
        <Button
          className={`${classes.submitBtn} btn_standard`}
          onClick={(e) => {
            e.preventDefault();
            uiMgr.dispatch({ type: "CLOSE" });
          }}
          text="cancel"
        />
      </form>
    </article>
  );
};

export default NewPostForm;
