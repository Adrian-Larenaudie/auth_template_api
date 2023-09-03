const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const { connectToDatabase, closeDatabaseConnection } = require("../dataBase/connexion.db.js");
const User = require("../models/user.js");
const bcrypt = require('bcrypt');

exports.login = async (request, response) => {
    try {
        const { email, password } = request.body;
        if(!email ||!password) {
            return response.status(400).json({ message: "Bad request" });
        }
        await connectToDatabase();
        const user = await User.findOne({ email: email });
        if(!user) {
            return response.status(401).json({ message: `Unauthorized` });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return response.status(401).json({ message: `Unauthorized` });
        }

        await closeDatabaseConnection();
        // JWT part 
        const privateKey = await fs.readFile('./keys/private-key.pem', 'utf8');
        const token = jwt.sign({ username: user.username, role: user.role }, privateKey, { algorithm: 'RS256', expiresIn: '2h' });
        return response.status(200).json({ token: token });
    } catch(error) {
        return response.status(500).json({ message: `Server error` });
    }
};

// TODO
exports.refreshLogin = async (request, response) => {

};