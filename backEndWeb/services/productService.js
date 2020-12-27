const moment = require('moment');

const db = require('../models/index');
const { Product } = require('../models/index');
const { Shop } = require('../models/index');
const { OrderDetail } = require('../models/index');
const { Op } = require("sequelize");

exports.getProducts = async function (req) {
	if (JSON.stringify(req.params) === '{}')
	{
		try{
			const productsData = await Product.findAll({
			});
			let products = [];
			for(productData of productsData)
			{
				products.push(productData.dataValues);
			}
			return products;
		} catch(err){
			console.log(err);
			return null;
		}
	}

	return null;	
};

exports.getFirstListProduct = async function (req) {
	let page = 0;
	if(req.query.page) 
		page = ((+req.query.page)-1)*6;
	try{
		const firstListProduct = await Product.findAndCountAll({
			where: {
				product_name:{
					[Op.like]: `%${req.query.name}%`
				}		
			},
			order: [],
			limit: 6,
			offset: page,
		});
		return firstListProduct.rows;
	} catch (err){
		console.log(err);
		return err;
	}
	return null;
}

exports.getProductById = async function(req) {
	try{
		const productById = await Product.findOne({
			where : {
				product_id : req.params.productId
			}
		});
		return productById.dataValues;
	}catch (err){
		console.log(err);
		return null;
	}
}
exports.getProductByCategoryId = async function(req){
	let page = 0;
	if(req.query.page)
	page = ((+req.query.page)-1)*6;
	try {
		const productByCategorId = await Product.findAndCountAll({
			where : {
				category_id : req.params.categoryId,
				product_name:{
					[Op.like]: `%${req.query.name}%`
				}	
			},
			order: [],
			limit: 6,
			offset: page

		});
		return productByCategorId.rows;
	}catch(err){
		console.log(err);
		return null;
	}
}

exports.getProductByShopId = async function(req){
	let page = 0;
	if(req.query.page)
	page = ((+req.query.page)-1)*6;
	try {
		const productByShopId = await Product.findAndCountAll({
			where :{
				shop_id : req.params.shop_id,
				product_name:{
					[Op.like]: `%${req.query.name}%`
				}	
			},
			order: [],
			limit: 6,
			offset: page
		});
		
		return productByShopId.rows;
	}
	catch(err){
		console.log(err);
		return null;
	}
}

exports.changeInfoProduct = async function(req,res) {
	try {
		const product = await Product.findByPk(req.params.product_id);
		if (product){
			if(req.file)
				product.product_image = `Image Product/${res.locals.name}/${req.file.originalname}`;
			product.product_name = req.body.product_name;
			product.product_price = req.body.product_price;
			product.product_description = req.body.product_description;
			product.quantityInStock = req.body.quantityInStock;
			product.category_id = req.body.category_id;
		}
		const updateProduct = await product.save();
		return {
			updateProduct: updateProduct.dataValues,
			message: "Success"
		}
	}
	catch(err){
		console.log(err);
		return {
			message: "Failed to update"
		}
	}
}

exports.addProduct = async function(req,res) {
	try {
		const newproduct = await Product.create({
			...req.body,
			shop_id : req.params.shop_id,
			product_image: `Image Product/${res.locals.name}/${req.file.originalname}`,
			createdAt : moment(),
			updatedAt : moment()
		});
		return {
			message: "Success"
		};
	}
	catch(err) {
		console.log(err);
		return {
			message: "Failed to create"
		};
	}
}

exports.getInfoShopByProductId = async function (req){
	try{
		const product = await Product.findByPk(req.params.product_id);
		const shop = await Shop.findOne({
			where : {
				shop_id : product.shop_id
			}
		});
		return shop.dataValues;
	}
	catch(err){
		console.log(err);
		return null;
	}
}










exports.updateRating = async function (req){
	try{
		const orderDetail = await OrderDetail.findByPk(req.params.orderDetail_id);
		orderDetail.isRated = true;
		const updatedOrderDetail = await orderDetail.save();
		const product = await Product.findByPk(req.params.product_id);
		product.product_rating = parseInt(((product.nosale - req.body.quantity)*product.product_rating+req.body.quantity*req.body.rating)/product.nosale);
		const updatedProduct = await product.save();
		return updatedProduct;
	}
	catch(err){
		console.log(err);
		return null;
	}
}

exports.getTopSaleByShopId = async function (req) {
	try{
		const listProduct = await Product.findAll({
			where :{
				shop_id : req.params.shop_id
			},
			order :[["nosale","DESC"]],
			limit : 5
		});
		const products = [];
		for(product of listProduct)
			products.push(product.dataValues);
		return products;
	}
	catch(err){
		console.log(err);
		return null;
	}
}