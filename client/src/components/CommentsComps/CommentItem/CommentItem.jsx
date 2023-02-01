import classes from "./CommentItem.module.css";
import CommentsDel from "../CommentsDel/CommentsDel";

const CommentItem = ({ obj, userId, postId, setSpecPost, specPost }) => {
  return (
    <li className={classes.li}>
      <div className={classes.userBox}>
        <img className={classes.avatar} src={obj.by.avatar} />
        <p>{obj.by.username}</p>
      </div>
      <div className={classes.txtBox}>
        <p className={classes.content}>{obj.content}</p>
        <CommentsDel
          obj={obj}
          setSpecPost={setSpecPost}
          specPost={specPost}
          userId={userId}
          postId={postId}
        />
      </div>
    </li>
  );
};

export default CommentItem;
