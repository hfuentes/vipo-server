const express = require('express');
const displayRoutes = require('express-routemap');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const app = express();
const db = require('./app/models');
const bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
require('./app/services/logger.service')(app);

// rutas
let status = 'OFFLINE';
app.get('/api/status', (_, res) => res.json({ server: 'ONLINE', database: status }));
require('./app/routes/noticias.routes')(app);
require('./app/routes/admision.routes')(app);
require('./app/routes/inicial.routes')(app);
require('./app/routes/academicos.routes')(app);
require('./app/routes/estudiantes.routes')(app);
require('./app/routes/tesis.routes')(app);
require('./app/routes/programa.routes')(app);

// run
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    displayRoutes(app);
});

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database!');
    status = 'ONLINE';
}).catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});