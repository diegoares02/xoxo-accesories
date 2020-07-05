const express = require('express');
const Router = express.Router();
const authorization = require('./authorization');
const { Op } = require("sequelize");
const uniqueRandom = require('unique-random');
const random = uniqueRandom(1, 9999);

const { Articulo, Usuario } = require('../sequelize');
Router.get('/', (req, res) => {
    Articulo.findAll({
        where: {
            cantidad: {
                [Op.gt]: 0
            }
        }
    })
        .then(personas => {
            res.send(personas);
        });
});

Router.get('/:id', authorization, (req, res) => {
    let id = req.params.id;
    Articulo.findOne({ where: { id: id } })
        .then(persona => {
            res.send(persona);
        })
});

Router.post('/', authorization, (req, res) => {
    Usuario.findOne({ where: { id: req.body.usuarioId } })
        .then(persona => {
            if (persona !== null) {
                Articulo.create({
                    codigo: req.body.codigo,
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    precio: req.body.precio,
                    cantidad: req.body.cantidad,
                    imagen: req.body.imagen,
                    categoriumId: req.body.categoriumId,
                    usuarioId: req.body.usuarioId
                }).then(persona => {
                    res.send(persona);
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
            else {
                res.send('Articulo no encontrado');
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

Router.put('/:id', authorization, (req, res) => {
    let id = req.params.id;
    let datos = req.body;
    Usuario.findOne({ where: { id: req.body.usuarioId } })
        .then(persona => {
            if (persona !== null) {
                Articulo.findOne({ where: { id: id } })
                    .then(persona => {
                        persona.update(datos)
                            .then(persona => {
                                res.send(persona);
                            })
                    });
            }
            else {
                res.send('Articulo no encontrado');
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

Router.delete('/:id', authorization, (req, res) => {
    let id = req.params.id;
    Articulo.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.send('Articulo eliminado ' + id);
    });
});

module.exports = Router;
