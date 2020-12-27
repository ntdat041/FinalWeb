const cartService = require('../services/cartService');

exports.createCart = async (req, res) => {
    const newCart = await cartService.createCart(req);
    if(newCart == null)
        return {message : "Failed to create"}
    return res.json({
        message: 'Success',
        newCart : newCart
    });
};

exports.updateCart = async (req, res) => {
    const updatedCart = await cartService.updateCart(req);
    if(updatedCart == null)
        return {message : "Failed to create"}
    return res.json({
        message: 'Success',
        updatedCart : updatedCart
    });
};

exports.getCart = async (req,res) => {
    const userCart = await cartService.getCart(req);
    if(userCart == null)
        return {message : "Failed to get"}
    return res.json({
        message: 'Success',
        userCart : userCart
    });
}