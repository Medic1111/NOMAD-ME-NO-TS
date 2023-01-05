import React, { useContext, useEffect } from "react";
import classes from "./Posts.module.css";
import Modal from "../../components/Modal/Modal";
import NavBanner from "../../components/NavComps/NavBanner/NavBanner";
import SwipeAnim from "../../components/SwipeAnim/SwipeAnim";
import Spinner from "../../components/common/Spinner/Spinner";
import { uiCtx } from "../../features/ui-ctx";
import { postCtx } from "../../features/posts-ctx";

const PostItemLazy = React.lazy(() =>
  import("../../components/PostItemComps/PostItem/PostItem")
);
const Posts = () => {
  const uiMgr = useContext(uiCtx);
  const postMgr = useContext(postCtx);

  useEffect(() => {
    if (
      postMgr.isFiltering ||
      uiMgr.state.createPost ||
      uiMgr.state.editAvatar ||
      uiMgr.state.editPost
    ) {
      return;
    }
    postMgr.fetchPostApi();
  }, [uiMgr.state.createPost, uiMgr.state.editAvatar, uiMgr.state.editPost]);

  return (
    <main className={classes.main} onClick={() => uiMgr.setHasInteracted(true)}>
      {uiMgr.state.showModal && <Modal />}
      <NavBanner />
      {uiMgr.hasInteracted || <SwipeAnim />}
      <ul className={classes.ul} onScroll={() => uiMgr.setHasInteracted(true)}>
        {postMgr.displayPosts.map((obj, index) => {
          return (
            <React.Suspense key={`${obj.title}${index}`} fallback={<Spinner />}>
              <PostItemLazy obj={obj} />
            </React.Suspense>
          );
        })}
      </ul>
    </main>
  );
};

export default Posts;
