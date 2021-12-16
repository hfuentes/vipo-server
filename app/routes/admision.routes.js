module.exports = app => {
    const ctr = require('../controllers/admision.controller');
    var router = require('express').Router();
    router.put('/:id', ctr.update);
    router.get('/', ctr.get);
    app.use('/api/admision', router);
};