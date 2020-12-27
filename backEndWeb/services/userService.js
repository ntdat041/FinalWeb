const bcrypt = require('bcrypt');
const {User} = require('../models/index');

exports.checkUserCredentials = async function (data) {
  const candidateUser = await user.findOne({
    where: {
      email: data.email,
    },
  });

  if (!candidateUser) {
    return false;
  }

  if (!bcrypt.compareSync(data.password, candidateUser.password)) {
    return false;
  }

  return candidateUser;
};

exports.getUserById = async(req) => {
  try{
    const userData = await User.findOne({
      where: {
        user_id: req.params.userId
      }
    });
    return userData.dataValues;
  } catch (err){
    console.log(err);
    return null;
  }
}

exports.findUser = async function(data){
	try{
		const user = await User.findOne({ where: { user_id: data.user_id } });
		if(user === null)
		{
			console.log("you are anonymous");
			return null;
		}
    let dataUser = user.dataValues;
    dataUser.password = null;
    if(dataUser.birthday){
      dataUser.birthday = dataUser.birthday.toLocaleString().split(',')[0];
    }
		return dataUser;
	} catch(err){
	console.log(err);
	return null;
	}
	return null;
}

exports.updateProfile = async function(req,res){
  let result = {
    message:'',
    user:{}
  }
  let data = {...req.body};
  if(req.body.pass.length > 0)
  {
    const oldUser = await User.findOne({
      where: {user_id: res.locals.user.user_id}
    });
    const resultPassword = await bcrypt.compare(req.body.oldPassword,oldUser.dataValues.password);
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
    const updatedUser = await User.update(
      {
        ...data
      },
      {
        returning: true,
        where: {user_id: res.locals.user.user_id}
      }
    );
    result.message = 'Success';
    result.user = {...updatedUser.dataValues}
    return result;
  } catch (err){
    console.log(err);
    result.message = "Failed to updated";
    return result;
  }
}
