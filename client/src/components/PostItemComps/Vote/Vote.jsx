import React, { useContext } from "react";
import { postCtx } from "../../../features/posts-ctx";
import { userCtx } from "../../../features/user-ctx";
import classes from "./Vote.module.css";

const Vote = ({ obj }) => {
  const postMgr = useContext(postCtx);
  const userMgr = useContext(userCtx);

  return (
    <div className={`${classes.voteBox} flex_center`}>
      <span
        className={
          obj.up_by.find(
            (el) => el.username !== userMgr.currentUser.user.usename
          )
            ? `${classes.upvoted} material-symbols-outlined`
            : `${classes.upvote} material-symbols-outlined`
        }
        onClick={() => {
          postMgr.onUpVote(obj._id);
        }}
      >
        arrow_upward
      </span>
      <span className={classes.upvoteCount}>{obj.voteCount}</span>
    </div>
  );
};

export default Vote;
