import React, { useContext } from "react";
import { uiCtx } from "../../../features/ui-ctx";
import classes from "./UserBanner.module.css";
import AvatarForm from "../AvatarForm/AvatarForm";
import AvatarBox from "../AvatarBox/AvatarBox";

const UserBanner = ({ username, avatar, postLength }) => {
  const uiMgr = useContext(uiCtx);

  return (
    <React.Fragment>
      {uiMgr.state.editAvatar && <AvatarForm />}
      <h1 className={classes.h1}>{username}</h1>
      <AvatarBox username={username} avatar={avatar} />
      <p className={classes.totalPosts}>total posts: {postLength}</p>
    </React.Fragment>
  );
};
export default UserBanner;
