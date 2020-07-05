const express = require('express');
const bodyParser = require('body-parser');
//const multer = require('multer');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuario');
const categoriaRoutes = require('./routes/categoria');
const articuloRoutes = require('./routes/articulo');
const visitaRoutes = require('./routes/visita');
const logRoutes = require('./routes/log');
const ventaRoutes = require('./routes/venta');

const port = process.env.PORT || 5000;

//Configuracion del puerto de escucha
var app = express();
const ruta = path.join(__dirname, 'public');
// var StorageMulter = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, path.join(ruta, 'imagenes'));
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.originalname);
//     }
// });

// app.use(multer({
//     storage: StorageMulter
// }).single('imagen'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static(ruta));

//API
app.use("/api/usuario",usuarioRoutes);
app.use("/api/categoria",categoriaRoutes);
app.use("/api/articulo",articuloRoutes);
app.use("/api/visita",visitaRoutes);
app.use("/api/log",logRoutes);
app.use("/api/venta",ventaRoutes);

//Ejecucion en el puerto de escucha
app.listen(port);
console.log('Listening on port ' + port);