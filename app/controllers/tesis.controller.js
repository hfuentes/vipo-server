const db = require('../models');
const Tesis = db.tesis;

exports.create = (req, res) => {
    if (!req.body.titulo) return res.status(400).send({ message: 'Título no puede estar vacío.' });
    const tesis = new Tesis({
        titulo: req.body.titulo,
        autor: req.body.autor,
        publicacion: req.body.publicacion,
        publicado: req.body.publicado ? true : false
    });
    tesis.save(tesis).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
    });
};

exports.findAll = (_, res) => {
    Tesis.find()
        .sort({ publicado: -1, publicacion: -1 })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
        });
};

exports.publicFindAll = (_, res) => {
    Tesis.find({ publicado: true })
        .sort({ publicacion: -1 })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).send({ message: 'Id no puede estar vacío.' });
    Tesis.findById(id).then(data => {
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
    Tesis.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) res.status(404).send({ message: `No se puede actualizar id=${id}.` });
        else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({ message: 'Ha ocurrido un error.' });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Tesis.findByIdAndRemove(id).then(data => {
        if (!data) res.status(404).send({ message: `No se puede eliminar id=${id}.` });
        else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({ message: 'Ha ocurrido un error.' });
    });
};