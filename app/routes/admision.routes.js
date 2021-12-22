module.exports = app => {
    const ctr = require('../controllers/admision.controller');
    const auth = require('../controllers/usuario.controller');
    var router = require('express').Router();
    router.put('/:id', auth.loginRequired, ctr.update);
    router.get('/', ctr.get);
    app.use('/api/admision', router);
};