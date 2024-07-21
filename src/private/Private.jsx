import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
    const auth = useSelector((state) => state.auth);

    if (!auth) {
        return <Navigate to="/auth" />;
    }

    if (auth.token) {
        return <Navigate to="/dashboard" />;
    }

    return <Navigate to="/auth" />;
};

export default Private;
