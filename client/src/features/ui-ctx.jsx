import { createContext, useState, useReducer } from "react";
import uiRed from "../reducers/ui-red";
import { uiState } from "../reducers/ui-red";
import { store } from "./ui-models";

export const uiCtx = createContext(store);

const UiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiRed, uiState);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <uiCtx.Provider
      value={{
        state,
        dispatch,
        isError,
        setIsError,
        errorMsg,
        setErrorMsg,
        isLoading,
        setIsLoading,
        hasInteracted,
        setHasInteracted,
      }}
    >
      {children}
    </uiCtx.Provider>
  );
};
export default UiProvider;
