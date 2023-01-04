import classes from "./PostItem.module.css";
import profile_classes from "../../../pages/User/User.module.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userCtx } from "../../../features/user-ctx";
import OptionBox from "../OptionBox/OptionBox";
import MoreLikeThis from "../MoreLikeThis/MoreLikeThis";
import parse from "html-react-parser";
import PostItemBanner from "../PostItemBanner/PostItemBanner";

const PostItem = ({ obj, profile }) => {
  const nav = useNavigate();
  const userMgr = useContext(userCtx);

  return (
    <li className={profile ? profile_classes.li : classes.li}>
      {profile || <PostItemBanner obj={obj} />}
      <img
        alt={`${obj.title}`}
        onClick={() => nav(`/posts/${obj.id}`)}
        className={profile ? profile_classes.img : classes.img}
        src={obj.url}
      />
      <h4 onClick={() => nav(`/posts/${obj.id}`)} className={classes.title}>
        {obj.title}
      </h4>
      <div className={classes.p}>{parse(obj.content.substring(0, 47))}...</div>
      <div className={profile ? profile_classes.pOptions : classes.pOptions}>
        <MoreLikeThis label={obj.label} />
        {obj.author.username === userMgr.currentUser.user.username && (
          <OptionBox username={obj.author.username} _id={obj._id} />
        )}
      </div>
    </li>
  );
};

export default PostItem;
