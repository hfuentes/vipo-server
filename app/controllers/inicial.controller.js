const db = require('../models');
const Inicial = db.inicial;

exports.update = (req, res) => {
    const id = req.params.id;
    Inicial.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `No se puede actualizar id=${id}.`
            });
        } else res.send({ message: 'OK' });
    }).catch(err => {
        console.error(err);
        res.status(500).send({
            message: 'Ha ocurrido un error.'
        });
    });

};

exports.get = (_, res) => {
    return Inicial.find().then(data => {
        if (data && data.length > 0) {
            const first = data.shift();
            data.forEach(item => {
                Inicial.findByIdAndRemove(item.id).catch(err => {
                    console.error(`No se puede eliminar documento tipo 'Inicial' id=${item.id}.`);
                });
            });
            return new Promise((resolve, _) => resolve(first));
        } else {
            const inicial = new Inicial({
                slide1: '',
                slide2: '',
                slide3: '',
                slide4: '',
                video: '',
                email: '',
                admision: '',
                conocenos: '',
                plan: '',
                acreditacion: '',
                cna: '',
                facebook: '',
                twitter: '',
                instagram: '',
                youtube: '',
                linkedin: '',
                noticia1: null,
                noticia2: null,
                noticia3: null
            });
            return inicial.save(inicial);
        }
    }).then(data => {
        return res.send(data);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || 'Ha ocurrido un error.'
        });
    });
};

exports.publicGet = (_, res) => {
    return Inicial
        .find()
        .sort({ createdAt: -1 })
        .populate({ path: 'noticia1', select: 'titulo imagen' })
        .populate({ path: 'noticia2', select: 'titulo imagen' })
        .populate({ path: 'noticia3', select: 'titulo imagen' })
        .limit(1)
        .then(data => {
            if (data && data.length > 0) {
                let first = JSON.parse(JSON.stringify(data.shift()));
                first.noticia1.id = first.noticia1._id;
                delete first.noticia1._id;
                first.noticia2.id = first.noticia2._id;
                delete first.noticia2._id;
                first.noticia3.id = first.noticia3._id;
                delete first.noticia3._id;
                return res.send(first);
            }
            return res.status(500).send({
                message: 'No se han encontrado registros asociados a la consulta.'
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message || 'Ha ocurrido un error.'
            });
        });
};

exports.publicFooterGet = (_, res) => {
    return Inicial
        .find()
        .select('facebook twitter instagram youtube linkedin cna')
        .sort({ createdAt: -1 })
        .limit(1)
        .then(data => {
            if (data && data.length > 0) {
                const first = data.shift();
                return res.send(first);
            }
            return res.status(500).send({
                message: 'No se han encontrado registros asociados a la consulta.'
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message || 'Ha ocurrido un error.'
            });
        });
};