import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Auth = () => {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="shadow-cm">
                <GoogleOAuthProvider
                    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                >
                    <Outlet />
                </GoogleOAuthProvider>
            </div>
        </div>
    );
};

export default Auth;
