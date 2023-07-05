import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import UserBanner from "../../components/UserComps/UserBanner/UserBanner";
import Spinner from "../../components/common/Spinner/Spinner";
const PostItemLazy = React.lazy(() =>
  import("../../components/PostItemComps/PostItem/PostItem")
);

const User = () => {
  const userId = useParams().id;
  const { callApi } = useAxios();
  const [user, setUser] = useState({
    user: { avatar: "", username: "", posts: [] },
  });

  const getUser = async () => {
    await callApi("GET", `/api/v1/users/${userId}`, null, setUser);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <main className={"w-full h-full flex flex-col items-center justify-start"}>
      <UserBanner
        username={user.user.username}
        avatar={user.user.avatar}
        postLength={user.user.posts.length || 0}
      />
      <ul
        className={
          " w-full h-full flex flex-col items-center justify-start p-5 gap-10"
        }
      >
        {user.user.posts.map((obj, index) => {
          return (
            <React.Suspense key={`${obj.id}_${index}`} fallback={<Spinner />}>
              <PostItemLazy obj={obj} profile={true} />
            </React.Suspense>
          );
        })}
      </ul>
    </main>
  );
};

export default User;
