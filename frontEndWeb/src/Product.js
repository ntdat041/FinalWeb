import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import CurrencyFormat from "react-currency-format";

function Product({ id, name, image, price, rating }) {
  const [{ basket,user }, dispatch] = useStateValue();
  
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
        console.log(result.data);
      }
      fetchData();
    }
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{name}</p>
        <p className="product__price">
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
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
      <Link to={`/products/${id}`}>
        <p className = "SeeDetail" > 
          See the Detail
        </p>
      </Link>
    </div>
  );
}

export default Product;
