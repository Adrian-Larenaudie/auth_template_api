const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const { generateKeysIfNotExist } = require('./utils/genRsaKeys.js');
const { connectToDatabase } = require("./dataBase/connexion.db.js")
const writeLog = require('./logs/writter.js');
const csrfCatcher = require("./middlewares/csrfCatcher.js");
const session = require('express-session');

app.use(
    session({
        secret: process.env.SECRET_SESSION_KEY,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(cors({
    origin: "http://localhost:8081",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "_csrf, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, X-CSRF-Token, Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//* to perform test comment this middleware to avoid 403 Forbidden error
/*---------- csrf middleware ----------*/
app.use(csrfCatcher);
/*------------ ----------- ------------*/

/*---------- get csrf route -----------*/
const csrfRouter = require('./routes/csrfRoute.js');
app.use("/api", csrfRouter);
/*------------ ----------- ------------*/

/* -------- api default routing --------*/
const usersRouter = require('./routes/usersRoute.js');
app.use("/api/users", usersRouter);
const authRouter = require('./routes/authRoute.js'); 
app.use("/api/auth", authRouter);
/*------------ ----------- ------------*/

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

module.exports = app;



