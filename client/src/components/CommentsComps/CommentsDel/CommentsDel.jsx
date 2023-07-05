import React, { useContext } from "react";
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
    <div className="flex h-[10vh] items-center justify-end mx-10">
      {obj.by.id === userId || userId === specPost.author.id ? (
        <span
          onClick={() => deleteComment(obj)}
          className={
            "cursor-pointer text-rose-500 underline hover:text-rose-600"
          }
        >
          delete
        </span>
      ) : (
        <span className={"hidden"}>x</span>
      )}
    </div>
  );
};

export default CommentsDel;
