const async = require("hbs/lib/async");
const {getAllProducts} = require("./productosModel");
const {obtenerCategoriaProductos} = require("../CategoriaProductos/categoriaProductoModal");

const listAllProductos = async(req,res)=>{
    const products = await getAllProducts();
    const categories = await obtenerCategoriaProductos();

    if(products.hasOwnProperty("error"))
    {
        res.status(500).render('listaProductos').json()
    } 
    else
    {
        
        console.log(products);
        res.status(200).render('listaProductos',{products,categories});
        // res.status(200).send(products)
    }        
}

module.exports = {listAllProductos};