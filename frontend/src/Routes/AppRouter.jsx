import { memo, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DASHBOARD } from "./Routes";

const Dashboard = memo(lazy(() => import("../Pages/Dashboard/Dashboard")));

const router = createBrowserRouter([
    {
        path: DASHBOARD,
        element: <Dashboard />
    }
]);

const AppRouter = () => {
    return <RouterProvider router={router} />
};

export default memo(AppRouter);