import { useNavigate } from "react-router-dom";
import Vote from "../Vote/Vote";

const PostItemBanner = ({ obj }) => {
  const nav = useNavigate();

  return (
    <div className={"flex w-full items-center justify-between sm:px-5"}>
      <div
        onClick={() => {
          nav(`/users/${obj.author.id}`);
        }}
        className={"flex items-center gap-2"}
      >
        <img
          alt={obj.title}
          className={"cursor-pointer object-cover w-10 h-10 rounded-full"}
          src={obj.author.avatar}
        />
        <p className={"cursor-pointer text-slate-700"}>{obj.author.username}</p>
      </div>
      <Vote obj={obj} />
    </div>
  );
};

export default PostItemBanner;
