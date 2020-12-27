import React from 'react';
import './CheckoutProduct.css'
import { useStateValue } from "./StateProvider";
import axios from "axios";
import CurrencyFormat from "react-currency-format";

function CheckoutProduct({ id, image, name, price, rating, quantity ,hideButton }) {
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
    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
          type: "ADD_TO_BASKET",
          item: {
            id: id,
            name: name,
            image: image,
            price: price,
            rating: rating,
          },
        });
        if(user){
            async function fetchData(){
              const result = await axios({
                method: 'post',
                url: `http://localhost:8000/increaseProductInCart/${user.user_id}/${id}`
              });
            }
            fetchData();
        }
    };
    const decreaseToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
          type: "DECREASE_TO_BASKET",
          item: {
            id: id,
            name: name,
            image: image,
            price: price,
            rating: rating,
          },
        });
        if(user){
            async function fetchData(){
              const result = await axios({
                method: 'post',
                url: `http://localhost:8000/decreaseProductInCart/${user.user_id}/${id}`
              });
            }
            fetchData();
        }
    };

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} />
            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{name}</p>
                <p className="checkoutProduct__price">
                <CurrencyFormat
                                renderText={(value) => (
                                    <p><strong>{value}</strong></p>
                                )}
                                decimalScale={2}
                                value={price}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" đ"}
                            />
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>🌟</p>
                    ))}
                </div>
                <div>
                    <button onClick={decreaseToBasket}>-</button>
                    <span>{quantity}</span>
                    <button onClick={addToBasket}>+</button>
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct
