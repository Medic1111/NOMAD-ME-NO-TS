import classes from "./ErrHandler.module.css";
import { useContext } from "react";
import Button from "../Button/Button";
import { uiCtx } from "../../../features/ui-ctx";
import { AttentionSeeker } from "react-awesome-reveal";

const Err = () => {
  const uiMgr = useContext(uiCtx);
  return (
    <article className={classes.article}>
      <AttentionSeeker effect="headShake">
        <h5 className={classes.h5}>Oops</h5>
      </AttentionSeeker>
      <p className={classes.p}>{uiMgr.errorMsg}</p>
      <Button
        className={`${classes.btn} btn_standard`}
        text={"Okay"}
        onClick={() => uiMgr.setIsError(false)}
      />
    </article>
  );
};

export default Err;
