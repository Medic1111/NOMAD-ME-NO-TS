import classes from "./MoreLikeThis.module.css";
import { useContext } from "react";
import { postCtx } from "../../../features/posts-ctx";
const MoreLikeThis = ({ label }) => {
  const postMgr = useContext(postCtx);

  return (
    <>
      {!postMgr.isFiltering && (
        <span
          className={classes.span}
          onClick={() => postMgr.onMoreLikeThis(label)}
        >
          more like this
        </span>
      )}
    </>
  );
};

export default MoreLikeThis;
