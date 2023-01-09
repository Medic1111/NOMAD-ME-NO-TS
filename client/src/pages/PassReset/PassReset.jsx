import { useState } from "react";
import RequestTemp from "../../components/PassResetComps/RequestTemp/RequestTemp";
import ResetPass from "../../components/PassResetComps/ResetPass/ResetPass";

const PassReset = () => {
  const [requestComplete, setRequestComplete] = useState(false);

  return (
    <>
      {!requestComplete ? (
        <RequestTemp setRequestComplete={setRequestComplete} />
      ) : (
        <ResetPass />
      )}
    </>
  );
};

export default PassReset;
