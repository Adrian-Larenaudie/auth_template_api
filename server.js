const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const cors = require('cors');
const app = express();
const { generateKeysIfNotExist } = require('./utils/genRsaKeys.js');
const { connectToDatabase, closeDatabaseConnection } = require("./dataBase/connexion.db.js")
const writeLog = require('./logs/writter.js');
const csrfCatcher = require("./middlewares/csrfCatcher.js");

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/*-------- csrf management --------*/
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);
app.use(csrfCatcher);
/*------------ ---------- ------------*/

/* api routing */
const csrfRouter = require('./routes/csrfRoute.js');
app.use("/api", csrfRouter);
const usersRouter = require('./routes/usersRoute.js');
app.use("/api/users", usersRouter);
const authRouter = require('./routes/authRoute.js'); 
app.use("/api/auth", authRouter);
/* ----- Here import your routes ----- */

/* ----- ----------------------- ----- */

app.get("/", async (request, response) => { 
    try {
        writeLog({logLvl: "info", file: "server.js", message: `root get endpoint launch`});
        response.status(200).json({ message: `Welcome into auth template API` });
    } catch (error) {
        writeLog({logLvl: "error", file: "server.js", message: `Error on root get => ${error}`});
        response.status(500).json({ message: `Server error` });
    }
    
});

app.get("*", (_, response) => {
    writeLog({logLvl: "info", file: "server.js", message: `Not Implemented route called`});
    response.status(501).json({ message: `Not Implemented` });
});

(async () => {
    try {
        await connectToDatabase(process.env.MONGODB_CONNEXION_STRING);
        writeLog({logLvl: "info", file: "server.js", message: `MongoDB connexion success`});
        console.log(`MongoDB connexion success`);
        await generateKeysIfNotExist();

        //! REMOVE THIS PART IF DEFAULT ADMIN ALREADY EXIST
        const adminDefaultSetup = require("./utils/adminDefaultSetup.js");
        await adminDefaultSetup();
        //!

        app.listen(process.env.SERVER_PORT, () => {
            writeLog({logLvl: "info", file: "server.js", message: `Running on http://localhost:${process.env.SERVER_PORT}`});
            console.log(`Running on http://localhost:${process.env.SERVER_PORT}`);
        }); 
    } catch (error) {
        writeLog({logLvl: "error", file: "server.js", message: `Error on root get => ${error}`});
        console.log(error);  
    } 
})();

process.on('SIGINT', async () => {
    try {
        await closeDatabaseConnection();
        writeLog({logLvl: "info", file: "server.js", message: `Data base connexion closed`});
    } catch (error) {
        writeLog({logLvl: "error", file: "server.js", message: `Error on closing database => ${error}`});
    } finally {
        process.exit(0);
    }
     
});

module.exports = app;



