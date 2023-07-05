import CommentsDel from "../CommentsDel/CommentsDel";

const CommentItem = ({ obj, userId, postId, setSpecPost, specPost }) => {
  return (
    <li
      className={
        "w-full gap-5 flex items-start flex-col justify-start p-3  bg-slate-100"
      }
    >
      <div className={"flex gap-3 capitalize"}>
        <img
          className={"cursor-pointer object-cover w-10 h-10 rounded-full"}
          src={obj.by.avatar}
        />
        <p>{obj.by.username}</p>
      </div>
      <div className={""}>
        <p className={"px-12"}>{obj.content}</p>
        <CommentsDel
          obj={obj}
          setSpecPost={setSpecPost}
          specPost={specPost}
          userId={userId}
          postId={postId}
        />
      </div>
    </li>
  );
};

export default CommentItem;
