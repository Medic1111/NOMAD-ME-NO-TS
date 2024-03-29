import { useContext } from "react";
import { userCtx } from "../../../features/user-ctx";
import CommentsForm from "../CommentsForm/CommentsForm";
import CommentList from "../CommentList/CommentList";
import CommentsWrapper from "../CommentsWrapper/CommentsWrapper";

const Comments = ({ specPost, setSpecPost }) => {
  const postId = specPost._id;
  const userId = useContext(userCtx).currentUser.user._id;

  return (
    <CommentsWrapper>
      <CommentsForm postId={postId} userId={userId} setSpecPost={setSpecPost} />

      <CommentList
        setSpecPost={setSpecPost}
        specPost={specPost}
        userId={userId}
        postId={postId}
      />
    </CommentsWrapper>
  );
};

export default Comments;
