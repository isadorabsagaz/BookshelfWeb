import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n.ts"
import "./css/index.css";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import UserPage from "./pages/UserPage";
import ProfilePage from "./pages/ProfilePage.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
  },

  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <NotFoundPage />,
  },

  {
    path: `/user`,
    element: <UserPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: `/user/profile`,
    element: <ProfilePage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer position="bottom-right" autoClose={2500} />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
