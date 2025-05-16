import { memo, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CREATE_TICKET, DASHBOARD, LOGIN, LOGOUT, NOT_FOUND, TICKETS, USERS } from "./Routes";

const AuthenticatedRoute = memo(lazy(() => import("../Middlewares/AuthenticatedRoute")));

const DefaultLayout = memo(lazy(() => import("../Layouts/DefaultLayout")));

const Dashboard = memo(lazy(() => import("../Pages/Dashboard/Dashboard")));
const Tickets = memo(lazy(() => import("../Pages/Tickets/Tickets")));
const CreateTicket = memo(lazy(() => import("../Pages/CreateTicket/CreateTicket")));
const Users = memo(lazy(() => import("../Pages/Users/Users")));
const Login = memo(lazy(() => import("../Pages/Login/Login")));
const Logout = memo(lazy(() => import("../Pages/Logout/Logout")));
const NotFound404 = memo(lazy(() => import("../Pages/NotFound404/NotFound404")));

const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            {
                element: <AuthenticatedRoute />,
                children: [
                    {
                        path: DASHBOARD,
                        element: <Dashboard />
                    },
                    {
                        path: TICKETS,
                        element: <Tickets />
                    },
                    {
                        path: CREATE_TICKET,
                        element: <CreateTicket />
                    },
                    {
                        path: USERS,
                        element: <Users />
                    },
                ]
            },
            {
                path: LOGIN,
                element: <Login />
            },
            {
                path: LOGOUT,
                element: <Logout />
            },
            {
                path: NOT_FOUND,
                element: <NotFound404 />
            }
        ]
    }
]);

const AppRouter = () => {
    return <RouterProvider router={router} />
};

export default memo(AppRouter);