const productService = require('../services/productService');

exports.getProducts = async (req, res, next) => {
  const products = await productService.getProducts(req);
  return res.json(products);
};


exports.postProduct = (req, res, next) => {
  const data = req.body;
  return res.json(data);
};

exports.getFirstListProduct = async (req,res) => {
  const firstListProduct = await productService.getFirstListProduct(req);
  return res.json(firstListProduct);
}

exports.getProductById = async (req, res) => {
	const ProductById = await productService.getProductById(req);
	return res.json(ProductById);
}
exports.getProductByCategoryId = async (req, res) =>{
	const productByCategoryId = await productService.getProductByCategoryId(req);
	return res.json(productByCategoryId);
}

exports.getProductByShopId = async (req, res) => {
	const productByShopId = await productService.getProductByShopId(req);
	return res.json(productByShopId);
}

exports.addProduct = async(req, res) => {
	const newproduct = await productService.addProduct(req,res);
	return res.json(newproduct);
}

exports.changeInfoProduct = async (req, res) => {
	const product = await productService.changeInfoProduct(req,res);
	return res.json(product);
}

exports.getInfoShopByProductId = async(req,res) =>{
	const shop = await productService.getInfoShopByProductId(req);
	return res.json(shop);
}

exports.updateRating = async(req,res) => {
	
	const updatedProduct = await productService.updateRating(req);
    if(updatedProduct == null)
        return {message : "Failed to get"}
    return res.json({
        message: 'Success',
        updatedProduct : updatedProduct
	});
}

exports.getTopSaleByShopId = async (req, res) =>{
	const listProduct = await productService.getTopSaleByShopId(req);
	return res.json(listProduct);
}