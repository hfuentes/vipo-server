module.exports = app => {
    const ctr = require('../controllers/usuario.controller');
    const auth = require('../controllers/usuario.controller');
    var router = require('express').Router();
    router.post('/sing_in', ctr.signIn);
    router.get('/profile', ctr.loginRequired, ctr.profile);
    // metodos admin
    router.post('/', auth.adminRequired, ctr.create);
    router.get('/', auth.adminRequired, ctr.findAll);
    router.get('/:id', auth.adminRequired, ctr.findOne);
    router.put('/:id', auth.adminRequired, ctr.update);
    router.delete('/:id', auth.adminRequired, ctr.delete);
    app.use('/api/auth', router);
};