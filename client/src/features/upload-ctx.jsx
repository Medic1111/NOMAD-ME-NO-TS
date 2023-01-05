import { createContext, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { store } from "./upload-models";

export const uploadCtx = createContext(store);

const UploadProvider = ({ children }) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { callApi } = useAxios();

  const handleUpload = async (e) => {
    setIsLoading(true);
    if (e.target.files) {
      const file = e.target.files[0];
      let form = new FormData();
      form.append("image", file);
      await callApi("POST", "/api/v1/image", form, setUrl);
    }
    setIsLoading(false);
  };

  return (
    <uploadCtx.Provider
      value={{
        url,
        setUrl,
        isLoading,
        setIsLoading,
        handleUpload,
      }}
    >
      {children}
    </uploadCtx.Provider>
  );
};

export default UploadProvider;
