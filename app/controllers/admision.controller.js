const db = require('../models');
const Admision = db.admision;

exports.update = (req, res) => {
    const id = req.params.id;
    Admision.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
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

exports.get = (req, res) => {
    return Admision.find().then(data => {
        if (data && data.length > 0) {
            const first = data.shift();
            data.forEach(item => {
                Admision.findByIdAndRemove(item.id).catch(err => {
                    console.error(`No se puede Admision eliminar id=${item.id}.`);
                });
            });
            return new Promise((resolve, _) => resolve(first));
        } else {
            const admision = new Admision({ fechas: '', requisitos: '', becas: '', postula: '' });
            return admision.save(admision);
        }
    }).then(data => {
        return res.send(data);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || 'Ha ocurrido un error.'
        });
    });
};