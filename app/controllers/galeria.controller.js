const db = require('../models');
const Galeria = db.galeria;

exports.create = (req, res) => {
    if (!req.body.imagen) return res.status(400).send({ message: 'Imagen no puede estar vacía.' });
    const galeria = new Galeria({
        imagen: req.body.imagen,
        texto: req.body.texto,
        publicado: req.body.publicado ? true : false
    });
    galeria.save(galeria).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
    });
};

exports.findAll = (_, res) => {
    Galeria.find()
        .select('-imagen')
        .sort({ publicado: -1 })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({ message: err.message || 'Ha ocurrido un error.' });
        });
};

exports.publicFindAll = (_, res) => {
    Galeria.find({ publicado: true })
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
    Galeria.findById(id).then(data => {
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
    if (!req.body.imagen) delete req.body.imagen;
    Galeria.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) res.status(404).send({ message: `No se puede actualizar id=${id}.` });
        else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({ message: 'Ha ocurrido un error.' });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Galeria.findByIdAndRemove(id).then(data => {
        if (!data) res.status(404).send({ message: `No se puede eliminar id=${id}.` });
        else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({ message: 'Ha ocurrido un error.' });
    });
};