import React, { useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { userCtx } from "./user-ctx";
import { uiCtx } from "./ui-ctx";
import { useAxios } from "../hooks/useAxios";
import { specPostTemplate, store } from "./posts-models";

export const postCtx = createContext(store);

const PostsProvider = ({ children }) => {
  const nav = useNavigate();
  const { callApi } = useAxios();
  const userMgr = useContext(userCtx);
  const uiMgr = useContext(uiCtx);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [postIdToEdit, setPostIdToEdit] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [labelToDisplay, setLabelToDisplay] = useState("");
  const [specPost, setSpecPost] = useState(specPostTemplate);

  const fetchPostApi = async (prevent) =>
    await callApi(
      "GET",
      "/api/v1/posts",
      null,
      setDisplayPosts,
      prevent && true //prevents loading spinner if passed
    );

  const onCreateNewPost = async (postData) => {
    let success = await callApi("POST", "/api/v1/posts", postData);
    success && fetchPostApi();
    uiMgr.dispatch({ type: "CLOSE" });
  };

  const onDelPost = async (username, _id) => {
    let success = await callApi("DELETE", `/api/v1/posts/${_id}`, {
      data: username,
    });
    success && fetchPostApi();
    nav("/posts");
  };

  const onUpVote = async (id) => {
    let success = await callApi(
      "PATCH",
      `/api/v1/posts/${id}/up_vote`,
      {
        username: userMgr.currentUser.user.username,
      },
      null,
      true //prevents loading Spinner
    );
    success && fetchPostApi(true);
    await callApi(
      "GET",
      `/api/v1/posts/${id}`,
      null,
      setSpecPost,
      true /*prevents loading spinner*/
    );
  };

  const onEditPost = async (id, oldData) => {
    let success = await callApi("PATCH", `/api/v1/posts/${id}`, oldData);
    if (success) {
      fetchPostApi();
      uiMgr.dispatch({ type: "CLOSE" });
    }
  };

  const onMoreLikeThis = async (label) => {
    const success = await callApi(
      "GET",
      `/api/v1/posts?label=${label}`,
      null,
      setDisplayPosts,
      true //prevents loading Spinner
    );
    if (success) {
      setIsFiltering(true);
      setLabelToDisplay(label);
      nav("/posts");
    }
  };

  return (
    <postCtx.Provider
      value={{
        displayPosts,
        setDisplayPosts,
        onDelPost,
        fetchPostApi,
        onCreateNewPost,
        onUpVote,
        onEditPost,
        postIdToEdit,
        setPostIdToEdit,
        onMoreLikeThis,
        isFiltering,
        setIsFiltering,
        labelToDisplay,
        setLabelToDisplay,
        specPost,
        setSpecPost,
      }}
    >
      {children}
    </postCtx.Provider>
  );
};

export default PostsProvider;
