module.exports = app => {
    const ctr = require('../controllers/inicial.controller');
    var router = require('express').Router();
    router.put('/:id', ctr.update);
    router.get('/', ctr.get);
    router.get('/public', ctr.publicGet);
    router.get('/footer/public', ctr.publicFooterGet);
    app.use('/api/inicial', router);
};