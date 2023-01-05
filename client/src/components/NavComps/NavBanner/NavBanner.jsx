import classes from "./NavBanner.module.css";
import React, { useContext } from "react";
import LabelBadge from "../LabelBadge/LabelBadge";
import { postCtx } from "../../../features/posts-ctx";
import { userCtx } from "../../../features/user-ctx";
import { uiCtx } from "../../../features/ui-ctx";
import { uploadCtx } from "../../../features/upload-ctx";

const NavBanner = () => {
  const userMgr = useContext(userCtx);
  const postMgr = useContext(postCtx);
  const uploadMgr = useContext(uploadCtx);
  const uiMgr = useContext(uiCtx);

  return (
    <aside className={classes.aside}>
      <p className={classes.welcome}>
        Welcome {userMgr.currentUser.user.username}
      </p>
      <div className={classes.labelBtnBox}>
        {postMgr.isFiltering && <LabelBadge />}
        <span
          onClick={() => {
            uiMgr.dispatch({ type: "CREATEPOST" });
            uploadMgr.setUrl("");
          }}
          className={` material-symbols-outlined`}
          style={{ cursor: "pointer" }}
        >
          add_circle
        </span>
      </div>
    </aside>
  );
};

export default NavBanner;
