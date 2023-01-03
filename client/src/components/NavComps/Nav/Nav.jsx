import classes from "./Nav.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authCtx } from "../../../features/auth-ctx";
import { userCtx } from "../../../features/user-ctx";

const Nav = () => {
  const authMgr = useContext(authCtx);
  const userMgr = useContext(userCtx);

  return (
    <nav className={`${classes.nav} flex_center`}>
      {authMgr.isAuth ? (
        <>
          <Link className={`${classes.link} link_standard`} to="/posts">
            Posts
          </Link>
          <Link
            className={`${classes.link} link_standard`}
            to={`/users/${userMgr.currentUser.user._id}`}
          >
            Profile
          </Link>
          <li
            className={`${classes.link} link_standard`}
            onClick={() => authMgr.logoutHandler()}
          >
            Logout
          </li>
        </>
      ) : (
        <>
          <li
            onClick={() => authMgr.onShowForm("register")}
            className={`${classes.link} link_standard`}
          >
            Sign Up
          </li>
          <li
            onClick={() => authMgr.onShowForm("login")}
            className={`${classes.link} link_standard`}
          >
            Login
          </li>
        </>
      )}
    </nav>
  );
};

export default Nav;
