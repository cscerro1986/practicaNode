const async = require("hbs/lib/async");
const connection = require("../db/config");

const obtenerCategoriaProductos = async()=>{
    const query = `SELECT * FROM categoriaproducto`;
    data = connection.query(query);
    return data;
}

const agregarCategoriaProducto = async(item)=>{
    const query =`INSERT INTO categoria producto ('NombreProducto') VALUES (${item})`;
    const data =connection.query(query);
    
}


const eliminarCategoriaProducto = async(item)=>{
    const query = `DELETE FROM categoriaproducto WHERE idCategoriaProducto = ${item}`;
    connection.query(query);
}

module.exports ={obtenerCategoriaProductos,agregarCategoriaProducto,eliminarCategoriaProducto};