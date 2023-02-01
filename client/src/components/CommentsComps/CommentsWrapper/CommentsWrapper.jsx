import classes from "./CommentsWrapper.module.css";

const CommentsWrapper = ({ children }) => {
  return <section className={classes.commentBox}>{children}</section>;
};

export default CommentsWrapper;
