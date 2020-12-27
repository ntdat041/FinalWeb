const userService = require('../services/userService');


exports.getUserById = async(req,res) => {
    if (res.locals.user)
        return res.json({
            message: 'Success',
            user: {...res.locals.user}
        })
    return res.json({
        message: 'Failed',
        user: null
    });
}

exports.updateProfile = async(req,res) => {
    const updatedUser = await userService.updateProfile(req,res);
    res.json(updatedUser);
}