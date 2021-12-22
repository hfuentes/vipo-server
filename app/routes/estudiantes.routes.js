module.exports = app => {
    const ctr = require('../controllers/estudiantes.controller');
    const auth = require('../controllers/usuario.controller');
    var router = require('express').Router();
    router.post('/', auth.loginRequired, ctr.create);
    router.get('/', auth.loginRequired, ctr.findAll);
    router.get('/public', ctr.publicFindAll); // metodo publico
    router.get('/:id', auth.loginRequired, ctr.findOne);
    router.put('/:id', auth.loginRequired, ctr.update);
    router.delete('/:id', auth.loginRequired, ctr.delete);
    app.use('/api/estudiantes', router);
};