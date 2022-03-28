

const {getAllProducts,getProductsByID, addProducto} =require('../products/productsModel');
const findById = require("../util/findById");

const listarAllProducts = async(req,res)=>{
    const data = await getAllProducts();

    data.hasOwnProperty("error") ? res.status(500).json(data) : res.status(200).json(data)


}
const listarProductoPorID = async(req,res, next) =>{
    //Valido que el req.body.id sea un numero.

    console.log("Entro al listarProductoPorID del controlador")
    console.log(req.body.id);
    if(isNaN(+req.body.id))
    {
        return res.status(400).json({message:"Debe ingresar un numero"});
    }
    const data = await getProductsByID(+req.body.id);

    if(data.hasOwnProperty("error"))
    {
        res.status(500).json(data);
    } 
    else
    {
       if(data.length)
       {
           res.status(200).json(data)
       } 
       else
       {
           next();
       }
    }
}

module.exports = {listarAllProducts,listarProductoPorID}