import axios from "axios";
import { useCallback, useContext } from "react";
import { uiCtx } from "../features/ui-ctx";
import { app_error } from "../utils/app_error";

export const useAxios = () => {
  const uiMgr = useContext(uiCtx);

  const callApi = useCallback(
    async (method, url, body, setState, preventLoad) => {
      let success = false;
      !preventLoad && uiMgr.setIsLoading(true);

      const controller = new AbortController();

      await axios({
        method,
        url,
        data: body,
        signal: controller.signal,
      })
        .then((serverRes) => {
          success = true;
          if (serverRes.data.length && typeof serverRes.data !== "string") {
            serverRes.data = serverRes.data.reverse();
          } else if (serverRes.data.user) {
            if (serverRes.data.user.posts) {
              serverRes.data.user.posts = serverRes.data.user.posts.reverse();
            }
          }
          setState && setState(serverRes.data);
        })
        .catch((err) => {
          app_error(err, uiMgr.setIsError, uiMgr.setErrorMsg);
        })
        .finally(() => {
          uiMgr.setIsLoading(false);
        });

      controller.abort();
      return success;
    },
    [uiMgr]
  );

  return { callApi };
};
