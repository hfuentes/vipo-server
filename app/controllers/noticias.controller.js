const db = require('../models');
const Noticia = db.noticia;

exports.create = (req, res) => {
    if (!req.body.titulo) {
        res.status(400).send({ message: 'Título no puede estar vacío.' });
        return;
    }

    console.log(req.body.imagen);

    const noticia = new Noticia({
        titulo: req.body.titulo,
        bajada: req.body.bajada,
        imagen: req.body.imagen,
        cuerpo: req.body.cuerpo
    });

    noticia.save(noticia).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ha ocurrido un error.'
        });
    });
};

exports.findAll = (req, res) => {
    Noticia.find(req, { imagen: 0 }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ha ocurrido un error.'
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ message: 'Id no puede estar vacío.' });
        return;
    }
    Noticia.findById(id).then(data => {
        if (data) res.send(data);
        else res.send({});
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ha ocurrido un error.'
        });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Los datos no pueden estar vacíos.'
        });
    }
    const id = req.params.id;
    const imagen = req.params.imagen;
    if (imagen === undefined || imagen === null || imagen === '') {
        delete req.params.imagen;
    }
    Noticia.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `No se puede actualizar id=${id}.`
            });
        } else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({
            message: 'Ha ocurrido un error.'
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Noticia.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `No se puede eliminar id=${id}.`
            });
        } else {
            res.send({
                message: 'OK'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: 'Ha ocurrido un error.'
        });
    });
};