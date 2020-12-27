const productInCartService = require('../services/productInCartService');

exports.createProductInCart = async (req, res) => {
    const newProductInCart = await productInCartService.createProductInCart(req);
    if(newProductInCart == null)
        return {message : "Failed to create"}
    return res.json({
        message: 'Success',
        newProductInCart : newProductInCart
    });
};

exports.updateProductInCartIncrease = async (req, res) => {
    const updatedProductInCart = await productInCartService.updateProductInCartIncrease(req);
    if(updatedProductInCart == null)
        return {message : "Failed to create"}
    return res.json({
        message: 'Success',
        updatedProductInCart : updatedProductInCart
    });
};

exports.updateProductInCartDecrease = async (req, res) => {
    const updatedProductInCart = await productInCartService.updateProductInCartDecrease(req);
    if(updatedProductInCart == null)
        return {message : "Failed to create"}
    return res.json({
        message: 'Success',
        updatedProductInCart : updatedProductInCart
    });
};

exports.updateProductInCartDelete = async (req, res) => {
    const deletedProductInCart = await productInCartService.updateProductInCartDelete(req);
    if(deletedProductInCart == null)
        return {message : "Failed to create"}
    return res.json({
        message: 'Success',
        deletedProductInCart : deletedProductInCart
    });
}

exports.updateProductInCartDeleteAll = async (req,res) => {
    const deletedAllCart = await productInCartService.updateProductInCartDeleteAll(req);
    if(deletedAllCart == null)
        return {message : "Failed to create"}
    return res.json({
        message: 'Success',
        deletedAllCart : deletedAllCart
    });
}