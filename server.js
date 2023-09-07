const express = require('express');
const cors = require('cors');
const app = express();
const { generateKeysIfNotExist } = require('./utils/genRsaKeys.js');
const { connectToDatabase, closeDatabaseConnection } = require("./dataBase/connexion.db.js")

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* api routing */
const usersRouter = require('./routes/usersRoute.js');
app.use("/api/users", usersRouter);
const authRouter = require('./routes/authRoute.js'); 
app.use("/api/login", authRouter);
/* ----- Here import your routes ----- */

/* ----- ----------------------- ----- */

app.get("/", async (_, response) => { 
    try {
        response.send(`Welcome into auth template API`);
    } catch (error) {
        console.log(error);
    }
    
});

app.get("*", (_, response) => {
    response.status(501).send(`Not Implemented`);
});

(async () => {
    try {
        await connectToDatabase();
        console.log(`MongoDB connexion success`);
        await generateKeysIfNotExist();
        //! REMOVE THIS PART IF DEFAULT ADMIN ALREADY EXIST
        const adminDefaultSetup = require("./utils/adminDefaultSetup.js");
        await adminDefaultSetup();
        //!
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Running on http://localhost:${process.env.SERVER_PORT}`);
        }); 
    } catch (error) {
        console.log(error);  
    } 
})();

process.on('SIGINT', async () => {
    try {
        await closeDatabaseConnection();
        console.log('Connexion à la base de données fermée.');
    } catch (error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
     
});

module.exports = app;



