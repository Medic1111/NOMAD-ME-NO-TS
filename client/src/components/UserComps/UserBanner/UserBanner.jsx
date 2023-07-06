import React, { useContext } from "react";
import AvatarForm from "../AvatarForm/AvatarForm";
import AvatarBox from "../AvatarBox/AvatarBox";
import { uiCtx } from "../../../features/ui-ctx";

const UserBanner = ({ username, avatar, postLength }) => {
  const uiMgr = useContext(uiCtx);

  return (
    <>
      {uiMgr.state.editAvatar && <AvatarForm />}
      <div className="flex bg-green-300 w-full items-start justify-between  py-5 px-1 sm:px-10">
        <div className="flex items-start gap-5">
          <AvatarBox username={username} avatar={avatar} />
        </div>
        <p>total posts: {postLength}</p>
      </div>
    </>
  );
};
export default UserBanner;
