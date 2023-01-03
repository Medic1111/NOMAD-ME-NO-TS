import axios from "axios";
import { useCallback, useContext } from "react";
import { uiCtx } from "../features/ui-ctx";
import { app_error } from "../utils/app_error";

export const useAxios = () => {
  const uiMgr = useContext(uiCtx);

  const callApi = useCallback(
    async (method, url, body, setState) => {
      let success = false;
      uiMgr.setIsLoading(true);

      await axios({
        method,
        url,
        data: body,
      })
        .then((serverRes) => {
          success = true;
          setState && setState(serverRes.data);
        })
        .catch((err) => {
          app_error(err, uiMgr.setIsError, uiMgr.setErrorMsg);
        })
        .finally(() => {
          uiMgr.setIsLoading(false);
        });

      return success;
    },
    [uiMgr]
  );

  return { callApi };
};
