import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import OptionBox from "../OptionBox/OptionBox";
import MoreLikeThis from "../MoreLikeThis/MoreLikeThis";
import PostItemBanner from "../PostItemBanner/PostItemBanner";
import parse from "html-react-parser";
import { userCtx } from "../../../features/user-ctx";
import { postCom } from "../../../styles/post_comm";

const PostItem = ({ obj, profile }) => {
  const nav = useNavigate();
  const userMgr = useContext(userCtx);

  return (
    <li
      className={
        profile
          ? " h-[36em] w-full sm:w-4/5 h-auto flex flex-col gap-5 bg-slate-100 items-center justify-between py-5 overflow-auto"
          : " h-[36em] w-full md:w-1/3 lg:w-1/4 h-auto flex flex-col gap-5 bg-slate-100 items-center justify-between py-5 overflow-auto"
      }
    >
      {profile || <PostItemBanner obj={obj} />}
      <img
        alt={`${obj.title}`}
        onClick={() => nav(`/posts/${obj.id}`)}
        className={"cursor-pointer object-cover  h-1/2 max-h-[50vh] w-full"}
        src={obj.url}
      />
      <h4
        onClick={() => nav(`/posts/${obj.id}`)}
        className={"cursor-pointer text-2xl text-slate-800"}
      >
        {obj.title}
      </h4>
      <div className={"px-5 w-full h-auto"}>
        {parse(obj.content.substring(0, 147))}...
      </div>
      <div
        className={
          "h-12 w-full flex items-center justify-between px-5 justify-self-end align-self-end"
        }
      >
        <MoreLikeThis label={obj.label} />
        {obj.author.username === userMgr.currentUser.user.username && (
          <OptionBox username={obj.author.username} _id={obj._id} />
        )}
      </div>
    </li>
  );
};

export default PostItem;
