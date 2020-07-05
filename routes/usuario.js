const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const authorization = require('./authorization');
const Router = express.Router();

const { Usuario, Log } = require('../sequelize');

Router.post("/login", (req, res) => {
    Usuario.findOne({
        where: {
            username: req.body.username
        }
    }).then(usuario => {
        if (usuario !== null) {
            bcrypt.compare(req.body.password, usuario.password)
                .then(estado => {
                    if (estado) {
                        let certificado = path.join(__dirname, 'certificado.pem');
                        let privateKey = fs.readFileSync(certificado, 'utf8');
                        let token = jwt.sign({
                            "body": {
                                "user": usuario.username
                            }
                        },
                            privateKey,
                            {
                                expiresIn: '1d',
                                algorithm: 'HS256'
                            });
                        res.send({
                            id: usuario.id,
                            user:usuario.username,
                            token
                        });
                    }
                    else {
                        res.status(400).send({
                            status: 400,
                            mensaje: 'Login incorrecto',
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
        }
        else {
            res.status(500).send('Acesso denegado')
        }
    }).catch(err => {
        res.status(500).send(err);
    })
});

Router.post('/', (req, res) => {
    let BCRYPT_SALT_ROUNDS = 12;
    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
            Usuario.create({
                username: req.body.username,
                password: hashedPassword
            }).then(usuario => {
                res.send(usuario.username);
            })
        })
        .catch(err => {
            res.status(500).send(err);
        });

});

//Lista todos los usuario
Router.get('/', authorization, (req, res) => {
    Usuario.findAll().then(usuario => {
        res.send(usuario);
    }).catch(err => {
        res.status(500).send(err);
    })
});

//Lista un usuario en especifico
Router.get('/:id', authorization, (req, res) => {
    let id = req.params.id;
    Usuario.findOne({ where: { id: id } }).then(usuario => {
        res.send(usuario);
    }).catch(err => {
        res.status(500).send(err);
    })
});

//Modifica contraseña
Router.put('/:id', authorization, (req, res) => {
    let id = req.params.id;
    let BCRYPT_SALT_ROUNDS = 12;
    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
            Usuario.findOne({ where: { id: id } }).then(usuario => {
                usuario.update({ username: req.body.username, password: hashedPassword }).then(persona => {
                    res.send(persona);
                }).catch(err => {
                    res.status(500).send(err);
                });
            }).catch(err => {
                res.status(500).send(err);
            });
        })
        .catch(error => {
            res.send(error);
        });
});

module.exports = Router;