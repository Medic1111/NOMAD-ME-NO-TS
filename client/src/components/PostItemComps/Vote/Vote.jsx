import React, { useContext } from "react";
import { postCtx } from "../../../features/posts-ctx";
import { userCtx } from "../../../features/user-ctx";

const Vote = ({ obj }) => {
  const postMgr = useContext(postCtx);
  const userMgr = useContext(userCtx);

  return (
    <div className={`flex items-center justify-center gap-3`}>
      <span
        className={
          Object.values(obj)[5].find((user) =>
            user.username.includes(userMgr.currentUser.user.username)
          )
            ? `text-slate-gray-500 cursor-pointer material-symbols-outlined`
            : `text-rose-500 cursor-pointer material-symbols-outlined`
        }
        onClick={() => {
          postMgr.onUpVote(obj._id);
        }}
      >
        arrow_upward
      </span>
      <span>{obj.voteCount}</span>
    </div>
  );
};

export default Vote;
