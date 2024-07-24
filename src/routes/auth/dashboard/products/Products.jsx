import { Table, Button } from "antd";
import { useDispatch } from "react-redux";
import products from "../../../../api/products";

let Products = () => {
    let dispatch = useDispatch();

    let addToCart = (product) => {
        dispatch({ type: "ADD_TO_CART", payload: product });
    };

    let columns = [
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
            render: (product) => (
                <img src={product} alt="" width={100} height={100} />
            ),
        },
        {
            title: "Add to cart",
            render: (product) => (
                <Button type="primary" onClick={() => addToCart(product)}>
                    Add
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Table rowKey="id" columns={columns} dataSource={products} />
        </div>
    );
};

export default Products;
