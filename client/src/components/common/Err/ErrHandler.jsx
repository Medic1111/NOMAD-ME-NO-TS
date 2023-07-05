import { useContext } from "react";
import Button from "../Button/Button";
import { uiCtx } from "../../../features/ui-ctx";
import { AttentionSeeker } from "react-awesome-reveal";
import { formCom } from "../../../styles/form_common";

const Err = () => {
  const uiMgr = useContext(uiCtx);
  return (
    <article
      className={`${formCom.container} bg-slate-50 w-[100vw] fixed top-0 h-screen mt-0 p-10 flex-col `}
    >
      <AttentionSeeker effect="headShake">
        <h5 className={formCom.title}>Oops</h5>
      </AttentionSeeker>
      <p className={formCom.feedback}>{uiMgr.errorMsg}</p>
      <Button
        className={formCom.submitBtn}
        text={"Okay"}
        onClick={() => uiMgr.setIsError(false)}
      />
    </article>
  );
};

export default Err;
