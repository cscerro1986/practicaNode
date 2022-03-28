const async = require("hbs/lib/async");
const {obtenerCategoriaProductos,agregarCategoriaProducto,eliminarCategoriaProducto} = require("./categoriaProductoModal");

const getCategoriaProducto = async(req,res)=>{
    const data = await obtenerCategoriaProductos();
    res.render()
}