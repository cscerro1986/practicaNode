const router = require("express").Router();
const {listAllProductos} = require("./productosController");


router.get('/',listAllProductos);

module.exports = router