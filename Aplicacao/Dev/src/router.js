const express = require('express');

const router = express.Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

const tables_controller = require('./Controller/tables-controller');
const user_controller = require('./Controller/users-controller');
const solicitations_controller = require('./Controller/solicitations-controller');
const show_user_solicitations_controller = require('./Controller/show_user_solicitations-controller');
const show_shop_ratings_controller = require('./Controller/show_user_shop_ratings-controller');
const show_shop_payments_controller = require('./Controller/show_user_shop_payments-controller');
const show_product_ratings_controller = require('./Controller/show_user_product_ratings-controller');
const show_parking_payments_controller = require('./Controller/show_user_parking_payments-controller');
const show_promotions_controller = require('./Controller/show_shopping_promotions-controller');
const show_tables_controller = require('./Controller/show_shop_tables-controller');
const show_shop_solicitations_controller = require('./Controller/show_shop_solicitations-controller');
const show_shop_rating_controller = require('./Controller/show_shop_rating-controller');
const show_catalog_controller = require('./Controller/show_shop_catalog-controller');
const shops_controller = require('./Controller/shops-controller');
const shops_rating_controller = require('./Controller/shops_rating-controller');
const shoppings_controller = require('./Controller/shoppings-controller');
const shop_payments_controller = require('./Controller/shop_payments-controller');
const session_user_controller = require('./Controller/session_user-controller');
const session_shop_controller = require('./Controller/session_shop-controller');
const promotions_controller = require('./Controller/promotions-controller');
const product_rating_controller = require('./Controller/products_rating-controller');
const payment_methods_controller = require('./Controller/payment_methods-controller');
const parking_payments_controller = require('./Controller/parking_payments-controller');
const notification_controller = require('./Controller/notifications-controller');
const menus_controller = require('./Controller/menus-controller');
const shop_file_controller = require('./Controller/shop_files-controller');
const shopping_file_controller = require('./Controller/shopping_files-controller');

const { verifyJWT } = require('./Controller/middlewares/jwt-authentication');
const {
  checkCPF,
  checkCNPJ,
  checkUser,
  checkUpdateUser,
  checkShop,
  checkUpdateShop,
  checkParkingPayment,
  checkShopping,
  checkShopPayment,
  checkUpdateShopPayment,
  checkSolicitation,
  checkPaymentMethod,
  checkProductRating,
  checkTable,
  checkLogin,
  checkMenu,
  checkShopRating,
  checkPromotion,
  checkPermissionsUser,
  checkPermissionsShop,
} = require('./Controller/middlewares/check_middlewares');

// Users
router.get('/users', verifyJWT, checkPermissionsUser, user_controller.readById);
router.post('/users', checkUser, checkCPF, user_controller.create);
router.put(
  '/users',
  checkUpdateUser,
  verifyJWT,
  checkPermissionsUser,
  user_controller.update
);
router.delete(
  '/users',
  verifyJWT,
  checkPermissionsUser,
  user_controller.delete
);

// Tables
router.get('/tables/:id', verifyJWT, tables_controller.readById);
router.post('/tables', verifyJWT, checkTable, tables_controller.create);
router.put('/tables', verifyJWT, checkTable, tables_controller.update);
router.delete('/tables/:id', verifyJWT, tables_controller.delete);

// Solicitations
router.get('/solicitations', verifyJWT, solicitations_controller.readById);
router.post(
  '/solicitations',
  verifyJWT,
  checkSolicitation,
  solicitations_controller.create
);
router.put(
  '/solicitations',
  verifyJWT,
  checkSolicitation,
  solicitations_controller.update
);
router.delete('/solicitations', verifyJWT, solicitations_controller.delete);

// Show user solicitations
router.get(
  '/users/solicitations',
  verifyJWT,
  checkPermissionsUser,
  show_user_solicitations_controller.showSolicitations
);

// Show user shop ratings
router.get(
  '/users/shop_ratings',
  verifyJWT,
  checkPermissionsUser,
  show_shop_ratings_controller.showShopRatings
);

// Show user shop payments
router.get(
  '/users/shop_payments',
  verifyJWT,
  checkPermissionsUser,
  show_shop_payments_controller.showShopPayments
);

// Show user product ratings
router.get(
  '/users/product_ratings',
  verifyJWT,
  checkPermissionsUser,
  show_product_ratings_controller.showProductRatings
);

// Show user parking payments
router.get(
  '/users/parking_payments',
  verifyJWT,
  checkPermissionsUser,
  show_parking_payments_controller.showParkingPayments
);

// Show shopping promotions
router.get(
  '/shoppings/promotions',
  verifyJWT,
  show_promotions_controller.showPromotions
);

// Show shop tables
router.get(
  '/shops/tables',
  verifyJWT,
  checkPermissionsShop,
  show_tables_controller.showTables
);

// Show shop solicitations
router.get(
  '/shops/solicitations',
  verifyJWT,
  checkPermissionsShop,
  show_shop_solicitations_controller.showSolicitations
);

