import classes from "../../components/PostItemComps/PostItem/PostItem.module.css";
import spec_classes from "./SpecPost.module.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OptionBox from "../../components/PostItemComps/OptionBox/OptionBox";
import { userCtx } from "../../features/user-ctx";
import MoreLikeThis from "../../components/PostItemComps/MoreLikeThis/MoreLikeThis";
import parse from "html-react-parser";
import PostItemBanner from "../../components/PostItemComps/PostItemBanner/PostItemBanner";
import { useAxios } from "../../hooks/useAxios";
import { postCtx } from "../../features/posts-ctx";

const SpecPost = () => {
  const userMgr = useContext(userCtx);
  const postId = useParams().id;
  const [data, setData] = useState({
    content: "",
    author: { username: "" },
    up_by: [],
    voteCount: 0,
  });

  const { callApi } = useAxios();

  const fetchData = async () => {
    await callApi("GET", `/api/v1/posts/${postId}`, null, setData);
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  return (
    <main className={`${spec_classes.main} flex_col_center`}>
      <PostItemBanner obj={data} />
      <img
        style={{ cursor: "default" }}
        className={spec_classes.img}
        src={data.url}
      />
      <h4 style={{ cursor: "default" }} className={classes.title}>
        {data.title}
      </h4>
      <div className={spec_classes.pContent}>{parse(data.content)}</div>
      <div className={spec_classes.pOptions}>
        <MoreLikeThis label={data.label} />
        <div className={classes.userOptions}>
          {data.author.username === userMgr.currentUser.user.username && (
            <OptionBox username={data.author.username} _id={data._id} />
          )}
        </div>
      </div>
    </main>
  );
};

export default SpecPost;
