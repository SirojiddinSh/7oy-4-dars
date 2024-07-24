import React, { useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProductOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Input, Avatar } from "antd";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import SignOutModal from "../../../components/SignOutModal";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const Dashboard = () => {
    const [data, loading] = useFetch("/auth/profile");
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cartProducts);
    const length = cartProducts.length;
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    const onSearch = (value) => {
        dispatch({ type: "SEARCH", payload: value });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSignOut = () => {
        setIsModalOpen(false);
        dispatch({ type: "SIGN_OUT" });
    };

    const openProfile = () => {
        navigate("/dashboard/profile");
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <ProductOutlined />,
                            label: (
                                <NavLink end to={""}>
                                    Products
                                </NavLink>
                            ),
                        },
                        {
                            key: "2",
                            icon: <ShoppingCartOutlined />,
                            label: (
                                <NavLink to={"cart"}>
                                    Cart <span>{length}</span>
                                </NavLink>
                            ),
                        },
                    ]}
                />
                <div
                    style={{
                        height: "90%",
                        padding: "10px",
                        paddingBottom: "20px",
                        flex: 1,
                        display: "flex",
                        alignItems: "end",
                    }}
                >
                    <Button
                        onClick={handleOpenModal}
                        danger
                        type="primary"
                        style={{ width: "100%" }}
                    >
                        Sign Out
                    </Button>
                    <SignOutModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onSignOut={handleSignOut}
                    />
                </div>
            </Sider>
            <Layout>
                <Header
                    style={{
                        paddingLeft: "0",
                        position: "relative",
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                            color: "white",
                        }}
                    />
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <Avatar
                                onClick={openProfile}
                                style={{
                                    marginLeft: "10px",
                                    marginBottom: "5px",
                                    backgroundColor: "#87d068",
                                    cursor: "pointer",
                                }}
                                size={50}
                            >
                                {data?.first_name.at(0)}
                            </Avatar>
                            <span
                                style={{
                                    color: "white",
                                    marginLeft: "10px",
                                    fontSize: "20px",
                                }}
                            >
                                {data?.first_name}
                            </span>
                        </>
                    )}

                    <Search
                        style={{
                            position: "absolute",
                            width: "600px",
                            marginLeft: "390px",
                            marginTop: "12px",
                        }}
                        placeholder="Search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: "lightgray",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
