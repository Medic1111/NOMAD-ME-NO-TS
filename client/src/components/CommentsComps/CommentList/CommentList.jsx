import CommentItem from "../CommentItem/CommentItem";

const CommentList = ({ specPost, setSpecPost, userId, postId }) => {
  return (
    <ul className={"py-5 w-full flex flex-col gap-10 h-auto overflow-auto "}>
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
