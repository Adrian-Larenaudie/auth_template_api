const writeLog = require('../logs/writter.js');

/* Catch forbidden error on csrf token to avoid sending default message witch is contain too much informations */
const csrfCatcher = async (error, request, response, next) => {
    if (error.code === 'EBADCSRFTOKEN') {
        writeLog({logLvl: "info", file: "server.js", message: `Forbidden error -> ${error}`});
        return response.status(403).json({ message: `Forbidden ressource` });
    }
    next(error);
};

module.exports = csrfCatcher;