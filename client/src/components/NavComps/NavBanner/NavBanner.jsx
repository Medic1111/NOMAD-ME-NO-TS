import React, { useContext } from "react";
import LabelBadge from "../LabelBadge/LabelBadge";
import { postCtx } from "../../../features/posts-ctx";
import { userCtx } from "../../../features/user-ctx";
import { uiCtx } from "../../../features/ui-ctx";
import { uploadCtx } from "../../../features/upload-ctx";
import { IoMdCreate } from "react-icons/io";

const NavBanner = () => {
  const userMgr = useContext(userCtx);
  const postMgr = useContext(postCtx);
  const uploadMgr = useContext(uploadCtx);
  const uiMgr = useContext(uiCtx);

  return (
    <aside
      className={
        "flex bg-green-400 justify-between items-center h-12  w-full px-5"
      }
    >
      <p className={"text-slate-800 capitalize"}>
        Welcome {userMgr.currentUser.user.username}
      </p>
      <div className={"flex justify-center items-center gap-5"}>
        {postMgr.isFiltering && <LabelBadge />}
        <span
          onClick={() => {
            uiMgr.dispatch({ type: "CREATEPOST" });
            uploadMgr.setUrl("");
          }}
          className={`text-2xl cursor-pointer material-symbols-outlined hover:text-rose-600`}
          style={{ cursor: "pointer" }}
        >
          <IoMdCreate />
        </span>
      </div>
    </aside>
  );
};

export default NavBanner;
