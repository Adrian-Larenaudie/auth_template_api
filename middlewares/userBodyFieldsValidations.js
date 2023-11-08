const jwt = require('jsonwebtoken');
const fs = require('fs').promises;

const userBodyFieldsValidations = async (request, response, next) => {
    // TODO METTRE NE PLACE LA VALIDATION DES DONNEES DU FORMULAIRE
    next();
    
};

module.exports = userBodyFieldsValidations;