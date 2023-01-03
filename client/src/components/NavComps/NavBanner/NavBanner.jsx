import React, { useContext } from "react";
import { postCtx } from "../../../features/posts-ctx";
import { userCtx } from "../../../features/user-ctx";
import { uiCtx } from "../../../features/ui-ctx";
import classes from "./NavBanner.module.css";
import LabelBadge from "../LabelBadge/LabelBadge";
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
        <button
          className={classes.btnCreate}
          onClick={() => {
            uiMgr.dispatch({ type: "CREATEPOST" });
            uploadMgr.setUrl("");
          }}
        >
          +
        </button>
      </div>
    </aside>
  );
};

export default NavBanner;
