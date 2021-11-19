const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const app = express();
const db = require('./app/models');

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/status', (req, res) => {
    res.json({ message: 'ONLINE' });
});

require('./app/routes/noticias.routes')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database!');
}).catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});