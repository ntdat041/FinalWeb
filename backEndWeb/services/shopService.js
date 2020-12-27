const bcrypt = require('bcrypt');
const {Shop} = require('../models/index');


exports.findShop = async function(data){
	try{
		const shop = await Shop.findOne({ where: { shop_id: data.shop_id } });
		if(shop === null)
		{
			console.log("you are anonymous");
			return null;
		}
        let dataShop = shop.dataValues;
        dataShop.password = null;
        return dataShop;
	} catch(err){
	console.log(err);
	return null;
	}
	return null;
}

exports.updateProfile = async function(req,res){
	let result = {
	  message:'',
	  shop:{}
	}
	let data = {...req.body};
	if(req.body.pass.length > 0)
  	{
		const oldShop = await Shop.findOne({
			where: {shop_id: res.locals.shop.shop_id}
		});

		const resultPassword = await bcrypt.compare(req.body.oldPassword,oldShop.dataValues.password);
		if(resultPassword === false){
		result.message = "Password is wrong !";
		return result;
		}
		data.password = await bcrypt.hash(req.body.pass, 10);
  	}
	for(element in data){
	  console.log(data[element]);
	}
	for(element in data){
	  if (data[element] == "" || data[element] == "null" || data[element] == undefined || data[element] == null || data[element] == 'undefined')
		delete data[element];
	}
	if(req.file){
	  data.avatar = `images/avatars/${req.file.originalname}`;
	}
	try{
	  const updatedShop = await Shop.update(
		{
		  ...data
		},
		{
		  returning: true,
		  where: {shop_id: res.locals.shop.shop_id}
		}
	  );
	  result.message = 'Success';
	  result.shop = {...updatedShop.dataValues}
	  return result;
	} catch (err){
	  console.log(err);
	  result.message = "Failed to updated";
	  return result;
	}
}