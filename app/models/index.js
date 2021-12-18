
const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.noticia = require('./noticia.model.js')(mongoose);
db.admision = require('./admision.model.js')(mongoose);
db.inicial = require('./inicial.model.js')(mongoose);

module.exports = db;