import { uiState } from "../reducers/ui-red";

export const store = {
  state: uiState,
  dispatch: () => {},
  hasInteracted: false,
  setHasInteracted: () => {},
  isError: false,
  setIsError: () => {},
  errorMsg: "",
  setErrorMsg: () => {},
  isLoading: false,
  setIsLoading: () => {},
};
