import { useContext } from "react";
import { postCtx } from "../../../features/posts-ctx";
const MoreLikeThis = ({ label }) => {
  const postMgr = useContext(postCtx);

  return (
    <>
      {!postMgr.isFiltering && (
        <span
          className={
            "cursor-pointer underline text-rose-500 hover:text-rose-600"
          }
          onClick={() => postMgr.onMoreLikeThis(label)}
        >
          more like this
        </span>
      )}
    </>
  );
};

export default MoreLikeThis;
