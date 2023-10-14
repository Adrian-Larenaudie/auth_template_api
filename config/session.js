const session = require('express-session');

const sessionConfig = session({
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: true,
});

module.exports = sessionConfig;
