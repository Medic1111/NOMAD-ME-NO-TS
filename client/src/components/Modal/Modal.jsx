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
    <article className={"fixed w-full bg-slate-50 h-full top-0 left-0"}>
      {uiMgr.state.createPost && <NewPostForm />}
      {uiMgr.state.editAvatar && <AvatarForm />}
      {uiMgr.state.editPost && <EditPostForm />}
      {uiMgr.state.editPassword && <SettingsPassForm />}
      {uiMgr.state.deleteAccount && <SettingsDelForm />}
    </article>
  );
};

export default Modal;
