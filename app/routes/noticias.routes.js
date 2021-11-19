module.exports = app => {
    const ctr = require('../controllers/noticias.controller');
    var router = require('express').Router();
    router.post('/', ctr.create);
    router.get('/', ctr.findAll);
    router.get('/:id', ctr.findOne);
    router.put('/:id', ctr.update);
    router.delete('/:id', ctr.delete);
    app.use('/api/noticias', router);
};