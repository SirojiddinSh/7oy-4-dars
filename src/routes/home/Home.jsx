import React from "react";

const Home = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
            }}
        >
            <button
                onClick={() => (window.location.href = "/auth/register")}
                className="btn"
            >
                Register
            </button>
        </div>
    );
};

export default Home;
