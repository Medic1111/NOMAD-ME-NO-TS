import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Nav from "./components/NavComps/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Posts from "./pages/Posts/Posts";
import SpecPost from "./pages/SpecPost/SpecPost";
import User from "./pages/User/User";
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Err from "./components/common/Err/ErrHandler";
import Spinner from "./components/common/Spinner/Spinner";
import { uiCtx } from "./features/ui-ctx";
import { userCtx } from "./features/user-ctx";
import { authCtx } from "./features/auth-ctx";
import { useAxios } from "./hooks/useAxios";
import PassReset from "./pages/PassReset/PassReset";

function App() {
  const uiMgr = useContext(uiCtx);
  const userMgr = useContext(userCtx);
  const authMgr = useContext(authCtx);
  const { callApi } = useAxios();

  const validateCookie = async () => {
    let success = await callApi(
      "GET",
      "/api/v1/auth/validate",
      null,
      userMgr.setCurrentUser
    );
    success ? authMgr.setIsAuth(true) : authMgr.logoutHandler();
  };

  useEffect(() => {
    validateCookie();
  }, []);

  return (
    <div className="App">
      {uiMgr.isLoading && <Spinner />}
      {uiMgr.isError && <Err />}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <SpecPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/password_reset" element={<PassReset />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
