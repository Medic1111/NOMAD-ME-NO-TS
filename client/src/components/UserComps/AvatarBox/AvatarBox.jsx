import classes from "./AvatarBox.module.css";
import { useContext } from "react";
import { userCtx } from "../../../features/user-ctx";
import { uiCtx } from "../../../features/ui-ctx";
import { uploadCtx } from "../../../features/upload-ctx";
import SettingsIcon from "../../SettingsComps/SettingsIcon/SettingsIcon";

const AvatarBox = ({ username, avatar }) => {
  const userMgr = useContext(userCtx);
  const uiMgr = useContext(uiCtx);
  const uploadMgr = useContext(uploadCtx);

  return (
    <div className={`${classes.avatarBox} flex_col_center`}>
      <img
        alt={`profile ${username}`}
        className={
          userMgr.currentUser.user.username === username
            ? classes.userAvatar
            : classes.avatar
        }
        onClick={() => {
          if (userMgr.currentUser.user.username === username) {
            uiMgr.dispatch({ type: "EDITAVATAR" });
            uploadMgr.setUrl("");
          }
        }}
        src={avatar}
      />
      {userMgr.currentUser.user.username === username && <SettingsIcon />}
    </div>
  );
};

export default AvatarBox;
