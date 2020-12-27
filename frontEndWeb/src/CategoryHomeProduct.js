import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import Product from "./Product";
import axios from "axios";

import "./CategoryHomeProduct.css";

function CategoryHomeProduct(props) {
    const [categoryHomeProducts,setCategoryHomeProducts] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const products = await axios({
                method: 'get',
                url: 'http://localhost:8000/categoryHome/:categoryId'
            });
            setCategoryHomeProducts(products.data);
        }
        fetchData();
    });
    return(
        <div className={props.name}>
            <Link to={`category/:${props.id}`}>
                <div>
                    <h2>{props.name}</h2>
                </div>
            </Link>
            <div className="home__row">
                <Product
                    id="4903850"
                    name="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                    price={199.99}
                    rating={3}
                    image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                />
                <Product
                    id="23445930"
                    name="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                    price={98.99}
                    rating={5}
                    image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                />
                <Product
                    id="3254354345"
                    name="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                    price={598.99}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                />
			</div>
            <div className="home__row">
                <Product
                    id="4903850"
                    name="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                    price={199.99}
                    rating={3}
                    image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
                />
                <Product
                    id="23445930"
                    name="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
                    price={98.99}
                    rating={5}
                    image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
                />
                <Product
                    id="3254354345"
                    name="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
                    price={598.99}
                    rating={4}
                    image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
                />
			</div>
        </div>
    )
}
export default CategoryHomeProduct;