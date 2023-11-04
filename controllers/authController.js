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
        const sessionToken = {
            date: Date.now(),
            value: uuid.v4(),
        }
        user.sessionTokens.push(sessionToken);
        await user.save();
        // JWT part 
        const privateKey = await fs.readFile('./keys/private-key.pem', 'utf8');
        const token = jwt.sign({ username: user.username, role: user.role }, privateKey, { algorithm: 'RS256', expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME });
        return response.status(200).json({ token: token, sessionToken: sessionToken.value });
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
        
        const user = await User.findOne({ username: username });
        if(!user) {
            return response.status(401).json({ message: `Unauthorized` });
        }

        for (let index = 0; index < user.sessionTokens.length; index++) {

            const isSameSessionToken = user.sessionTokens[index].value === sessionToken;
            const isSessionTokenNotExpired = Date.now() - user.sessionTokens[index].date < process.env.JWT_TOKEN_EXPIRATION_TIME;
            
            if (isSessionTokenNotExpired && isSameSessionToken) {
                console.log("coucou1");
                // delete session token 
                user.sessionTokens.splice(index, 1);
                await user.save();
                // create new session token part
                const newSessionToken = {
                    date: Date.now(),
                    value: uuid.v4(),
                }
                user.sessionTokens.push(newSessionToken);
                await user.save();

                // new JWT part
                const privateKey = await fs.readFile('./keys/private-key.pem', 'utf8');
                const tokenJwt = jwt.sign({ username: user.username, role: user.role }, privateKey, { algorithm: 'RS256', expiresIn: process.env.SESSION_TOKEN_EXPIRATION_TIME });
                return response.status(200).json({ token: tokenJwt, sessionToken: newSessionToken.value });

            } else if (isSameSessionToken) {
                console.log("coucou2");
                // delete session token 
                user.sessionTokens.splice(index, 1);
                await user.save();   
            }
        }
        return response.status(401).json({ message: `Unauthorized` });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: `Server error` });
    }

};

exports.logout = async (request, response) => {
    try {
        const { username, sessionToken } = request.body;
        if(!username || !sessionToken) {
            return response.status(400).json({ message: "Bad request" }); 
        }

        const user = await User.findOne({ username: username });
        if(!user) {
            return response.status(401).json({ message: `Unauthorized` });
        }

        for (let index = 0; index < user.sessionTokens.length; index++) {

            const isSameSessionToken = user.sessionTokens[index].value === sessionToken;      
            if (isSameSessionToken) {
                // delete session token 
                user.sessionTokens.splice(index, 1);
                await user.save();
                return response.status(201).json({ message: `logout` });
            } 
        }
        return response.status(401).json({ message: `Unauthorized` });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: `Server error` });
    } 
};