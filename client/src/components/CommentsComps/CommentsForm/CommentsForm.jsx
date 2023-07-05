import React, { useState } from "react";
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
    <div className="w-full flex my-5">
      <input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        type={"text"}
        className={
          "h-[5vh] focus-on rounded-lg text-lg  w-full  px-[0.25em] outline-green-500"
        }
      />
      <button
        className={
          "h-[5vh] rounded-lg bg-green-400 cursor-pointer hover:bg-rose-500 text-lg w-2/5  px-[0.25em] outline-green-500"
        }
        onClick={() => commentApi()}
      >
        comment
      </button>
    </div>
  );
};

export default CommentsForm;
