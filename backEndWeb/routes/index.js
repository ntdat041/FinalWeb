const express = require('express');

const authController = require('../controllers/authController');
const authValidator = require('../validator/auth');
const productController = require('../controllers/productController');
const productInCartController = require('../controllers/productInCartController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const shopController = require('../controllers/shopController');

const userMiddleware = require('../middleware/userMiddleware');
const fileMiddleware = require('../middleware/fileMiddleware');
const router = express.Router();

/* GET home page. */
router.get('/products', productController.getProducts);

router.get('/login', authController.login);
router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', { title: 'Admin dashboard' });
});

router.get('/',productController.getFirstListProduct);
router.get('/sendMail',authController.sendMail);
// router.get('/profile/:userId',userController.getUserById);
router.get('/profile',userMiddleware.checkToken,userController.getUserById);
router.get('/shopProfile',userMiddleware.checkShopToken,shopController.getShopById);

//Lay san pham theo ID
router.get('/products/:productId', productController.getProductById);
//Lay toan bo san pham theo category
router.get('/category/:categoryId', productController.getProductByCategoryId);
//Lay toan bo san pham cua shop
router.get('/shop/:shop_id/product', productController.getProductByShopId);
//Lay thong tin Shop tu product ID
router.get('/shopProduct/:product_id', productController.getInfoShopByProductId);
//Lay thong tin products incart
router.get('/cart/:user_id',cartController.getCart);
//Lay thong tin order nguoi dung
router.get('/orderDetailProduct/:user_id',orderController.getOrders);
//Lay cac order cua user 


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/profile',userMiddleware.checkToken,fileMiddleware.uploadFile,userController.updateProfile);
router.post('/shopProfile',userMiddleware.checkShopToken,fileMiddleware.uploadFile,shopController.updateProfile);
router.post('/authRegister',authController.authRegister);
router.post('/shopLogin', authController.shopLogin);
router.post('/shopRegister', authController.shopRegister);

router.post('/order/:user_id',orderController.createOrder);

router.post('/shop/:shop_id/product/add',fileMiddleware.uploadProduct,productController.addProduct);

router.post('/productInCart/:user_id/:product_id',productInCartController.createProductInCart);
router.post('/increaseProductInCart/:user_id/:product_id',productInCartController.updateProductInCartIncrease);
router.post('/decreaseProductInCart/:user_id/:product_id',productInCartController.updateProductInCartDecrease);
router.post('/deleteProductInCart/:user_id/:product_id',productInCartController.updateProductInCartDelete);
router.post('/deleteAllProductInCart/:user_id',productInCartController.updateProductInCartDeleteAll);
router.post('/cart/:user_id',cartController.createCart);  
router.post('/updateCart/:user_id',cartController.updateCart); 
// router.post('/order/:user_id'.orderController.createOrder);
router.post('/rating/:product_id/:orderDetail_id',productController.updateRating);




router.put('/shop/:shop_id/product/change/:product_id',fileMiddleware.uploadProduct, productController.changeInfoProduct);
//Top Sale theo tung shop 
router.get('/shop/:shop_id/topsales', productController.getTopSaleByShopId);

//Top 10 order gan nhat thep tung shop
router.get('/shop/:shop_id/recentorder', orderController.getRecentOrderByShopId);

// Update status order
router.post('/changeOrder/:order_id', orderController.changeStatusOrder);
//Lay toan bo order cua shop
router.get('/shop/:shop_id/order', orderController.getOrderByShopId);
//Lay total order shop
router.get('/shop/:shop_id/totalorder', orderController.getTotalOrderByShopId);
//Lay total money 
router.get('/shop/:shop_id/totalMoney', orderController.getTotalMoney);
//Tao order moi
router.get('/user/:user_id/checkout', orderController.addOrder);
//Lay total money theo thang
router.get('/shop/:shop_id/totalMoney/:year/:month', orderController.getMoneyMonth);
//Laay total order theo thang
router.get('/shop/:shop_id/totalOrder/:year/:month', orderController.getOrderMonth);
//Lay cac order cua user
router.get('/user/:user_id/purchase', orderController.getOrderByIdUser);
//Lay orderdetail theo shop
router.get('/shop/:shop_id/order/:order_id/detail', orderController.getOrderDetailByShop);
//Lay orderdetail theo user
router.get('/user/:user_id/order/:order_id/detail', orderController.getOrderDetailByUser);
module.exports = router;
