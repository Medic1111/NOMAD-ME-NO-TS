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
import { postCom } from "../../styles/post_comm";
import { scrollToTop } from "../../utils/scroll_top";

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
    scrollToTop();
  }, [postId]);

  return (
    <div className={postCom.container}>
      <main className={postCom.main}>
        <PostItemBanner obj={postMgr.specPost} />
        <img
          alt={postMgr.specPost.title}
          style={{ cursor: "default" }}
          className={`${postCom.img} `}
          src={postMgr.specPost.url}
        />
        <h4 style={{ cursor: "default" }} className={postCom.title}>
          {postMgr.specPost.title}
        </h4>
        <div className={postCom.p}>{parse(postMgr.specPost.content)}</div>
        <div className={postCom.optionBox}>
          <MoreLikeThis label={postMgr.specPost.label} />
          {postMgr.specPost.author.username ===
            userMgr.currentUser.user.username && (
            <OptionBox
              username={postMgr.specPost.author.username}
              _id={postMgr.specPost._id}
            />
          )}
        </div>
      </main>
      <Comments specPost={postMgr.specPost} setSpecPost={postMgr.setSpecPost} />
    </div>
  );
};

export default SpecPost;
