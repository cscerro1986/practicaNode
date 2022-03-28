const router = require("express").Router();
const {listarAllProducts,listarProductoPorID} = require('../products/productsController');

//get all Products
router.get("/", listarAllProducts)

//get user by id
router.get("/:id", listarProductoPorID);


module.exports = router