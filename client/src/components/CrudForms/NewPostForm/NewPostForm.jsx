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
import { formCom } from "../../../styles/form_common";

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
    <article className={`${formCom.container}`}>
      <form onSubmit={handleCreatePost} className={formCom.form}>
        <ImgUpload />

        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={formCom.input}
          type="text"
          placeholder="Title"
          maxLength={26}
          required
        />

        <ReactQuill
          className={` h-48 w-full my-10`}
          theme="snow"
          value={content}
          onChange={setContent}
        />
        <Label label={label} setLabel={setLabel} />
        <InputSubmit
          disabled={uploadMgr.url === "" ? true : false}
          text="post"
          className={`${formCom.submitBtn}`}
        />
        <Button
          className={formCom.feedback}
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
