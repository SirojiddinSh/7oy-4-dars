import { Button, Checkbox, Form, Input, Divider } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../../../api";
import TelegramLoginButton from "telegram-login-button";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state);
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
            navigate("/auth");
        } catch (error) {
            dispatch({ type: "ERROR" });
            toast.error(
                error.response.data.msg ||
                    "Something went wrong. Please try again."
            );
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        toast.error("Login failed! Please try again.");
    };

    return (
        <Form
            layout="vertical"
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 24,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "40px",
                    marginBottom: "10px",
                }}
            >
                Register
            </h1>
            <Form.Item
                style={{ marginBottom: "5px", color: "white" }}
                label="Firstname"
                name="first_name"
                rules={[
                    {
                        required: true,
                        message: "Please input your firstname!",
                    },
                ]}
            >
                <Input style={{ background: "transparent", color: "white" }} />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: "5px" }}
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input style={{ background: "transparent", color: "white" }} />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: "5px" }}
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
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
                wrapperCol={{
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                style={{ width: "100%", marginBottom: "10px" }}
                wrapperCol={{
                    span: 24,
                }}
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
                            const decode =
                                credentialResponse.credential.split(".")[1];
                            const userData = JSON.parse(atob(decode));
                            const user = {
                                username: userData.email,
                                password: userData.sub,
                                first_name: userData.name,
                            };
                            const response = await axios.post("/auth", user);
                            console.log(response.data);
                            navigate("/auth");
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
                        useOneTap
                    />
                    <TelegramLoginButton
                        disabled={loading}
                        botName="Frontend_4_dars_bot"
                        dataOnauth={(user) => {
                            console.log(user);
                            navigate("/auth");
                        }}
                    />
                </div>
            </Form.Item>
            <p>
                Already have an account?{" "}
                <NavLink to="/auth" style={{ color: "blue" }}>
                    Login
                </NavLink>
            </p>
        </Form>
    );
};

export default Register;
