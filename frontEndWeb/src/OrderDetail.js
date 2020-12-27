import React, { useState, useEffect } from 'react';
import { useStateValue } from "./StateProvider";
import { useCookies } from 'react-cookie';
import { Link, useHistory, useParams} from "react-router-dom";
import axios from "./axios";
import ProductInOrderDetail from "./ProductInOrderDetail";
import LoadData from "./LoadData";
import "./OrderDetail.css";

function OrderDetail() {
    let { user_id } = useParams();
    const [orders, setOrders] = useState(null);
    const [{ user }, dispatch] = useStateValue();
    const [cookies, setCookie] = useCookies(['token']);

    useEffect(() => {
        async function fetchData(){
            const ordersResult = await axios({
				method: 'get',
				url: `http://localhost:8000/orderDetailProduct/${user_id}`,
				headers : {
					token: cookies.token
				}
            });
            setOrders(ordersResult.data.userOrders);
            return;
        }
        // generate the special stripe secret which allows us to charge a customer
        fetchData();
        return;
    }, [])

    if (user && orders)
    return(
        <div className="orderDetail">
            <LoadData/>
            <table class="table tm-table-small tm-product-table">
                <thead>
                    <tr>
                        <th scope="col">&nbsp;</th>
                        <th scope="col">PRODUCT NAME</th>
                        <th scope="col">PRODUCT PRICE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">SUM</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">STARS</th>
                        <th scope="col">YOURSTARS</th>
                        <th scope="col">&nbsp;</th>
                    </tr>
                </thead>
                <tbody> 
                    {
                        orders.map(product => <ProductInOrderDetail
                            product_id = {product.product_id}
                            product_image = {product.product_image}
                            product_name = {product.product_name}
                            product_price = {product.product_price}
                            quantity = {product.quantity}
                            sum = {product.quantity*product.product_price}
                            status = {product.status}
                            product_rating = {product.product_rating}
                            orderDetail_id = {product.orderDetail_id}
                        /> )
                    }
                </tbody>
            </table>
        </div>
    );
    else {
        return (
            <div>
                <LoadData/>
            </div>
        )
    }
}
export default OrderDetail;
