import classes from "./User.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserBanner from "../../components/UserComps/UserBanner/UserBanner";
import { useAxios } from "../../hooks/useAxios";
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
    <main className={`${classes.main} flex_col_center`}>
      <UserBanner
        username={user.user.username}
        avatar={user.user.avatar}
        postLength={user.user.posts.length || 0}
      />
      <ul className={`${classes.ul} flex_col_center`}>
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
