const db = require('../models/index');
const product = db['Product'];

const authService = require('../services/authService');
const mailService = require('../services/mailService');

exports.register = async(req,res) => {
  const registerResult = await authService.register(req);
  return res.json(registerResult);
}

exports.login = async(req,res) => {
  const loginResult = await authService.login(req);
  return res.json(loginResult);
}

exports.sendMail = async(req,res) => {
  const result = await mailService.sendMailRegister('binhbg14@gmail.com','asfas');
  return res.json(result);
}

exports.authRegister = async(req,res) => {
  const result = await authService.authRegister(req);
  return res.json(result);
}

exports.shopLogin = async(req,res) => {
  const loginResult = await authService.shopLogin(req);
  return res.json(loginResult);
}

exports.shopRegister = async(req,res) => {
  const loginResult = await authService.shopRegister(req);
  return res.json(loginResult);
}