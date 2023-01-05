import classes from "./Modal.module.css";
import { useContext } from "react";
import AvatarForm from "../UserComps/AvatarForm/AvatarForm";
import NewPostForm from "../CrudForms/NewPostForm/NewPostForm";
import EditPostForm from "../CrudForms/EditPostForm/EditPostForm";
import { uiCtx } from "../../features/ui-ctx";
import SettingsDelForm from "../SettingsComps/SettingsDelForm/SettingsDelForm";
import SettingsPassForm from "../SettingsComps/SettingsPassForm/SettingsPassForm";

const Modal = () => {
  const uiMgr = useContext(uiCtx);
  return (
    <article className={classes.article}>
      {uiMgr.state.createPost && <NewPostForm />}
      {uiMgr.state.editAvatar && <AvatarForm />}
      {uiMgr.state.editPost && <EditPostForm />}
      {uiMgr.state.editPassword && <SettingsPassForm />}
      {uiMgr.state.deleteAccount && <SettingsDelForm />}
    </article>
  );
};

export default Modal;
