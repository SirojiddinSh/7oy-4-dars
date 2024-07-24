import React from "react";
import { Button, Checkbox, Form, Input, Divider } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../../../api";
import TelegramLoginButton from "telegram-login-button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const navigate = useNavigate();
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch({ type: "LOADING" });
            const { data } = await axios.post("/auth", values);
            dispatch({
                type: "REGISTER",
                token: data.payload.token,
                user: data.payload.user,
            });
            if (data?.payload?.token) {
                toast.success("Registered successfully");
                navigate("/dashboard");
            }
        } catch (error) {
            dispatch({ type: "ERROR" });
            toast.error(
                error.response?.data?.msg ||
                    "Something went wrong. Please try again."
            );
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        toast.error("Registration failed! Please try again.");
    };

    return (
        <Form
            layout="vertical"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "40px",
                    marginBottom: "10px",
                    color: "white",
                }}
            >
                Register
            </h1>

            <Form.Item
                style={{ marginBottom: "5px", color: "white" }}
                label="Firstname"
                name="first_name"
                rules={[
                    { required: true, message: "Please input your firstname!" },
                ]}
            >
                <Input style={{ background: "transparent", color: "white" }} />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: "5px" }}
                label="Username"
                name="username"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input style={{ background: "transparent", color: "white" }} />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: "5px" }}
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password
                    style={{ background: "transparent", color: "white" }}
                />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: "10px" }}
                name="remember"
                valuePropName="checked"
                wrapperCol={{ span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                style={{ width: "100%", marginBottom: "10px" }}
                wrapperCol={{ span: 24 }}
            >
                <Button
                    disabled={loading}
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                >
                    Register
                </Button>

                <Divider
                    style={{
                        fontSize: "17px",
                        marginBottom: "10px",
                        fontWeight: "600",
                        color: "white",
                    }}
                >
                    Or
                </Divider>

                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "15px",
                    }}
                >
                    <GoogleLogin
                        disabled={loading}
                        onSuccess={async (credentialResponse) => {
                            try {
                                const decode =
                                    credentialResponse.credential.split(".")[1];
                                const userData = JSON.parse(atob(decode));
                                const user = {
                                    username: userData.email,
                                    password: userData.sub,
                                    first_name: userData.name,
                                };
                                const response = await axios.post(
                                    "/auth",
                                    user
                                );
                                console.log(response.data);
                                navigate("/auth");
                            } catch (error) {
                                console.error("Google login failed:", error);
                                toast.error(
                                    "Google login failed! Please try again."
                                );
                            }
                        }}
                        onError={() => {
                            console.log("Google login failed");
                        }}
                        useOneTap
                    />

                    <TelegramLoginButton
                        telegramAuthUrl="https://7oy-4-dars.vercel.app"
                        disabled={loading}
                        botName="Frontend_4_dars_bot"
                        dataOnauth={async (user) => {
                            console.log(user.config);
                            const telUser = user.config;
                            try {
                                if (telUser?.username) {
                                    const user2 = {
                                        username: telUser.username,
                                        password: telUser.id,
                                        first_name: telUser.first_name,
                                    };
                                    const response = await axios.post(
                                        "/auth",
                                        user2
                                    );
                                    console.log(response.data);
                                    navigate("/dashboard");
                                } else {
                                    throw new Error(
                                        "Telegram login credential is undefined"
                                    );
                                }
                            } catch (error) {
                                console.error("Telegram login failed:", error);
                                toast.error(
                                    "Telegram login failed! Please try again."
                                );
                            }
                        }}
                    />
                </div>
            </Form.Item>

            <p style={{ color: "white" }}>
                Already have an account?{" "}
                <NavLink to="/auth" style={{ color: "blue" }}>
                    Login
                </NavLink>
            </p>
        </Form>
    );
};

export default Register;
