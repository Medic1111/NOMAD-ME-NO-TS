import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <article className={classes.article}>
      <div className={classes.wrapper}>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <div className={classes.shadow}></div>
        <div className={classes.shadow}></div>
        <div className={classes.shadow}></div>
      </div>
    </article>
  );
};

export default Spinner;
