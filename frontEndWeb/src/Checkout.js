import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import LoadData from "./LoadData";

function Checkout() {
  const [{ basket, user,shop }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <LoadData/>
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h3>Hello, {user ? user.name : null}{shop ? shop.name : null}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>

          {basket.map(item => (
            <CheckoutProduct
              
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              rating={item.rating}
              quantity={item.quantity}
            />
          ))}

        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
