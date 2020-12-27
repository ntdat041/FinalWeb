import React from 'react';
import './ProductInPayment.css'
import { useStateValue } from "./StateProvider";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
function ProductInPayment({ id, image, name, price, rating, quantity ,hideButton }) {
    const [{ basket,user }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
        if(user){
            async function fetchData(){
              const result = await axios({
                method: 'post',
                url: `http://localhost:8000/deleteProductInCart/${user.user_id}/${id}`
              });
            }
            fetchData();
        }
    };

    return (
        <div className='ProductInPayment'>
            <img className='ProductInPayment__image' src={image} />
            <div className='ProductInPayment__info'>
                <p className='ProductInPayment__title'>{name}</p>
                <p className="ProductInPayment__price">
                <CurrencyFormat
                    renderText={(value) => (
                    <strong>{value}</strong>
                    )}
                    decimalScale={2}
                    value={price}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" đ"}
                />
                </p>
                <div className="ProductInPayment__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>
                <div>
                    <span><h2>Quantity: {quantity}</h2></span>
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
}

export default ProductInPayment
