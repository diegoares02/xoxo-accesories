const express = require('express');
const Router = express.Router();

const { Log } = require('../sequelize');
Router.get('/', (req, res) => {
    Log.findAll()
        .then(personas => {
            res.send(personas);
        });
});

Router.get('/:id', (req, res) => {
    let id = req.params.id;
    Log.findOne({ where: { id: id } })
        .then(persona => {
            res.send(persona);
        })
});

Router.post('/', (req, res) => {
    Log.create({
        dispositivo: req.body.dispositivo,
        IP: req.body.dispositivo,
    }).then(persona => {
        res.send(persona);
    })
});


module.exports = Router;