// Show shop rating
router.get(
  '/shops/shop_rating',
  verifyJWT,
  checkPermissionsShop,
  show_shop_rating_controller.showShopRating
);

// Show shop catalog
router.get(
  '/shops/catalog',
  verifyJWT,
  checkPermissionsShop,
  show_catalog_controller.showCatalog
);

// Show shops
// avaliar
router.get('/:id_shopping/shops', verifyJWT, shops_controller.all);
router.get(
  '/shops',
  verifyJWT,
  checkPermissionsShop,
  shops_controller.readById
);
router.post('/shops', checkShop, checkCNPJ, shops_controller.create);
router.put(
  '/shops',
  checkUpdateShop,
  checkCNPJ,
  verifyJWT,
  checkPermissionsShop,
  shops_controller.update
);
router.delete(
  '/shops',
  verifyJWT,
  checkPermissionsShop,
  shops_controller.delete
);

// Shops rating
router.get('/shop_ratings', shops_rating_controller.all);
router.post(
  'shops/shop_ratings',
  verifyJWT,
  checkShopRating,
  shops_rating_controller.create
);
router.put(
  'shops/shop_ratings',
  verifyJWT,
  checkShopRating,
  shops_rating_controller.update
);
router.delete('shops/shop_ratings', verifyJWT, shops_rating_controller.delete);

// Shoppings
router.get('/shoppings', shoppings_controller.all);
router.post('/shoppings', checkShopping, shoppings_controller.create);
router.put('/shoppings', checkShopping, shoppings_controller.update);
router.delete('/shoppings', shoppings_controller.delete);

// Shop payments
router.get('/shop_payments/:id', verifyJWT, shop_payments_controller.readById);
router.post(
  '/shop_payments',
  verifyJWT,
  checkShopPayment,
  shop_payments_controller.create
);
router.put(
  '/shop_payments',
  verifyJWT,
  checkUpdateShopPayment,
  shop_payments_controller.update
);
router.delete('/shop_payments', verifyJWT, shop_payments_controller.delete);

// Session user
router.post('/session_user', checkLogin, session_user_controller.createSession);

// Session shop
router.post('/session_shop', checkLogin, session_shop_controller.createSession);

// Promotions
router.get('/promotions', verifyJWT, promotions_controller.all);
router.post(
  '/promotions',
  verifyJWT,
  checkPromotion,
  promotions_controller.create
);
router.put(
  '/promotions',
  verifyJWT,
  checkPromotion,
  promotions_controller.update
);
router.delete('/promotions', verifyJWT, promotions_controller.delete);

// Products rating
router.get('/product_ratings', product_rating_controller.all);
router.post(
  '/products_rating',
  verifyJWT,
  checkProductRating,
  product_rating_controller.create
);
router.put(
  '/product_ratings',
  verifyJWT,
  checkProductRating,
  product_rating_controller.update
);
router.delete('/product_ratings', verifyJWT, product_rating_controller.delete);

// Payment methods
router.get('/payment_methods', verifyJWT, payment_methods_controller.all);
router.post(
  '/payment_methods',
  verifyJWT,
  checkPaymentMethod,
  payment_methods_controller.create
);
router.put(
  '/payment_methods',
  verifyJWT,
  checkPaymentMethod,
  payment_methods_controller.update
);
router.delete(
  '/payment_methods/:id',
  verifyJWT,
  payment_methods_controller.delete
);

// Parking payments
router.get(
  '/parking_payments',
  verifyJWT,
  checkPermissionsShop,
  parking_payments_controller.all
);
router.post(
  '/parking_payments',
  verifyJWT,
  checkPermissionsUser,
  checkParkingPayment,
  parking_payments_controller.create
);
router.put(
  '/parking_payments',
  verifyJWT,
  checkParkingPayment,
  checkPermissionsShop,
  parking_payments_controller.update
);
router.delete(
  '/parking_payments',
  verifyJWT,
  checkPermissionsShop,
  parking_payments_controller.delete
);

// Notifications
router.get('/notifications', verifyJWT, notification_controller.get);
router.post('/notifications', /* verifyJWT, */ notification_controller.post);
router.put('/notifications', verifyJWT, notification_controller.put);
router.delete('/notifications', verifyJWT, notification_controller.delete);

// Menus
router.get('/menus', verifyJWT, menus_controller.all);
router.post(
  '/menus',
  verifyJWT,
  checkPermissionsShop,
  checkMenu,
  menus_controller.create
);
router.put(
  '/menus',
  verifyJWT,
  checkPermissionsShop,
  checkMenu,
  menus_controller.update
);
router.delete(
  '/menus',
  verifyJWT,
  checkPermissionsShop,
  menus_controller.delete
);

// Shop files
router.post(
  '/shop_files',
  verifyJWT,
  upload.single('file'),
  shop_file_controller.create
);

// Shopping files
router.post(
  '/shopping_files',
  verifyJWT,
  upload.single('file'),
  shopping_file_controller.create
);

module.exports = router;
