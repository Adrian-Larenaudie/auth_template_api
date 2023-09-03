const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNEXION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error('MongoDB connexion error: ', error);
    }
};

async function closeDatabaseConnection() {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.error('MongoDB deconnexion error: ', error);
        throw error;
    }
};

module.exports = {
    connectToDatabase,
    closeDatabaseConnection,
};