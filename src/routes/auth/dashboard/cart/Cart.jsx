import "./Cart.css";
import { Table, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector((state) => state.cartProducts);
    const length = cartProducts ? cartProducts?.length : 0;

    const columns = [
        {
            key: "sort",
            align: "center",
            width: 80,
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (text, record) => (
                <img src={record.image} alt="" width={100} />
            ),
        },
        {
            title: "Actions",
            render: (record) => (
                <Button
                    type="primary"
                    danger
                    onClick={() =>
                        dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: record.id,
                        })
                    }
                    className="remove-to-cart"
                >
                    Remove
                </Button>
            ),
        },
        {
            title:
                length > 0 ? (
                    <Button
                        danger
                        type="primary"
                        onClick={() => dispatch({ type: "CLEAR_CART" })}
                    >
                        Clear cart
                    </Button>
                ) : null,
            key: "clear-cart",
        },
    ];

    return (
        <div>
            <Table rowKey="id" columns={columns} dataSource={cartProducts} />
        </div>
    );
};

export default Cart;
