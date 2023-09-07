const User = require("../models/user.js");
const hashPassword = require("../utils/hashPassword.js");

exports.getAll = async (_, response) => {
    try {
        const users = await User.find().select('-password');
        return response.status(200).json({ users });
    } catch(error) {
        return response.status(500).json({ message: `Server error ${error}` });
    }
};

exports.getById = async (request, response) => {
    try {
        console.log(request.params.id);
        if (!request.params.id) {
            return response.status(400).json({ message: "Bad request" });
        }
        const user = await User.find({"_id": request.params.id}).select('-password');
        if(user.length !== 0) {
            return response.status(200).json({ user });
        }
        return response.status(404).json({ message: `Not found` });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: `Server error ${error}` });
    }
};

exports.create = async (request, response) => {
    try {
        const { username, email, password, role } = request.body;
        if (!username || !email || !password || !role) {
            return response.status(400).json({ message: "Bad request" });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });
        const createdUser = await newUser.save();
        return response.status(201).json({ message: `Created`, userId: createdUser._id });
    } catch (error) {
        if (error.code === 11000 && error.name === 'MongoServerError') {
            // contrainte d'unicité d'un des champs non respecté 
            return response.status(409).json({ message: `Duplicate key error` });
        }
        return response.status(500).json({ message: `Server error` });
    }
};

exports.update = async (request, response) => {
    try {
        const { username, email, password, role } = request.body;
        if (!username || !email || !password || !role || !request.params.id) {
            return response.status(400).json({ message: "Bad request" });
        }
        // to require the user to fully modify the admin account
        if(username === "admin" || email === "admin@admin.com" || password === "secret") {
            return response.status(409).json({ message: `Duplicate key error` });
        }
        const updateData = {
            username,
            email,
            password,
            role
        };
        // non récupération du mot de passe sur la mise à jour du user
        const updatedUser = await User.findByIdAndUpdate(request.params.id, updateData, { new: true, select: '-password' });
        if(updatedUser){
            return response.status(200).json({ updatedUser });
        }
        return response.status(404).json({ message: `Not found` });     
    } catch (error) {
        if (error.code === 11000 && error.name === 'MongoServerError') {
            // contrainte d'unicité d'un des champs non respecté 
            return response.status(409).json({ message: `Duplicate key error` });
        }
        return response.status(500).json({ message: `Server error` });
    }
};

exports.delete = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ message: "Bad request" });
        }
        const user = await User.deleteOne({ "_id": request.params.id });
        if(user.deletedCount > 1) {
            return response.status(204).json();
        }
        return response.status(404).json({ message: `Not found` });
    } catch (error) {
        return response.status(500).json({ message: `Server error` });
    }
};
