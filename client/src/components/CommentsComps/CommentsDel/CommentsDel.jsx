import React from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";

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
    <div className="flex w-full justify-end align-end">
      {obj.by.id === userId || userId === specPost.author.id ? (
        <span
          onClick={() => deleteComment(obj)}
          className={
            "cursor-pointer text-2xl text-green-500 underline hover:text-rose-600"
          }
        >
          <AiOutlineDelete />
        </span>
      ) : null}
    </div>
  );
};

{
  /* <span className={"hidden"}>x</span> */
}

export default CommentsDel;
