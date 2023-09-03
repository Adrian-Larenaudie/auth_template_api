const jwt = require('jsonwebtoken');
const fs = require('fs').promises;

const accessControlAdmin = async (request, response, next) => {
    try {
        const token = request.headers.authorization;
        const publicKey = await fs.readFile('./keys/public-key.pem', 'utf8');
        const decodedToken = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        if(!token || !decodedToken || decodedToken.role !== "admin") {
            return response.status(401).json({ message: `Unauthorized` });
        }
        next();
    } catch (error) {
        if(error.name === "JsonWebTokenError") {
            return response.status(401).json({ message: `Unauthorized` });
        }
        return response.status(500).json({ message: `Server error` });
    }
};

module.exports = accessControlAdmin;