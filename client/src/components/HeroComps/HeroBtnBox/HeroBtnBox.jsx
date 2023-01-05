import classes from "./HeroBtnBox.module.css";
import { useContext } from "react";
import Button from "../../common/Button/Button";
import { authCtx } from "../../../features/auth-ctx";

const HeroBtnBox = () => {
  const authMgr = useContext(authCtx);

  return (
    <div className={`${classes.btnBox} flex_center`}>
      <Button
        className={`${classes.btn} btn_standard`}
        text={"Sign Up"}
        onClick={() => authMgr.onShowForm("register")}
      />
      <Button
        className={`${classes.btn} btn_standard`}
        text={"Login"}
        onClick={() => authMgr.onShowForm("login")}
      />
    </div>
  );
};
export default HeroBtnBox;
