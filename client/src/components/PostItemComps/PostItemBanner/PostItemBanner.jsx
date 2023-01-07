import classes from "./PostItemBanner.module.css";
import { useNavigate } from "react-router-dom";
import Vote from "../Vote/Vote";

const PostItemBanner = ({ obj }) => {
  const nav = useNavigate();

  return (
    <div className={classes.userBox}>
      <div
        onClick={() => {
          nav(`/users/${obj.author.id}`);
        }}
        className={`${classes.avatarBox}`}
      >
        <img
          alt={obj.title}
          className={classes.avatar}
          src={obj.author.avatar}
        />
        <p className={classes.username}>{obj.author.username}</p>
      </div>
      <Vote obj={obj} />
    </div>
  );
};

export default PostItemBanner;
