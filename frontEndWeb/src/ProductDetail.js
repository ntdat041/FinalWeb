import React, { useState, useEffect } from 'react';
import "./ProductDetail.css";
import axios from "./axios";
import { Link, useHistory, useParams} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import LoadData from "./LoadData";
import CurrencyFormat from "react-currency-format";

function ProductDetails(){
    let history = useHistory();
    const [{ basket,user }, dispatch] = useStateValue();
    const [product, setProduct] = useState(null);
    const [shop, setShop] = useState(null);
    let { product_id } = useParams();
    const backEndServe = 'http://localhost:8000/';
    useEffect(() => {
        async function fetchData(){
            const result = await axios({
				method: 'get',
				url: `http://localhost:8000/products/${product_id}`
			});
            setProduct(result.data);
            const shopResult = await axios({
				method: 'get',
				url: `http://localhost:8000/shopProduct/${product_id}`
            });
            setShop(shopResult.data);
        }
        fetchData();
    },[]);

    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
          type: "ADD_TO_BASKET",
          item: {
            id: product.product_id,
            name: product.product_name,
            image: backEndServe+product.product_image,
            price: product.product_price,
            rating: product.product_rating
          },
        });
        if(user){
            async function fetchData(){
              const result = await axios({
                method: 'post',
                url: `http://localhost:8000/increaseProductInCart/${user.user_id}/${product_id}`
              });
            }
            fetchData();
        }
    };
    
    const byNow = () => {
        addToBasket();
        history.push("/payment");
    }
    if(product && shop)
    return (
        <div className="ProductDetail">
            <LoadData />
            <div className="right_content">
                <div className="img_area">
                    <img src={backEndServe+product.product_image} className="product_img"/>
                </div>
                
                <div className="discription_area">
                    <h2>{product.product_name}</h2>
                    <div className="shop_description">{product.product_description}</div>
                </div>
                <Link to={`/shopProducts/${shop.shop_id}`}>
                    <div className="shop_area">
                        <div>
                            <img src={backEndServe+shop.avatar} className="shop_img"/>
                        </div>    
                        <h3>SHOP {shop.name}</h3>
                    </div>
                </Link>
                
            </div>
            <div className="left_content">
                <h2>{product.product_name}</h2>
                <p>Number of people buy <strong>{product.nosale}</strong></p>
                <div className="product_rating">
                    {Array(product.product_rating)
                    .fill()
                    .map((_, i) => (
                    <p>🌟</p>
                    ))}
                </div>
                <h3>
                <CurrencyFormat
                                renderText={(value) => (
                                    <p>Price: <strong class="price">{value}</strong></p>
                                )}
                                decimalScale={2}
                                value={product.product_price}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={" đ"}
                            />
                </h3>
                <h3>
                <CurrencyFormat
                                renderText={(value) => (
                                    <p>Quantity in stock: <strong class="quantity">{value}</strong></p>
                                )}
                                decimalScale={2}
                                value={product.quantityInStock}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={""}/>
                </h3>
                <div className="button_group">
                    <button onClick={addToBasket}>ADD TO CART</button>
                    <button onClick={byNow}>BUY NOW</button>
                </div>
            </div>
        </div>
    );
    else return (
        <div>
            <LoadData />
        </div>
    )
} 

export default ProductDetails;