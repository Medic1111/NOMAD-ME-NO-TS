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
    <div className={"flex  gap-3 items-start justify-center "}>
      <img
        alt={`profile ${username}`}
        className="cursor-pointer object-cover w-10 h-10 rounded-full"
        onClick={() => {
          if (userMgr.currentUser.user.username === username) {
            uiMgr.dispatch({ type: "EDITAVATAR" });
            uploadMgr.setUrl("");
          }
        }}
        src={avatar}
      />
      <h1 className="capitalize text-lg ">{username}</h1>

      {userMgr.currentUser.user.username === username && <SettingsIcon />}
    </div>
  );
};

export default AvatarBox;
