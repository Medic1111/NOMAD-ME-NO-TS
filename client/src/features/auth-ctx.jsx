import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { uploadCtx } from "./upload-ctx";
import { userCtx } from "./user-ctx";
import { FormDataTemplate, StoreTemplate } from "./auth-models";

export const authCtx = createContext(StoreTemplate);

const AuthProvider = ({ children }) => {
  const nav = useNavigate();
  const userMgr = useContext(userCtx);
  const uploadMgr = useContext(uploadCtx);
  const [isAuth, setIsAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedMsg, setFeedMsg] = useState("");
  const [formData, setFormData] = useState(FormDataTemplate);
  const { callApi } = useAxios();

  const onInputChange = (e) => {
    // setShowFeedback(false);
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetFormData = () => setFormData(FormDataTemplate);

  const logoutHandler = async () => {
    setIsAuth(false);
    userMgr.setCurrentUser({ username: "" });
    await callApi("GET", "/api/v1/auth/logout", null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let url = showLogin ? "/api/v1/auth/login" : "/api/v1/auth/register";
    let success = await callApi(
      "POST",
      url,
      { ...formData, avatar: uploadMgr.url },
      userMgr.setCurrentUser
    );

    if (success) {
      setIsAuth(true);
      resetFormData();
      uploadMgr.setUrl("");
    }
  };

  const onShowForm = (which) => {
    which === "login" ? setShowLogin(true) : setShowLogin(false);
    uploadMgr.setUrl("");
    nav("/auth");
  };

  return (
    <authCtx.Provider
      value={{
        showLogin,
        setShowLogin,
        formData,
        setFormData,
        onInputChange,
        resetFormData,
        isAuth,
        setIsAuth,
        logoutHandler,
        // showFeedback,
        // setShowFeedback,
        // feedMsg,
        // setFeedMsg,
        onSubmit,
        onShowForm,
      }}
    >
      {children}
    </authCtx.Provider>
  );
};

export default AuthProvider;
