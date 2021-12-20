module.exports = app => {
    const ctr = require('../controllers/tesis.controller');
    var router = require('express').Router();
    router.post('/', ctr.create);
    router.get('/', ctr.findAll);
    router.get('/public', ctr.publicFindAll); // metodo publico
    router.get('/:id', ctr.findOne);
    router.put('/:id', ctr.update);
    router.delete('/:id', ctr.delete);
    app.use('/api/tesis', router);
};