import Axios from 'axios';
import React, { useEffect, useState } from 'react';


function DataFetching() {
    const [products,setProducts] =useState([]);
    useEffect(() =>{
        Axios.get('http://localhost:8001/shop/3/topsales')
        .then( response =>{
            console.log(response);
            setProducts(response.data)
        })
        .catch(error =>{
            console.log('Failed to Get response',error);
        })
    },[])
    return (
        <div>
            <ul>
            {    products && products.map(product =>
                    (
                        <li key ={product.product_id}> {product.product_name},
                        <li> {product.quantityInStock}</li>
                         </li>
                    )
            )
            }
            </ul>
        </div>
    );
}

export default DataFetching
