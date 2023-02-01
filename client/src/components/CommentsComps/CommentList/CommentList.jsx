import classes from "./CommentList.module.css";
import CommentItem from "../CommentItem/CommentItem";

const CommentList = ({ specPost, setSpecPost, userId, postId }) => {
  return (
    <ul className={classes.ul}>
      {specPost.comments &&
        specPost.comments.map((obj, index) => {
          return (
            <CommentItem
              key={`COMMENT_${index}`}
              obj={obj}
              setSpecPost={setSpecPost}
              specPost={specPost}
              userId={userId}
              postId={postId}
            />
          );
        })}
    </ul>
  );
};

export default CommentList;
