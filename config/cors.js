const cors = require('cors');

const corsConfig = cors({

    origin: "http://localhost:8081",

    credentials: true,

    methods: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE'
    ],

    allowedHeaders: `
        Access-Control-Allow-Origin, 
        Access-Control-Allow-Credentials, 
        X-CSRF-Token, Origin, 
        X-Requested-With,
        x-access-token, 
        role, 
        Content, 
        Accept,
        Content-Type, 
        Authorization
    `,
});

module.exports = corsConfig;
