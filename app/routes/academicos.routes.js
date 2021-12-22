module.exports = app => {
    const ctr = require('../controllers/academicos.controller');
    const auth = require('../controllers/usuario.controller');
    var router = require('express').Router();
    router.post('/', auth.loginRequired, ctr.create);
    router.get('/', auth.loginRequired, ctr.findAll);
    router.get('/public', ctr.publicFindAll);
    router.get('/:id', ctr.findOne);
    router.put('/:id', auth.loginRequired, ctr.update);
    router.delete('/:id', auth.loginRequired, ctr.delete);
    app.use('/api/academicos', router);
};