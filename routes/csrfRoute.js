const csrf = require("csrf");
const express = require("express");
const router = express.Router();
const writeLog = require('../logs/writter.js');

router.get('/csrf-token', (request, response) => {
    const tokens = new csrf();
    const csrfToken = tokens.create(process.env.SECRET_SESSION_KEY);
    writeLog({logLvl: "info", file: "server.js", message: `csrf-token endpoint launch`});
    request.session.csrfSecret = csrfToken;
    response
        .status(200)
        .cookie('X-CSRF-Token', csrfToken, { httpOnly: true, sameSite: "Strict" })
        .json({ message: `csrf-token cookie on http only generated` });
});

module.exports = router;