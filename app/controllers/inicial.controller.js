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
                facebook: '',
                twitter: '',
                instagram: '',
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