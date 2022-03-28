const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = new Router();
const mysql = require('mysql');
const { json } = require('body-parser');

//FUNCIONA
// Conexión a base de datos
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_resto'
  })
  
  conn.connect((err) => {
    if (err) throw err;
    console.log("CONEXION ESTABLECIDA...");
  });


// De esta forma renderizo la pagina listaProductos pero sin los productos de la base de datos
// VIEWS
// router.get('/Productos',(req, res) => {
//        res.render('listaProductos');
// });

router.get('/',(req, res) => {
    res.render('home');
});

// router.get('/mostrarMesas',(req, res) => {
//   res.render('MostrarMesas');
// });

router.get('/estadistica',(req, res) => {
  res.render('estadisticas');
});


// SELECT 
router.get('/prueba', (req, res) => {
  let sqlCategoria = "SELECT * from categoriaproducto";
  let queryCategoria = conn.query(sqlCategoria, (errCat, resultsCategoria) => 
  {
    if(errCat) throw errCat;
      for(const cla in resultsCategoria)
      {
        let sql =`SELECT * from producto WHERE IdCategoriaProducto = ${resultsCategoria[cla].idCategoriaProducto}`
        let query = conn.query(sql,(err, resul)=>{
          if(err) throw err;

          console.log("La clave es "+resultsCategoria[cla].idCategoriaProducto + " : "+resultsCategoria[cla].NombreProducto);
          for(const prod in resul)
          {
            console.log("--------");
            console.log("Nombre: "+resul[prod].NombreProducto);
            console.log("Precio: "+resul[prod].Precio);
          }
        })
      }
      res.render('../views/prueba', {           
          resultsCategoria:resultsCategoria
      });
    
  });
});

// // SELECT 
router.get('/Productos', (req, res) => {
  let sqlCategoria = "SELECT * FROM categoriaproducto";
  let queryCategoria = conn.query(sqlCategoria, (errCat, resultsCategoria) => 
  { 
    if(errCat) throw errCat;        
      // let sql = "SELECT * FROM producto";
      let sql ="SELECT `idProducto`, `NombreProducto`, `DescripcionProducto`, `Precio`, estadoproducto.EstadoProducto, `PathImagenProducto`, `IdCategoriaProducto` FROM `producto` INNER JOIN estadoproducto on producto.EstadoProducto = estadoproducto.idEstadoProducto;"
      let query = conn.query(sql, (err, results) => {
      if (err) throw err;
      console.log(results); 
      res.render('../views/listaProductos', {
          results: results,
          resultsCategoria:resultsCategoria  
      });
    });
  });
});

// Insertar Producto 
router.post('/save', (req, res) => {
    // me imprime el req.body correctamente
    // console.log(req.body);
    let data = { NombreProducto: req.body.ProductoNombre, DescripcionProducto: req.body.ProductoDescripcion, EstadoProducto : req.body.ProductoEstado ,
       PathImagenProducto : req.body.ProductoPath, idCategoriaProducto : req.body.pc, Precio : req.body.ProductoPrecio 
       };
    let sql = "INSERT INTO producto SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('Productos');
    });
});


// Insertar Categoria Producto
router.post('/saveCategoria', (req, res) => {
  const btn =req.body.categoria;
  console.log(btn);
  let data = { NombreProducto: req.body.categoria
     };
  let sql = "INSERT INTO categoriaproducto SET ?";
  let query = conn.query(sql, data, (err, results) => {
      if (err) throw err;
      res.redirect('Productos');
  });
});

//UPDATE
router.post('/update', (req, res) => {
    let sql = "UPDATE producto SET NombreProducto='" + req.body.pn + "', Precio='" + req.body.precio +
    "', DescripcionProducto='" + req.body.pd +"', EstadoProducto='" + req.body.pe +"', PathImagenProducto='" + req.body.pp 
    +"', idCategoriaProducto='" + req.body.pc+ "' WHERE idProducto=" + req.body.idProducto;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('Productos');
    });
});

