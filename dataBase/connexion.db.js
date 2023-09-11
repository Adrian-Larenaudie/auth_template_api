const mongoose = require("mongoose");

async function connectToDatabase(connexion_string) {
    try {
        await mongoose.connect(connexion_string, {
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