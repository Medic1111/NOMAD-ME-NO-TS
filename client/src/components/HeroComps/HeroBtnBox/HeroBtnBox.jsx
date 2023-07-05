import { useContext } from "react";
import Button from "../../common/Button/Button";
import { authCtx } from "../../../features/auth-ctx";

const HeroBtnBox = () => {
  const authMgr = useContext(authCtx);

  return (
    <div
      className={`w-full px-5 md:px-10 gap-3 h-36 flex items-center justify-center  flex-col`}
    >
      <Button
        className={`h-[5vh] rounded-lg bg-green-400 cursor-pointer  hover:bg-rose-500  text-lg w-2/3  px-[0.25em] outline-green-500`}
        text={"Sign Up"}
        onClick={() => authMgr.onShowForm("register")}
      />
      <Button
        className={`h-[5vh] rounded-lg bg-green-400 cursor-pointer  hover:bg-rose-500  text-lg w-2/3  px-[0.25em] outline-green-500`}
        text={"Login"}
        onClick={() => authMgr.onShowForm("login")}
      />
    </div>
  );
};
export default HeroBtnBox;
