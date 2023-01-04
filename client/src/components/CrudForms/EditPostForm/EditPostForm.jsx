import classes from "../NewPostForm/NewPostForm.module.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { postCtx } from "../../../features/posts-ctx";
import { uiCtx } from "../../../features/ui-ctx";
import ReactQuill from "react-quill";
import ImgUpload from "../../ImgUpload/ImgUpload";
import { uploadCtx } from "../../../features/upload-ctx";
import Button from "../../common/Button/Button";
import InputSubmit from "../../common/InputSubmit/InputSubmit";
import Label from "../../NavComps/Label/Label";

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
    <article className={`${classes.article} flex_col_center`}>
      <ImgUpload />
      <form
        onSubmit={handleEditPost}
        className={`${classes.form} flex_col_center`}
      >
        <input
          name="title"
          value={oldData.title}
          onChange={onInputChange}
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
          disabled={uploadMgr.isLoading ? true : false}
          text="Edit post"
          className={
            uploadMgr.isLoading
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

export default EditPostForm;
