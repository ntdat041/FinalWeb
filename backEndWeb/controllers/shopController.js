const shopService = require('../services/shopService');

exports.getShopById = async(req,res) => {
    if (res.locals.shop)
        return res.json({
            message: 'Success',
            shop: {...res.locals.shop}
        })
    return res.json({
        message: 'Failed',
        user: null
    });
}

exports.updateProfile = async(req,res) => {
    const updatedShop = await shopService.updateProfile(req,res);
    res.json(updatedShop);
}

