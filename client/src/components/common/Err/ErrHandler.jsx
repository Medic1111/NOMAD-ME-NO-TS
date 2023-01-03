import classes from "./ErrHandler.module.css";
import { useContext } from "react";
import { uiCtx } from "../../../features/ui-ctx";
import Button from "../Button/Button";

const Err = () => {
  const uiMgr = useContext(uiCtx);
  return (
    <article className={classes.article}>
      <h5>Oops</h5>
      <p>{uiMgr.errorMsg}</p>
      <Button
        className={classes.btn}
        text={"Okay"}
        onClick={() => uiMgr.setIsError(false)}
      />
    </article>
  );
};

export default Err;
