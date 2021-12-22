
const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.noticia = require('./noticia.model.js')(mongoose);
db.admision = require('./admision.model.js')(mongoose);
db.inicial = require('./inicial.model.js')(mongoose);
db.academico = require('./academico.model.js')(mongoose);
db.estudiante = require('./estudiante.model.js')(mongoose);
db.tesis = require('./tesis.model.js')(mongoose);
db.programa = require('./programa.model.js')(mongoose);
db.usuario = require('./usuario.model.js')(mongoose);

module.exports = db;