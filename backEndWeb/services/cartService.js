const moment = require('moment');

const {Cart} = require('../models/index');
const {ProductInCart} = require('../models/index');
const db = require('../models/index');

exports.createCart = async function(req){
    try{
        const newCart = await Cart.create({
            user_id : req.params.user_id,
            createdAt : moment(),
            updatedAt : moment()
        });
        return newCart;
    } catch (err){
        console.log(err);
        return null;
    } 
}

exports.updateCart = async function(req){
    try{
        const products = await db.sequelize.query(`select * from 
        productincart
        join product on productincart.product_id = product.product_id
        where productincart.user_id = ${req.params.user_id}`,{
          type: db.sequelize.QueryTypes.SELECT
        });
        const userCart = await Cart.findOne({
            where: {
                user_id: req.params.user_id
            }
        });
        if (products.length == 0){
            userCart.totalAmount = 0;
            userCart.numOfAmount = 0;
            const savedUserCart = await userCart.save();
            return savedUserCart.dataValues;
        }
        userCart.totalAmount = products.reduce((totalAmount,product) => totalAmount + product.quantity*product.product_price , 0);
        userCart.numOfProduct = products.reduce((numOfAmount,product) => numOfAmount + product.quantity  , 0)
        const savedUserCart = await userCart.save();
        return savedUserCart.dataValues;

      } catch(err){
        console.log(err);
        return null;
    }
}

exports.getCart = async function(req){
    try{
        const products = await db.sequelize.query(`select * from 
        productincart
        join product on productincart.product_id = product.product_id
        where productincart.user_id = ${req.params.user_id}`,{
          type: db.sequelize.QueryTypes.SELECT
        });
        return products;
    } catch (err){
        console.log(err);
        return null;
    }
}

exports.autoUpdateCart = async function(user_id){
    try{
        const products = await db.sequelize.query(`select * from 
        productincart
        join product on productincart.product_id = product.product_id
        where productincart.user_id = ${user_id}`,{
          type: db.sequelize.QueryTypes.SELECT
        });
        const userCart = await Cart.findOne({
            where: {
                user_id: user_id
            }
        });
        if (products.length == 0){
            userCart.totalAmount = 0;
            userCart.numOfProduct = 0;
            const savedUserCart = await userCart.save();
            return savedUserCart.dataValues;
        }
        userCart.totalAmount = products.reduce((totalAmount,product) => totalAmount + product.quantity*product.product_price , 0);
        userCart.numOfProduct = products.reduce((numOfProduct,product) => numOfProduct + product.quantity  , 0)
        const savedUserCart = await userCart.save();
        return savedUserCart.dataValues;

      } catch(err){
        console.log(err);
        return null;
    }
}