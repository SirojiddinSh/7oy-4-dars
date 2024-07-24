import React from "react";
import { Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const userData = useSelector((state) => state.user);
    const user = JSON.parse(userData);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
            }}
        >
            <Card
                style={{ width: 300 }}
                cover={<img alt="profile" src={user.photo_url} />}
            >
                <Card.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={user.first_name}
                    description={`Username: ${user.username}`}
                />
                <div style={{ marginTop: "20px" }}>
                    <p>
                        <b>Role:</b> {user.role}
                    </p>
                    <p>
                        <b>Registered At:</b>{" "}
                        {new Date(user.registeredAt).toLocaleString()}
                    </p>
                    <p>
                        <b>Created At:</b>{" "}
                        {new Date(user.createdAt).toLocaleString()}
                    </p>
                    <p>
                        <b>Updated At:</b>{" "}
                        {new Date(user.updatedAt).toLocaleString()}
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default UserProfile;
