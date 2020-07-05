const Sequelize = require('sequelize');
const usuario = require('./models/Usuario');
const categoria = require('./models/Categoria');
const articulo = require('./models/Articulo');
const visita = require('./models/Visita');
const log = require('./models/Log');
const venta = require('./models/Venta');

const credencial = require('./Keys/credencial');

const sequelize = new Sequelize(credencial.BaseDatos,
    credencial.Usuario,
    credencial.Contraseña, {
    host: credencial.Servidor,
    dialect: 'mysql',
});

const Usuario = usuario(sequelize, Sequelize);
const Categoria = categoria(sequelize, Sequelize);
const Articulo = articulo(sequelize, Sequelize);
const Visita = visita(sequelize, Sequelize);
const Log = log(sequelize, Sequelize);
const Venta = venta(sequelize, Sequelize);

//Crea asociacion uno a muchos entre tabla Usuario y Articulos
Categoria.hasMany(Articulo);
Usuario.hasMany(Articulo);
Usuario.hasMany(Categoria);
Articulo.hasMany(Visita);
Articulo.hasMany(Venta);
Usuario.hasMany(Log);

sequelize.sync().then(() => {
    console.log('Tablas creadas');
}).error((err) => {
    console.log(err);
})

module.exports = { Usuario, Categoria, Articulo, Visita, Log, Venta };