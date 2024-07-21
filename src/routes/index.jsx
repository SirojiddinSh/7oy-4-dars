import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loading } from "../utils";
import Products from "./auth/dashboard/products/Products";
import Users from "./auth/dashboard/users/Users";

const Home = lazy(() => import("./home/Home"));
const Auth = lazy(() => import("./auth/Auth"));
// const Dashboard = lazy(() => import("./auth/dashboard/Dashboard"));
const Private = lazy(() => import("../private/Private"));

const Login = lazy(() => import("./auth/login/Login"));
const Register = lazy(() => import("./auth/register/Register"));

const RouteController = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: (
                <Suspense fallback={<Loading />}>
                    <Home />
                </Suspense>
            ),
        },
        {
            path: "/auth",
            element: (
                <Suspense fallback={<Loading />}>
                    <Auth />
                </Suspense>
            ),
            children: [
                {
                    path: "",
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Login />
                        </Suspense>
                    ),
                },
                {
                    path: "register",
                    element: (
                        <Suspense fallback={<Loading />}>
                            <Register />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "dashboard",
            element: (
                <Suspense fallback={<Loading />}>
                    <Private />
                </Suspense>
            ),
            children: [
                {
                    path: "",
                    element: (
                        <Suspense>
                            <Products />
                        </Suspense>
                    ),
                },
                {
                    path: "users",
                    element: (
                        <Suspense>
                            <Users />
                        </Suspense>
                    ),
                },
            ],
        },
    ]);

    return routes;
};

export default RouteController;
