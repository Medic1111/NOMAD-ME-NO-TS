export const app_error = (err, setIsError, setErrMsg) => {
  if (err.response.status === 403) return false;
  let message;
  if (!err.response.data) {
    message = err.response;
  } else {
    message = err.response.data.message;
  }

  setIsError(true);
  setErrMsg(message || "Something went wrong");
};
