import { useContext } from "react";
import { Link } from "react-router-dom";
import { authCtx } from "../../../features/auth-ctx";
import { userCtx } from "../../../features/user-ctx";

const Nav = () => {
  const authMgr = useContext(authCtx);
  const userMgr = useContext(userCtx);

  return (
    <nav
      className={` bg-green-500 h-[7.5vh] w-full flex items-center justify-center list-none gap-5`}
    >
      {authMgr.isAuth ? (
        <>
          <Link
            className={"text-slate-50 hover:text-slate-800 cursor-pointer"}
            to="/posts"
          >
            Posts
          </Link>
          <Link
            className={"text-slate-50 hover:text-slate-800 cursor-pointer"}
            to={`/users/${userMgr.currentUser.user._id}`}
          >
            Profile
          </Link>
          <li
            className={"text-slate-50 hover:text-slate-800 cursor-pointer"}
            onClick={() => authMgr.logoutHandler()}
          >
            Logout
          </li>
        </>
      ) : (
        <>
          <li
            onClick={() => authMgr.onShowForm("register")}
            className={"text-slate-50 hover:text-slate-800 cursor-pointer"}
          >
            Sign Up
          </li>
          <li
            onClick={() => authMgr.onShowForm("login")}
            className={"text-slate-50 hover:text-slate-800 cursor-pointer"}
          >
            Login
          </li>
        </>
      )}
    </nav>
  );
};

export default Nav;
