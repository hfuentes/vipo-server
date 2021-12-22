module.exports = app => {
    const ctr = require('../controllers/usuario.controller');
    var router = require('express').Router();
    // router.post('/register', ctr.register);
    router.post('/sing_in', ctr.signIn);
    router.post('/profile', ctr.loginRequired, ctr.profile);
    app.use('/api/auth', router);
};