var CronJob = require('cron').CronJob;
const cartService = require('../services/cartService');
const {Cart} = require('../models/index');

module.exports.autoUpdateCart = new CronJob('* * * * * *', function() {
		async function checkCart(){
            const carts = await Cart.findAll();
            await Promise.all(carts.map(cart => cartService.autoUpdateCart(cart.dataValues.user_id)));
        }
        checkCart();
    }, null, false, 'America/Danmarkshavn'
);