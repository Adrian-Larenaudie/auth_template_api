
async function connectToDatabase() {
    try {
        
    } catch (error) {
        console.error('Mysql connexion error: ', error);
    }
};

async function closeDatabaseConnection() {
    try {
        
    } catch (error) {
        console.error('Mysql deconnexion error: ', error);
        throw error;
    }
};

module.exports = {
    connectToDatabase,
    closeDatabaseConnection,
};