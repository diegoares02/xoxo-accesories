const express = require('express');
const Router = express.Router();
const uuidv4 = require("uuid/v4");
const authorization = require('./authorization');

const { Visita, Categoria} = require('../sequelize');
Router.get('/',authorization, (req, res) => {
    Visita.findAll()
        .then(personas => {
            res.send(personas);
        });
});

Router.get('/:id',authorization, (req, res) => {
    let id = req.params.id;
    Visita.findOne({ where: { id: id } })
        .then(persona => {
            res.send(persona);
        })
});

Router.post('/',authorization, (req, res) => {
    Articulo.findOne({where:{id:req.body.articuloId}})
    .then(articulo=>{
        if (articulo!==null) {
            Visita.create({
                articuloId: req.body.articuloId,
                codigo: uuidv4()
            }).then(persona => {
                res.send(persona);
            })
        }
        else{
            res.send('Articulo no encontrado');
        }
    });    
});

//No se utilizara
Router.put('/:id',authorization, (req, res) => {
    let id = req.params.id;
    let datos = req.body;
    Visita.findOne({ where: { id: id } })
        .then(persona => {
            persona.update(datos)
                .then(persona => {
                    res.send(persona);
                })
        });

});

module.exports = Router;