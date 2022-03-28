//1- La conexion a la base de datos.
const { query } = require("express")
const connection = require("../db/config");
//const data = require("../db/data");


//metodos SQL
const getAllProducts = async () => {
    const query = "SELECT * FROM producto";
    try 
    {
        const data = await connection.query(query);
       
        return data;    
    } catch (error) {
        console.log(error);
    }
}

const getProductsByID = async(id)=>{
    const query = `SELECT * FROM producto whres idProducto = ${id}`;
    try 
    {
        console.log(query)
        const data =  await connection.query(query);
        return data;   
    } catch (error) {
        console.log(error);
    }
}

const addProducto = async(producto) =>{
    query = `Insert into producto Values ('${producto.NombreProducto}', '${producto.DescripcionProducto}',
     ${producto.Precio} , ${producto.EstadoProducto},'${producto.PathImagenProducto}',${producto.idCategoriaproducto});`;
    
    try
    {
        connection.query(query);        

    } catch (error) 
    {
        console.log(error);
    }
}

module.exports = {getAllProducts,getProductsByID, addProducto};
