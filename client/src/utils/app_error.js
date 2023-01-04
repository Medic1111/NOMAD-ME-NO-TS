export const app_error = (err, setIsError, setErrMsg) => {
  console.log(err);
  // TEST
  if (err.response.status === 403) return false;
  // TEST END
  let message;
  if (!err.response.data) {
    message = err.response;
  } else {
    message = err.response.data.message;
  }

  setIsError(true);
  setErrMsg(message || "Something went wrong");
};
