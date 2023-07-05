import Button from "../../common/Button/Button";
import { useContext } from "react";
import { uiCtx } from "../../../features/ui-ctx";
import { useNavigate } from "react-router-dom";
import { formCom } from "../../../styles/form_common";
const SettingsActions = () => {
  const uiMgr = useContext(uiCtx);
  const nav = useNavigate();
  return (
    <div className={"flex  items-start flex-col"}>
      <Button
        text={"delete account"}
        className={formCom.feedback}
        onClick={() => {
          nav("/posts");
          uiMgr.dispatch({ type: "DELETEACCOUNT" });
        }}
      />
      <Button
        text={"change password"}
        className={formCom.feedback}
        onClick={() => {
          nav("/posts");
          uiMgr.dispatch({ type: "EDITPASSWORD" });
        }}
      />
    </div>
  );
};

export default SettingsActions;
