const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const uuid = require('uuid');

exports.login = async (request, response) => {
    try {
        const { email, password } = request.body;
        if(!email ||!password) {
            return response.status(400).json({ message: "Bad request" });
        }
        const user = await User.findOne({ email: email });
        if(!user) {
            return response.status(401).json({ message: `Unauthorized` });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return response.status(401).json({ message: `Unauthorized` });
        }
        // session token part
        const sessionToken = uuid.v4();
        user.sessionToken = sessionToken;
        await user.save();
        // JWT part 
        const privateKey = await fs.readFile('./keys/private-key.pem', 'utf8');
        const token = jwt.sign({ username: user.username, role: user.role }, privateKey, { algorithm: 'RS256', expiresIn: '2h' });
        return response.status(200).json({ token: token, sessionToken: sessionToken });
    } catch(error) {
        return response.status(500).json({ message: `Server error` });
    }
};

exports.refreshLogin = async (request, response) => {
    try {
        const { username, sessionToken } = request.body;
        if(!username || !sessionToken) {
            return response.status(400).json({ message: "Bad request" }); 
        }
        const user = await User.findOne({ username: username, sessionToken: sessionToken });
        if(!user) {
            return response.status(401).json({ message: `Unauthorized` });
        }
        // new session token part
        const newSessionToken = uuid.v4();
        user.sessionToken = newSessionToken;
        await user.save();
        // new JWT part 
        const privateKey = await fs.readFile('./keys/private-key.pem', 'utf8');
        const tokenJwt = jwt.sign({ username: user.username, role: user.role }, privateKey, { algorithm: 'RS256', expiresIn: '2h' });
        return response.status(200).json({ token: tokenJwt, sessionToken: newSessionToken });
    } catch (error) {
        return response.status(500).json({ message: `Server error` });
    }

};