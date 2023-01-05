import classes from "./Modal.module.css";
import { useContext } from "react";
import AvatarForm from "../UserComps/AvatarForm/AvatarForm";
import NewPostForm from "../CrudForms/NewPostForm/NewPostForm";
import EditPostForm from "../CrudForms/EditPostForm/EditPostForm";
import { uiCtx } from "../../features/ui-ctx";

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
