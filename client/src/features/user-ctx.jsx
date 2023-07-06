import { createContext, useContext, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { uploadCtx } from "./upload-ctx";
import { store } from "./user-models";

export const userCtx = createContext(store);

const UserProvider = ({ children }) => {
  const uploadMgr = useContext(uploadCtx);
  const [currentUser, setCurrentUser] = useState({ username: "" });
  const { callApi } = useAxios();
  const [toggleActions, setToggleActions] = useState(false);

  const onUpdateAvatar = async () => {
    await callApi("PATCH", `/api/v1/users/${currentUser.user.id}`, {
      avatar: uploadMgr.url,
    });
  };

  return (
    <userCtx.Provider
      value={{
        currentUser,
        setCurrentUser,
        onUpdateAvatar,
        toggleActions,
        setToggleActions,
      }}
    >
      {children}
    </userCtx.Provider>
  );
};

export default UserProvider;
