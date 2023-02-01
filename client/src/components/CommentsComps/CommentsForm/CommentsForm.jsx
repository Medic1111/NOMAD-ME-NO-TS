import React, { useState } from "react";
import classes from "./CommentsForm.module.css";
import axios from "axios";

const CommentsForm = ({ postId, userId, setSpecPost }) => {
  const [content, setContent] = useState("");

  const commentApi = async () => {
    await axios
      .post(`/api/v1/posts/${postId}/comment`, {
        by: userId,
        content: content,
      })
      .then((serverRes) => {
        setSpecPost(serverRes.data);
        setContent("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        type={"text"}
        className={classes.input}
      />
      <button className={classes.btn} onClick={() => commentApi()}>
        comment
      </button>
    </React.Fragment>
  );
};

export default CommentsForm;
