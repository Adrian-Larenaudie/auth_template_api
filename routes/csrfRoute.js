const csurf = require("csurf");
const express = require("express");
const router = express.Router();
const writeLog = require('../logs/writter.js');
const csrfProtection = csurf({ cookie: true });

router.get('/csrf-token', csrfProtection, (request, response) => {
    writeLog({logLvl: "info", file: "server.js", message: `csrf-token endpoint launch`});
    response
        .status(200)
        .cookie('X-CSRF-Token', request.csrfToken(), { httpOnly: true })
        .json({ message: `csrf-token cookie on http only generated` });
});

module.exports = router;