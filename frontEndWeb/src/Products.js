import React, { useState,useEffect } from 'react';
import './Products.css';
import { Link, useHistory,useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useForm } from 'react-hook-form';
import axios from "axios";
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import SettingsApplicationsSharpIcon from '@material-ui/icons/SettingsApplicationsSharp';
import StorefrontSharpIcon from '@material-ui/icons/StorefrontSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import HistorySharpIcon from '@material-ui/icons/HistorySharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import CameraAltSharpIcon from '@material-ui/icons/CameraAltSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';

import ProductInShop from "./ProductInShop";
import NavShop from "./NavShop";
import Patigation from "./Patigation";
import LoadData from "./LoadData";

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};


function CreateProduct() {
    const [{ user,queryString,shop }, dispatch] = useStateValue();
    let { shop_id } = useParams();
    const [page,setPage] = useState(1);
    const [shopProducts, setShopProducts] = useState(null);
    const [topProducts, setTopProducts] = useState(null);
    const backEndServe = 'http://localhost:8000/';
	useEffect(() => {
            async function fetchData(){
                const result = await axios({
                    method: 'get',
                    url: `http://localhost:8000/shop/${shop_id}/product?page=${page}&name=${queryString}`
                });
                setShopProducts(result.data);
                const topProductsData = await axios({
                    method: 'get',
                    url: `http://localhost:8000/shop/${shop_id}/topsales`
                });
                setTopProducts(topProductsData.data);
            };
            fetchData();   
    },[page,queryString]);
    function setCurrentPage(newPage){
		return function(){
			setPage(newPage);
		}	 
	}
    if (shopProducts && shop && topProducts)
    return (
        <div className="ShopProducts">
            <LoadData/>
            <NavShop />
            <div class="container mt-5">
                <div class="row tm-content-row">
                    <div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
                        <div class="tm-bg-primary-dark tm-block tm-block-products">
                            <div class="tm-product-table-container">
                                <table class="table table-hover tm-table-small tm-product-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">&nbsp;</th>
                                            <th scope="col" >PRODUCT NAME</th>
                                            <th scope="col" >PRODUCT PRICE</th>
                                            <th scope="col" >UNIT SOLD</th>
                                            <th scope="col" >IN STOCK</th>
                                            <th scope="col" >EXPIRE DATE</th>
                                            <th scope="col">&nbsp;</th>
                                            <th scope="col">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>  
                                        {shopProducts.map( shopProduct => 
                                        <ProductInShop 
                                            product_id = {shopProduct.product_id}
                                            product_name = {shopProduct.product_name}
                                            product_image = {shopProduct.product_image}
                                            nosale = {shopProduct.nosale}
                                            product_price = {shopProduct.product_price}                
                                            quantityInStock = {shopProduct.quantityInStock}
                                            createdAt = {shopProduct.createdAt}
                                        />)}   
                                    </tbody>
                                </table>
                            </div>
                            <Patigation setCurrentPage={setCurrentPage}/>
                            <Link to ={`/createProduct/${shop.shop_id}`}
                               
                                class="btn btn-primary btn-block text-uppercase mb-3">
                                Add new product
                            </Link>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
                        <div class="tm-bg-primary-dark tm-block tm-block-product-categories">
                            <h2 class="tm-block-title">Top Sale</h2>
                            <div class="tm-product-table-container">
                                <table class="table tm-table-small tm-product-table">
                                    <tbody>
                                        <tr>
                                            <th scope="col">&nbsp;</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">&nbsp;</th>
                                        </tr>
                                        {
                                            topProducts.map(topProduct => 
                                            <tr>
                                                <td scope="col"><img src={backEndServe + topProduct.product_image} alt="image" className="productInShop_img"/></td>
                                                <td scope="col">{topProduct.product_name}</td>
                                                <td scope="col">{topProduct.nosale}</td>
                                                <td scope="col">
                                                    <Link to={`/editProduct/${topProduct.product_id}`}>
                                                        <EditSharpIcon />
                                                    </Link>
                                                </td>
                                            </tr>
                                            )
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
export default CreateProduct