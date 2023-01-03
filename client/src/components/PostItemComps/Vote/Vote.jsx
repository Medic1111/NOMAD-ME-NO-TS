import React, { useContext } from "react";
import { postCtx } from "../../../features/posts-ctx";
import classes from "./Vote.module.css";

const Vote = ({ obj }) => {
  const postMgr = useContext(postCtx);

  return (
    <div className={`${classes.voteBox} flex_center`}>
      <span
        className={
          postMgr.voteRefetch
            ? `${classes.upvoted} material-symbols-outlined`
            : `${classes.upvote} material-symbols-outlined`
        }
        onClick={() => {
          postMgr.setVoteRefetch((prev) => !prev);
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
