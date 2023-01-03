import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./features/auth-ctx";
import UiProvider from "./features/ui-ctx";
import UploadProvider from "./features/upload-ctx";
import UserProvider from "./features/user-ctx";
import PostsProvider from "./features/posts-ctx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UiProvider>
        <UploadProvider>
          <UserProvider>
            <AuthProvider>
              <PostsProvider>
                <App />
              </PostsProvider>
            </AuthProvider>
          </UserProvider>
        </UploadProvider>
      </UiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
