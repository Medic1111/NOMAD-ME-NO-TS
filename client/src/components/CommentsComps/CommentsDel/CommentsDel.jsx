import React, { useContext } from "react";
import classes from "./CommentsDel.module.css";
import axios from "axios";

const CommentsDel = ({ obj, userId, specPost, postId, setSpecPost }) => {
  const deleteComment = async (obj) => {
    if (obj.by.id === userId || userId === specPost.author.id) {
      await axios
        .patch(`/api/v1/posts/${postId}/comment`, {
          comment_id: obj._id,
        })
        .then((serverRes) => {
          setSpecPost(serverRes.data);
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <React.Fragment>
      {obj.by.id === userId || userId === specPost.author.id ? (
        <span onClick={() => deleteComment(obj)} className={classes.del}>
          x
        </span>
      ) : (
        <span className={classes.del2}>x</span>
      )}
    </React.Fragment>
  );
};

export default CommentsDel;
