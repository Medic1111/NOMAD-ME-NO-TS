import Hero from "../../components/HeroComps/Hero/Hero";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authCtx } from "../../features/auth-ctx";

const Home = () => {
  const authMgr = useContext(authCtx);
  return authMgr.isAuth ? <Navigate to={"/posts"} replace /> : <Hero />;
};

export default Home;
