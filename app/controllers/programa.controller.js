const db = require('../models');
const Programa = db.programa;

exports.update = (req, res) => {
    const id = req.params.id;
    Programa.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `No se puede actualizar id=${id}.`
            });
        } else res.send({ message: 'OK' });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ha ocurrido un error.'
        });
    });

};

exports.get = (_, res) => {
    return Programa.find().then(data => {
        if (data && data.length > 0) {
            const first = data.shift();
            data.forEach(item => {
                Programa.findByIdAndRemove(item.id).catch(err => {
                    console.error(`No se puede eliminar documento tipo 'Admision' id=${item.id}.`);
                });
            });
            return new Promise((resolve, _) => resolve(first));
        } else {
            const programa = new Programa({
                descripcion: '',
                objetivos: '',
                dirigido: '',
                plan: '',
                acreditacion: '',
                investigacion: '',
                correo: '',
                telefono: '',
                url: '',
                jornada: '',
                modalidad: '',
                caracter: '',
                dedicacion: '',
                ahno: '',
                postulaciones: '',
                clases: '',
                valor: '',
                subvalor: '',
                pago: ''
            });
            return programa.save(programa);
        }
    }).then(data => {
        return res.send(data);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || 'Ha ocurrido un error.'
        });
    });
};