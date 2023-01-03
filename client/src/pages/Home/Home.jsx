import Hero from "../../components/HeroComps/Hero/Hero";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authCtx } from "../../features/auth-ctx";

const Home = () => {
  const authMgr = useContext(authCtx);
  return authMgr.isAuth ? <Navigate to={"/posts"} replace /> : <Hero />;
};

export default Home;
