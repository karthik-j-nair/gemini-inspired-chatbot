import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/components/Protected";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1 className="text-3xl font-bold text-center mt-20">Welcome to the Landing Page</h1>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/home",
        element: <Protected><Dashboard /></Protected>
    }
])
