import classes from "./SettingsActions.module.css";
import Button from "../../common/Button/Button";
import { useContext } from "react";
import { uiCtx } from "../../../features/ui-ctx";
import { useNavigate } from "react-router-dom";

const SettingsActions = () => {
  const uiMgr = useContext(uiCtx);
  const nav = useNavigate();
  return (
    <div className={`${classes.actionBox} flex_center`}>
      <Button
        text={"delete account"}
        className={`${classes.actionBtn} btn_standard`}
        onClick={() => {
          nav("/posts");
          uiMgr.dispatch({ type: "DELETEACCOUNT" });
        }}
      />
      <Button
        text={"change password"}
        className={`${classes.actionBtn} btn_standard`}
        onClick={() => {
          nav("/posts");
          uiMgr.dispatch({ type: "EDITPASSWORD" });
        }}
      />
    </div>
  );
};

export default SettingsActions;
