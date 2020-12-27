const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/constant');
const userService = require('../services/userService');
const shopService = require('../services/shopService');

module.exports.checkToken =  async function(req, res, next) {
    if (req.headers.token != 'undefined') {
        const token = req.headers.token;  
        const data = await jwt.verify(token,jwtSecret);
        if(data.user_id === undefined) return res.json({ message:'Failed to check'});
        const user = await userService.findUser(data);
        if (user===null) return res.json({ message:'Failed to check'});
        res.locals.user = user;
        return next();  
    }
    return res.json({ message:'Failed to check'});
};

module.exports.checkShopToken =  async function(req, res, next) {
    if (req.headers.token != 'undefined') {
        const token = req.headers.token;  
        const data = await jwt.verify(token,jwtSecret);
        if(data.shop_id === undefined) return res.json({ message:'Failed to check'});
        const shop = await shopService.findShop(data);
        if (shop===null) return res.json({ message:'Failed to check'});
        res.locals.shop = shop;
        return next();  
    }
    return res.json({ message:'Failed to check'});
};