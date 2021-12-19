const db = require('../models');
const Academico = db.academico;

exports.create = (req, res) => {
    if (!req.body.nombre) return res.status(400).send({ message: 'Nombre no puede estar vacío.' });
    const academico = new Academico({
        imagen: req.body.imagen,
        nombre: req.body.nombre,
        correo: req.body.correo,
        cargo: req.body.cargo,
        resumen: req.body.resumen,
        publicaciones: req.body.publicaciones,
        proyectos: req.body.proyectos,
        publicado: req.body.publicado ? true : false
    });
    academico.save(academico).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
    });
};

exports.findAll = (req, res) => {
    Academico.find(req, { imagen: 0 })
        .sort({ updatedAt: -1, publicado: 1 })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
        });
};

exports.publicFindAll = (_, res) => {
    Academico.find({ publicado: true })
        .sort({ updatedAt: -1 })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).send({ message: 'Id no puede estar vacío.' });
    Academico.findById(id).then(data => {
        if (data) res.send(data);
        else res.send({});
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ha ocurrido un error.'
        });
    });
};

exports.update = (req, res) => {
    if (!req.body) return res.status(400).send({ message: 'Los datos no pueden estar vacíos.' });
    const id = req.params.id;
    Academico.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) res.status(404).send({ message: `No se puede actualizar id=${id}.` });
        else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({ message: 'Ha ocurrido un error.' });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Academico.findByIdAndRemove(id).then(data => {
        if (!data) res.status(404).send({ message: `No se puede eliminar id=${id}.` });
        else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({ message: 'Ha ocurrido un error.' });
    });
};