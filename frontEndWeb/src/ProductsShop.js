import React, { useState, useEffect } from 'react';
import { useStateValue } from "./StateProvider";
import { useParams,useHistory} from "react-router-dom";
import Product from "./Product";
import Category from "./Category";
import Patigation from "./Patigation";
import LoadData from "./LoadData";
import axios from "./axios";

import "./ProductsShop.css";


function ProductsShop() {
	const [{ user,queryString }, dispatch] = useStateValue();
    const [products, setProducts] = useState([]);
	const [shop, setShop] = useState({});
	const [page,setPage] = useState(1);
	let { shop_id } = useParams();
	const backEndServe = 'http://localhost:8000/';

	useEffect(() => {
		async function fetchData(){
			const result = await axios({
				method: 'get',
				url: `http://localhost:8000/shop/${shop_id}/product?page=${page}&name=${queryString}`
			});
			setProducts(result.data);
			if(result.data.length > 0)
			{
				const shopResult = await axios({
					method: 'get',
					url: `http://localhost:8000/shopProduct/${result.data[0].product_id}`
				});
            	setShop(shopResult.data);
			}		
		}
		fetchData();
	},[page,queryString]);

	function setCurrentPage(newPage){
		return function(){
			setPage(newPage);
		}	 
	}
	
	if(products.length === 0)
	return (
		<div className="home">
			<div className="home__container">
				<img
				className="home__image"
				src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
				alt="VCCCC"
				/>

				<Category />
				<div className="mt-3">
					<h2>SHOP {shop && shop.name}</h2>
					<div>
						<img src={shop && backEndServe+shop.avatar} className="shop_img"/>
					</div>
				</div>
				<LoadData />
				<Patigation setCurrentPage={setCurrentPage}/>
			</div>
		</div>
	);
	else return (
		<div className="home">
		<div className="home__container">
			<img
			className="home__image"
			src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
			alt="VCCCC"
			/>

			<Category />
			<div className="mt-3">
				<h2>SHOP {shop && shop.name}</h2>
                <div>
                    <img src={shop && backEndServe+shop.avatar} className="shop_img"/>
                </div>
			</div>
			<LoadData />
			<Patigation setCurrentPage={setCurrentPage}/>
			<div className="home__row">
						{
							products.slice(0,2).map(
								(product) => <Product
								id={product.product_id}
								name={product.product_name}
								price={product.product_price}
								rating={product.product_rating}
								image={backEndServe+product.product_image}
							/>)
						}
					</div>
					<div className="home__row">
						{
							products.slice(2,5).map(
								(product) => <Product
								id={product.product_id}
								name={product.product_name}
								price={product.product_price}
								rating={product.product_rating}
								image={backEndServe+product.product_image}
							/>)
						}
					</div>

					<div className="home__row">
						{
							products.slice(5,6).map(
								(product) => <Product
								id={product.product_id}
								name={product.product_name}
								price={product.product_price}
								rating={product.product_rating}
								image={backEndServe+product.product_image}
							/>)
						}
					</div>
		</div>
		</div>
	);
}

export default ProductsShop;