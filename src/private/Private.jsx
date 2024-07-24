import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
    const token = useSelector((state) => state.token);

    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to="/auth" />;
    }
};

export default Private;
