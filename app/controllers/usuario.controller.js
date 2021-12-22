const db = require('../models');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const bcrypt = require('bcrypt');

const secret = jwtConfig.secret;
const salt = jwtConfig.salt;
const Usuario = db.usuario;

exports.signIn = (req, res) => {
    return Usuario.findOne({ nombre: req.body.nombre }).then(usuario => {
        if (!usuario || !usuario.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña no son válidos.' });
        }
        return res.json({ token: jwt.sign({ nombre: usuario.nombre, id: usuario.id }, secret) });
    }).catch(err => {
        return res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
    });
};

exports.register = (req, res) => {
    if (jwtConfig.register !== req.body.secret) {
        return res.status(500).send({ message: 'Ha ocurrido un error.' });
    }
    var usuario = new Usuario({
        nombre: req.body.nombre
    });
    usuario.hash_password = bcrypt.hashSync(req.body.password, salt);
    return usuario.save(usuario).then(usuario => {
        usuario.hash_password = undefined;
        return res.json(usuario);
    }).catch(err => {
        return res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
    });
};

exports.loginRequired = (req, res, next) => {
    if (req.user) next();
    else return res.status(401).json({ message: 'Usuario no autorizado.' });
};

exports.profile = (req, res, next) => {
    if (req.user) {
        res.send(req.user);
        next();
    } else {
        return res.status(401).json({ message: 'Usuario no autorizado.' });
    }
};