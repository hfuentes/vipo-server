const db = require('../models');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
const bcrypt = require('bcrypt');

const secret = jwtConfig.secret;
const salt = jwtConfig.salt;
const Usuario = db.usuario;

exports.signIn = (req, res) => {
    return Usuario.findOne({ nombre: req.body.nombre, activo: true }).then(usuario => {
        if (!usuario) {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña no son válidos.' });
        }
        usuario.comparePassword(req.body.password).then(passOK => {
            if (passOK) {
                return res.json({
                    token: jwt.sign({
                        nombre: usuario.nombre,
                        id: usuario.id,
                        esAdmin: usuario.esAdmin
                    }, secret),
                    profile: {
                        nombre: usuario.nombre,
                        esAdmin: usuario.esAdmin,
                        id: usuario.id,
                        activo: usuario.activo,
                        createdAt: usuario.createdAt,
                        updatedAt: usuario.updatedAt
                    }
                });
            } else {
                return res.status(401).json({ message: 'Nombre de usuario o contraseña no son válidos.' });
            }
        }).catch(err => {
            console.error(err);
            return res.status(401).json({ message: 'Nombre de usuario o contraseña no son válidos.' });
        });
    }).catch(err => {
        return res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
    });
};

exports.create = (req, res) => {
    var usuario = new Usuario({
        nombre: req.body.nombre,
        activo: req.body.activo,
        esAdmin: req.body.esAdmin
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

exports.adminRequired = (req, res, next) => {
    if (req.user && req.user.esAdmin === true) next();
    else return res.status(401).json({ message: 'Usuario no autorizado.' });
}

exports.profile = (req, res, next) => {
    if (req.user) {
        res.send(req.user);
        next();
    } else {
        return res.status(401).json({ message: 'Usuario no autorizado.' });
    }
};

exports.findAll = (_, res) => {
    Usuario.find()
        .sort({ activo: -1, nombre: -1 })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
        });
};

exports.update = (req, res) => {
    if (!req.body) return res.status(400).send({ message: 'Los datos no pueden estar vacíos.' });
    const id = req.params.id;
    if (req.body.password) {
        req.body.hash_password = bcrypt.hashSync(req.body.password, salt);
        delete req.body.password;
    }
    Usuario.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) res.status(404).send({ message: `No se puede actualizar id=${id}.` });
        else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({ message: 'Ha ocurrido un error.' });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).send({ message: 'Id no puede estar vacío.' });
    Usuario.findById(id).then(data => {
        if (data) res.send(data);
        else res.send({});
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ha ocurrido un error.'
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Usuario.findByIdAndRemove(id).then(data => {
        if (!data) res.status(404).send({ message: `No se puede eliminar id=${id}.` });
        else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({ message: 'Ha ocurrido un error.' });
    });
};