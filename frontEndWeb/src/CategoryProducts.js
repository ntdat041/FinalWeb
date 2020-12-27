import React, { useState, useEffect } from 'react';
import { useParams,useHistory} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import axios from "./axios";

import "./CategoryProduct.css";

import Product from "./Product";
import Category from "./Category";
import Patigation from "./Patigation";
import LoadData from "./LoadData";


function CategoryProducts() {
	const [{ queryString }, dispatch] = useStateValue();
	const [products, setProducts] = useState([]);
	const [page,setPage] = useState(1);
	let { category_id } = useParams();
	let name;
	const backEndServe = 'http://localhost:8000/';

	switch (category_id){
		case '1':
			name = "Máy tính - Thiết bị VP";
			break;
		case '2':
			name = "Điện lạnh - Điện gia dụng";
			break;
		case '3':
			name = "Kỹ thuật số";
			break;
		case '4':
			name = "Mẹ và bé";
			break;
		case '5':
			name = "Mỹ phẩm";
			break;
		case '6':
			name = "Nhà cửa đời sống";
			break;
		case '7':
			name = "Sách";
			break;
		case '8':
			name = "Thực phẩm";
			break;
		case '9':
			name = "Tivi";
			break;
		case '10':
			name = "Văn phòng phẩm"
			break;
	}
	
	useEffect(() => {
		async function fetchData(){
			const result = await axios({
				method: 'get',
				url: `http://localhost:8000/category/${category_id}?page=${page}&name=${queryString}`
			});
			setProducts(result.data);
		}
		fetchData();
	},[category_id,page,queryString]);

	function setCurrentPage(newPage){
		return function(){
			setPage(newPage);
		}	 
	}
	
	if(products.length === 0)
	return (
		<div className="home">
			<LoadData />
			<div className="home__container">
				<img
				className="home__image"
				src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
				alt="VCCCC"
				/>

				<Category />
				<div className="mt-3">
					<h2>{name}</h2>
				</div>
				<Patigation setCurrentPage={setCurrentPage}/>
			</div>
		</div>
	);
	else return (
		<div className="home">
			<LoadData />
		<div className="home__container">
			<img
			className="home__image"
			src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
			alt="VCCCC"
			/>

			<Category />
			<div className="mt-3">
				<h2>{name}</h2>
			</div>
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
				<Patigation setCurrentPage={setCurrentPage}/>
		</div>
		</div>
	);
}

export default CategoryProducts;