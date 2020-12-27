import React, { useState, useEffect } from 'react';
import axios from "./axios";
import CurrencyFormat from "react-currency-format";
import "./ProductInOrderDetail.css";

function ProductInOrderDeTail({ product_id, product_image,product_name,product_price,quantity,sum,status,product_rating,orderDetail_id}) {
    const backEndServe = 'http://localhost:8000/';
    const [rating,setRating] = useState(4);
    function increaseRating(){
        if(rating<5)
            return setRating(rating+1);
    }
    function decreaseRating(){
        if(rating>1)
            return setRating(rating-1);
    }

    function updateRaing(){
        async function fetchData(){
            const ordersResult = await axios({
				method: 'post',
				url: `http://localhost:8000/rating/${product_id}/${orderDetail_id}`,
				data: {
                    rating: rating,
                    quantity: quantity 
                }
            });
            return;
        }
        fetchData();
        return window.location.reload();
    }

    return(
        <tr className="ProductInOrderDeTail">
            <th scope="row"><img src={backEndServe+product_image} className="product_img"/></th>
            <td class="tm-product-name">{product_name}</td>
            <td class="price">
            <CurrencyFormat
                    renderText={(value) => (
                    <strong>{value}</strong>
                    )}
                    decimalScale={2}
                    value={product_price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
            /></td>
            <td class="quantity">{quantity}</td>
            <td class="price"><CurrencyFormat
                    renderText={(value) => (
                    <strong>{value}</strong>
                    )}
                    decimalScale={2}
                    value={sum}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
            /></td>
            <td class="status">{status}</td>
            <td class="rating">{product_rating}</td>
            <td class="my-rate">
                <div hidden={status==='processing'}> 
                    <span>
                        <div>
                        {Array(rating)
                        .fill()
                        .map((_, i) => (
                        <span>🌟</span>
                        ))}
                        </div>
                    <button onClick={decreaseRating}>-</button>
                    <button onClick={increaseRating}>+</button>
                    </span>
                </div>
            </td>
            <td class="submit"> 
                <button onClick={updateRaing} hidden={status==='processing'}>SUBMIT</button>
            </td>
        </tr>
    )
}

export default ProductInOrderDeTail;