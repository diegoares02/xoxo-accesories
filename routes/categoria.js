const express = require('express');
const Router = express.Router();
const authorization = require('./authorization');

const { Categoria, Usuario } = require('../sequelize');

Router.get('/', (req, res) => {
    Categoria.findAll()
        .then(personas => {
            res.send(personas);
        });
});

Router.get('/:id', authorization, (req, res) => {
    let id = req.params.id;
    Categoria.findOne({ where: { id: id } })
        .then(persona => {
            res.send(persona);
        })
});

Router.post('/', authorization, (req, res) => {
    let id = req.body.usuarioId;
    Usuario.findOne({ where: { id: req.body.usuarioId } })
        .then(persona => {
            if (persona !== null) {
                Categoria.create({
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    estado: req.body.estado,
                    usuarioId: req.body.usuarioId
                }).then(persona => {
                    res.send(persona);
                })
            }
            else {
                res.send('Usuario no encontrado');
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
                Categoria.findOne({ where: { id: id } })
                    .then(persona => {
                        persona.update(datos)
                            .then(persona => {
                                res.send(persona);
                            })
                    });
            }
            else {
                res.send('Usuario no encontrado');
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

Router.delete('/:id', authorization, (req, res) => {
    let id = req.params.id;
    Categoria.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.send('Categoria eliminada ' + id);
    });
});

module.exports = Router;