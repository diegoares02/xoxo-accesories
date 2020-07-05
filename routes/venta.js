const express = require('express');
const Router = express.Router();
const authorization = require('./authorization');

const { Venta, Articulo } = require('../sequelize');
Router.get('/', authorization, (req, res) => {
    Venta.findAll()
        .then(personas => {
            res.send(personas);
        });
});

Router.get('/:id', authorization, (req, res) => {
    let id = req.params.id;
    Venta.findOne({ where: { id: id } })
        .then(persona => {
            res.send(persona);
        })
});

Router.post('/', authorization, (req, res) => {
    Articulo.findOne({ where: { id: req.body.articuloId } })
        .then(articulo => {
            if (articulo !== null && articulo.cantidad > 0 && articulo.cantidad >= req.body.cantidad) {
                const stock = articulo.cantidad - req.body.cantidad;
                Venta.create({
                    cantidad: req.body.cantidad,
                    articuloId: req.body.articuloId
                }).then(venta => {
                    res.send(venta);
                });
                articulo.update({
                    codigo: articulo.codigo,
                    nombre: articulo.nombre,
                    descripcion: articulo.descripcion,
                    precio: articulo.precio,
                    cantidad: stock,
                    imagen: articulo.imagen,
                    categoriumId: articulo.categoriumId,
                    usuarioId: articulo.usuarioId
                }).then(stock => {
                }).catch(err => {
                    res.status(500).send(err);
                })
            }
            else {
                res.send('Verifique si el articulo existe o no tiene stock disponible');
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


module.exports = Router;