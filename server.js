const express = require('express');
const cors = require('cors');
const app = express();
const { generateKeysIfNotExist } = require('./utils/genRsaKeys.js');
const DB = require("./dataBase/dbPool.js")
const writeLog = require('./logs/writter.js');

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/* api routing */
/* const usersRouter = require('./routes/usersRoute.js');
app.use("/api/users", usersRouter);
const authRouter = require('./routes/authRoute.js'); 
app.use("/api/auth", authRouter); */
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
        const connection = await DB.getConnection();
        writeLog({logLvl: "info", file: "server.js", message: `Mysql connexion triggered`});
        console.log(`Mysql connexion triggered`);
        await generateKeysIfNotExist();
        connection.release();
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



