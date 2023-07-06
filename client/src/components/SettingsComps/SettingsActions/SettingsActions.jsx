import Button from "../../common/Button/Button";
import { useContext } from "react";
import { uiCtx } from "../../../features/ui-ctx";
import { useNavigate } from "react-router-dom";
import { formCom } from "../../../styles/form_common";
import { AiOutlineDelete } from "react-icons/ai";
import { PiPasswordLight } from "react-icons/pi";
const SettingsActions = () => {
  const uiMgr = useContext(uiCtx);
  const nav = useNavigate();
  return (
    <div className={"flex gap-5 items-center "}>
      <Button
        text={<PiPasswordLight />}
        className={`${formCom.feedback} text-xl`}
        onClick={() => {
          nav("/posts");
          uiMgr.dispatch({ type: "EDITPASSWORD" });
        }}
      />
      <Button
        text={<AiOutlineDelete />}
        className={`${formCom.feedback} text-xl`}
        onClick={() => {
          nav("/posts");
          uiMgr.dispatch({ type: "DELETEACCOUNT" });
        }}
      />
    </div>
  );
};

export default SettingsActions;
