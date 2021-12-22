module.exports = app => {
    const ctr = require('../controllers/inicial.controller');
    const auth = require('../controllers/usuario.controller');
    var router = require('express').Router();
    router.put('/:id', auth.loginRequired, ctr.update);
    router.get('/', auth.loginRequired, ctr.get);
    router.get('/public', ctr.publicGet);
    router.get('/footer/public', ctr.publicFooterGet);
    app.use('/api/inicial', router);
};