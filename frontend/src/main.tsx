import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import './css/index.css'
import App from './App'
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />
    },

    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <NotFoundPage />
    },

    {
        path: "/signup",
        element: <SignupPage />,
        errorElement: <NotFoundPage />
    }

]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)