const express = require("express")
const path = require('path');
require("dotenv").config()
const hbs = require('hbs');
const port = process.env.port || 3030
require("./db/config")

const server = express()
server.use(express.json())

//CONTENIDO ESTATICO
server.use(express.static('public'))
const string =__dirname+'/views/partials/';
//HANDLEBARS
server.set('view engine','hbs')
// hbs.registerPartials(__dirname + '/views/partials/')
console.log(string);
hbs.registerPartials(string);


server.get("/", (req, res) => {    
    res.render('home')
});

//Users router
server.use("/users", require("./users/usersRoute"))

//Productos router
server.use("/productos",require("./Productos/productosRoutes"));



//server.use("/cargarPedido",require("./CargarPedido/cargarPedidoRoute"));





//404
server.use((req, res) => {
    res.status(404).json({ message: "Resource not found" })
})

server.listen(port, (err) => {
    err ? console.log(`Error: ${err}`) : console.log(`Servidor en http://localhost:${port}`)
})