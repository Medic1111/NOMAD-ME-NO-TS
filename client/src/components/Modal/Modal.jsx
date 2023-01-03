import { useContext } from "react";
import classes from "./Modal.module.css";
import { uiCtx } from "../../features/ui-ctx";
import AvatarForm from "../UserComps/AvatarForm/AvatarForm";
import NewPostForm from "../CrudForms/NewPostForm/NewPostForm";
import EditPostForm from "../CrudForms/EditPostForm/EditPostForm";
const Modal = () => {
  const uiMgr = useContext(uiCtx);
  return (
    <article className={classes.article}>
      {uiMgr.state.createPost && <NewPostForm />}
      {uiMgr.state.editAvatar && <AvatarForm />}
      {uiMgr.state.editPost && <EditPostForm />}
    </article>
  );
};

export default Modal;
