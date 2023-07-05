// import classes from "../NewPostForm/NewPostForm.module.css";
import React, { useState, useContext, useEffect } from "react";
import Button from "../../common/Button/Button";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import Label from "../../NavComps/Label/Label";
import ImgUpload from "../../ImgUpload/ImgUpload";
import axios from "axios";
import ReactQuill from "react-quill";
import { uploadCtx } from "../../../features/upload-ctx";
import { postCtx } from "../../../features/posts-ctx";
import { uiCtx } from "../../../features/ui-ctx";
import { formCom } from "../../../styles/form_common";

const EditPostForm = () => {
  const postMgr = useContext(postCtx);
  const uiMgr = useContext(uiCtx);
  const uploadMgr = useContext(uploadCtx);
  const [oldData, setOldData] = useState({});
  const [label, setLabel] = useState("none");
  const [content, setContent] = useState("");

  const fetchPost = async () => {
    await axios
      .get(`/api/v1/posts/${postMgr.postIdToEdit}`)
      .then((serverRes) => {
        setContent(serverRes.data.content);
        setOldData(serverRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setOldData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    postMgr.onEditPost(postMgr.postIdToEdit, {
      ...oldData,
      label,
      content,
      url: uploadMgr.url || oldData.url,
    });
  };

  return (
    <article className={formCom.container}>
      <form onSubmit={handleEditPost} className={formCom.form}>
        <ImgUpload />

        <input
          name="title"
          value={oldData.title}
          onChange={onInputChange}
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
          disabled={uploadMgr.isLoading ? true : false}
          text="Edit post"
          className={formCom.submitBtn}
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

export default EditPostForm;
