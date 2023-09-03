/* Create a default admin in the user collection to ease the application's setup. This user should be modified to avoid security issues */
const { connectToDatabase, closeDatabaseConnection } = require("../dataBase/connexion.db.js");
const User = require("../models/user.js");
const hashPassword = require("../utils/hashPassword.js");

const adminDefaultSetup = async () => {
    try {
        const hashedPassword = await hashPassword("secret");
        const defaultAdminData = new User({
            username: "admin",
            email: "admin@admin.com",
            password: hashedPassword,
            role: "admin"
        });
        await connectToDatabase();
        await defaultAdminData.save();
        await closeDatabaseConnection();
        console.log(`Default Admin account created with success`);
        return;
    } catch (error) {
        if (error.code === 11000 && error.name === 'MongoServerError') {
            console.log(`Warning ! Default Admin already exist you should remove the adminDefaultSetup call function into server.js file`);
            return;
        }
        console.log(error);
    }
};

module.exports = adminDefaultSetup;