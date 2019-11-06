const express = require("express");
const router = express.Router();

//crud controller
const crud = require("../controller/crud.controller");
const sale = require('../controller/sale.controller');
const report = require('../controller/report.controller');

//crud routing
router.route('/').get(crud.homectrl);
router.route('/add').post(crud.addctrl);
router.route('/products').get(crud.allProducts);
router.route('/product/:id').get(crud.getProduct);
router.route('/delete/:id').delete(crud.deleteProduct);
router.route('/update/:id').put(crud.updateProduct);

//sale routing
router.route('/sale/add').post(sale.addctrl);
router.route('/sale/getSale/:crud_id').get(sale.getSale);
router.route('/sale/update/:id').put(sale.updateSale);

//report routing
router.route('/report/generate').get(report.generate);


module.exports = router;