const { createUserBodyDuplicate } = require("../_testConfig/testConfig.json");
const User = require("../../models/user.js");
const { connectToDatabase, closeDatabaseConnection } = require("../../dataBase/connexion.db");

const cleanUserSessionTokens = async (connexion_string) => {
    try {
        if(!connexion_string) {
            console.log("WARNING !!! CONNEXION STRING REQUIRED INTO ./tests/routes/refreshToken.post.test.js cleanUserSessionTokens paramter");
        } else {
            await connectToDatabase(connexion_string);
            const user = await User.findOne({ email: createUserBodyDuplicate.email });
            user.sessionTokens = [];
            await user.save();
            await closeDatabaseConnection();
        }
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = cleanUserSessionTokens;