//CAMBIAR DE ESTADO
router.post('/mdf', (req, res) => {
  console.log("Los parametros son: "+req.params);

  let primerSql = "SELECT * from producto where producto.idProducto = "+req.body.idProducto;
  
  let primerQuery = conn.query(primerSql,(error,resultados)=>{    
    for(const cla in resultados)
    {    
      let estado = resultados[cla].EstadoProducto
      console.log(estado);
      if(estado==1)
      {
        console.log("entro al estado 1");
        let sql = "UPDATE producto SET EstadoProducto= 2 WHERE idProducto=" + req.body.idProducto;
        let query = conn.query(sql, (err, results) => {
          if (err) throw err;
          res.redirect('Productos');
      });
      }
      else if (estado==2)
      {
        console.log("entro al estado 2");
        let sql = "UPDATE producto SET EstadoProducto= 1 WHERE idProducto=" + req.body.idProducto;     
        let query = conn.query(sql, (err, results) => {
            if (err) throw err;
            res.redirect('Productos');
        });
      }
    }
  });  
});

// DELETE
router.post('/borrar', (req, res) => {
  console.log("ASDASDASD  ")
  console.log("El req body es: "+req.body.idProducto);  
    let sql = "DELETE FROM producto WHERE idProducto=" + req.body.idProducto + "";
    
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('Productos');
    });
}); 

// Cargar pagina de PEDIDOS
router.get('/Pedidos', (req, res) => {
    let sql = "SELECT * FROM `producto` WHERE EstadoProducto = 1";
    let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.render('../views/cargarPedido', {
        results: results
    });
  });
});

//prueba de obtener pedidos
// router.get('/Pedidos', (req, res) => {
//   let sql = "SELECT NombreProducto, cantidad  FROM producto p , operacion o, pedido pe  where p.idProducto=o.idProducto and idMesa = 1 and estado =0";
//   console.log(sql);
//   let query = conn.query(sql, (err, results) => {
//   if (err) throw err;
//   console.log(results);
//   res.render('../views/cargarPedido', {
//       results: results
//   });
// });
// });

  

// Insertar PEDIDO 
router.post('/savePedido', (req, res) => {
  let data = { NombreProducto: req.body.pn, DescripcionProducto: req.body.pd, EstadoProducto : req.body.pe , PathImagenProducto : req.body.pp,
    idCategoriaProducto : req.body.pc, Precio : req.body.precio 
     };
  let sql = "INSERT INTO producto SET ?";
  let query = conn.query(sql, data, (err, results) => {
      if (err) throw err;
      res.redirect('Productos');
  });
});

  // LLAMAR MOZO 
  router.post('/mozo', (req, res) => {    
    // let sql = "UPDATE mesas SET solicitudMozo='1' WHERE id_Mesa= "+req.params.id ;
    // console.log("El req body id : "+req.body.id_Mesa);
    console.log(req.params.id)
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('Pedidos');
    });
  });


// MOSTRAR MESAS

router.get('/mostrarMesas',(req, res) => {  
    res.render('MostrarMesas')
  });

router.get('/mostrarMesas/:id',(req, res) => {    
  let sql = "SELECT producto.NombreProducto, producto.Precio, operacion.Cantidad, TRUNCATE(operacion.Cantidad * producto.Precio,2) AS algo FROM operacion INNER JOIN pedido on operacion.IdPedido = pedido.idPedido INNER join producto on operacion.idProducto = producto.idProducto  where pedido.estado=0 and pedido.idMesa ="+req.params.id;
    let query=conn.query(sql,(err,results)=>{
        if(err) throw err;

    console.log(results.length);
    var suma=0;
    for(var i =0;i<results.length;i++)
    {
      suma=suma+results[i].algo;
    }
        res.render('MostrarMesas',{
          results:results,
          suma

        })
    })
  });

  router.post('/confirmarPedido', (req, res) => {    
    res.send("done");
  });
  
module.exports = router;