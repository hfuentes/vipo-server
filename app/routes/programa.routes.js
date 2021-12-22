module.exports = app => {
    const ctr = require('../controllers/programa.controller');
    var router = require('express').Router();
    router.put('/:id', ctr.update);
    router.get('/', ctr.get);
    app.use('/api/programa', router);
};