var CronJob = require('cron').CronJob;
const orderService = require('../services/orderService');
const mailService = require('../services/mailService');
const {Order} = require('../models/index');

module.exports.autoUpdateCart = new CronJob('* * * * * *', function() {
		async function autoMailUser(){
            const carts = await Cart.findAll();
            await Promise.all(carts.map(cart => cartService.autoUpdateCart(cart.dataValues.user_id)));
        }
        checkCart();
    }, null, false, 'America/Danmarkshavn'
);