const db = require('../models');
const Estudiante = db.estudiante;

exports.create = (req, res) => {
    if (!req.body.nombre) return res.status(400).send({ message: 'Nombre no puede estar vacío.' });
    const estudiante = new Estudiante({
        nombre: req.body.nombre,
        egreso: req.body.egreso,
        publicado: req.body.publicado ? true : false
    });
    estudiante.save(estudiante).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
    });
};

exports.findAll = (_, res) => {
    Estudiante.find()
        .sort({ publicado: -1, egreso: -1 })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
        });
};

exports.publicFindAll = (_, res) => {
    Estudiante.find({ publicado: true })
        .sort({ egreso: -1 })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).send({ message: 'Id no puede estar vacío.' });
    Estudiante.findById(id).then(data => {
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
    Estudiante.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) res.status(404).send({ message: `No se puede actualizar id=${id}.` });
        else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({ message: 'Ha ocurrido un error.' });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Estudiante.findByIdAndRemove(id).then(data => {
        if (!data) res.status(404).send({ message: `No se puede eliminar id=${id}.` });
        else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({ message: 'Ha ocurrido un error.' });
    });
};