import classes from "../../components/PostItemComps/PostItem/PostItem.module.css";
import spec_classes from "./SpecPost.module.css";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import OptionBox from "../../components/PostItemComps/OptionBox/OptionBox";
import MoreLikeThis from "../../components/PostItemComps/MoreLikeThis/MoreLikeThis";
import PostItemBanner from "../../components/PostItemComps/PostItemBanner/PostItemBanner";
import { useAxios } from "../../hooks/useAxios";
import { postCtx } from "../../features/posts-ctx";
import { userCtx } from "../../features/user-ctx";
import parse from "html-react-parser";
import Comments from "../../components/CommentsComps/Comments/Comments";

const SpecPost = () => {
  const userMgr = useContext(userCtx);
  const postMgr = useContext(postCtx);
  const postId = useParams().id;

  const { callApi } = useAxios();

  const fetchData = async () => {
    await callApi("GET", `/api/v1/posts/${postId}`, null, postMgr.setSpecPost);
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <div className={spec_classes.wrapper}>
      <main className={`${spec_classes.main} flex_col_center`}>
        <PostItemBanner obj={postMgr.specPost} />
        <img
          alt={postMgr.specPost.title}
          style={{ cursor: "default" }}
          className={spec_classes.img}
          src={postMgr.specPost.url}
        />
        <h4 style={{ cursor: "default" }} className={classes.title}>
          {postMgr.specPost.title}
        </h4>
        <div className={spec_classes.pContent}>
          {parse(postMgr.specPost.content)}
        </div>
        <div className={spec_classes.pOptions}>
          <MoreLikeThis label={postMgr.specPost.label} />
          <div className={classes.userOptions}>
            {postMgr.specPost.author.username ===
              userMgr.currentUser.user.username && (
              <OptionBox
                username={postMgr.specPost.author.username}
                _id={postMgr.specPost._id}
              />
            )}
          </div>
        </div>
      </main>
      <Comments specPost={postMgr.specPost} setSpecPost={postMgr.setSpecPost} />
    </div>
  );
};

export default SpecPost;
