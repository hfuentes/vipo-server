const secret = require('../config/jwt.config').secret;
const jsonwebtoken = require("jsonwebtoken");

module.exports = app => {
    app.use((req, _, next) => {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            jsonwebtoken.verify(req.headers.authorization.split(' ')[1], secret, (err, decode) => {
                if (err) req.user = undefined;
                req.user = decode;
                next();
            });
        } else {
            req.user = undefined;
            next();
        }
    });
};