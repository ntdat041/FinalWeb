const moment = require('moment');

const {ProductInCart} = require('../models/index');

exports.createProductInCart = async function(req){
    try{
        const newProductInCart = await ProductInCart.create({
            user_id : req.params.user_id,
            product_id : req.params.product_id,
            quantity : 1,
            createdAt : moment(),
            updatedAt : moment() 
        });
        return newProductInCart.dataValues;
    } catch (err){
        console.log(err);
        return null;
    }
    
}

exports.updateProductInCartIncrease = async function (req){
    try{
        const checkProduct = await ProductInCart.findAll({
            where: {
                user_id : req.params.user_id,
                product_id : req.params.product_id
            }
        });
        if(checkProduct.length === 0){
            const newProductInCart = await this.createProductInCart(req);
            return newProductInCart;
        }
        const updateProduct = await ProductInCart.findOne({
            where: {
                user_id : req.params.user_id,
                product_id : req.params.product_id
            }
        });
        updateProduct.quantity = updateProduct.quantity + 1;
        const updatedProduct = await updateProduct.save();
        return updatedProduct.dataValues;
    } catch (err){
        console.log(err);
        return null;
    }
}

exports.updateProductInCartDecrease = async function (req){
    try{
        const updateProduct = await ProductInCart.findOne({
            where: {
                user_id : req.params.user_id,
                product_id : req.params.product_id
            }
        });
        if(updateProduct.quantity && updateProduct.quantity>1)
        {
            updateProduct.quantity = updateProduct.quantity - 1;
            const updatedProduct = await updateProduct.save();
            return updatedProduct.dataValues;
        }
    } catch (err){
        console.log(err);
        return null;
    }
}

exports.updateProductInCartDelete = async function (req){
    try{
        const deletedProduct = await ProductInCart.destroy({
            where: {
                user_id : req.params.user_id,
                product_id : req.params.product_id
            }
        });
        return deletedProduct;
    } catch(err){
        console.log(err);
        return null;
    }
}

exports.updateProductInCartDeleteAll = async function (req){
    try{
        const deletedProduct = await ProductInCart.destroy({
            where: {
                user_id : req.params.user_id
            }
        });
        return deletedProduct;
    } catch (err){
        console.log(err);
        return null;
        
    }
}