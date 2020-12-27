import React, { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useStateValue } from "./StateProvider";
import axios from "./axios";

function LoadData(){
    const [{ basket, user,shop }, dispatch] = useStateValue();
    const [cookies, setCookie] = useCookies(['token']);
    const backEndServe = 'http://localhost:8000/';
    useEffect(()=>{
        async function fetchData(){
            if(user == null){
                const userData = await axios({
					method: 'get',
					url: 'http://localhost:8000/profile',
					headers : {
						token: cookies.token
					}
                });
                if (userData.data.message === 'Success')
                {
                    dispatch({
						type: "EMPTY_BASKET",
						user: {
								...userData.data.user
						},
                    });
                   
                    const productsData = await axios({
                        method: 'get',
                        url: `http://localhost:8000/cart/${userData.data.user.user_id}`,
                        headers : {
                            token: cookies.token
                        }
                    });
                    productsData.data.userCart.map(product => 
                        dispatch({
                            type: "ADD_QUANTITY_BASKET",
                            item: {
                                id: product.product_id,
                                name: product.product_name,
                                image: backEndServe+product.product_image,
                                price: product.product_price,
                                quantity: product.quantity,
                                rating: 5,
                                }
                        })
                    )
                    dispatch({
						type: "SET_USER",
						user: {
								...userData.data.user
						},
                    }); 
                    return ;
                } 
            }
            if(shop == null){
				const shopData = await axios({
					method: 'get',
					url: 'http://localhost:8000/shopProfile',
					headers : {
						token: cookies.token
					}
				});
                if (shopData.data.message === 'Success')
                {
                    dispatch({
						type: "SET_SHOP",
						shop: {
								...shopData.data.shop
						},
					});
                    return ;
                }					
			}
			return ;
        }
        fetchData();
    },[])
    return(
        <></>
    )
}

export default LoadData;