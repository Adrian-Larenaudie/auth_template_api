const writeLog = require('../logs/writter.js');

const csrfCatcher = async (request, response, next) => {
    const csrfCookie = request.cookies['X-CSRF-Token'];
    const csrfSession = request.session.csrfSecret;
    if ((csrfCookie !== csrfSession || !csrfCookie) && request.url !== "/api/csrf-token") {
        writeLog({logLvl: "info", file: "csrfCatcher.js", message: `Forbidden error`});
        return response.status(403).json({ message: `Forbidden ressource` });
    }
    next();
};

module.exports = csrfCatcher;