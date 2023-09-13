/* 
=> step 1 create a folder for current month & year if not exist
=> step 2 create a file with current date YYYY_MM_DD if not exist inside the current month folder
=> step 3 read this file and write log inside it
*/
const fs = require('node:fs').promises;

const createFolderIfNotExist = async (folderName) => {
    try {
        await fs.access(folderName);
        console.log(`Folder already exist`);
        return;
    } catch (error) {
        console.log(`Folder not exist create one`); 
        await fs.mkdir(folderName);
        return;
    }
};

const createFileIfNotExist = async (fileName, extension) => {
    try {
        fileName += extension;
        await fs.access(fileName, fs.constants.F_OK);
        console.log(`File already exist replace content - filename => ${fileName}`);
    } catch (error) {
        console.log(`File not exist create one`); 
        await fs.writeFile(fileName, '');
    } finally {
        return fileName;
    }
};

const getFileName = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    const day = currentDate.getDate().toString().length === 1 ? `0${currentDate.getDate()}` : currentDate.getDate();
    const monthNumber = (monthIndex + 1).toString().length === 1 ? `0${monthIndex + 1}` : monthIndex + 1;
    const formattedDate = `${year}_${monthNumber}_${day}`;
    return formattedDate;
};

const getFolderName = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const months = [
        "January", 
        "February",
        "March", 
        "April", 
        "May", 
        "June",
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];
    const monthIndex = currentDate.getMonth();
    const monthInLetters = months[monthIndex];
    const folderName = `${monthInLetters}_${year}`;
    return folderName;
};

const writeLog = async (payload) => {
    try {
        const { logLvl, file, row, message, } = payload;

        const folderPath = `${__dirname}/${getFolderName()}`;
        const filePath = `${__dirname}/${getFolderName()}/${getFileName()}`;

        await createFolderIfNotExist(folderPath);

        const fullFileName = await createFileIfNotExist(filePath, '.txt');

        const log = `[${logLvl}] - FILE => [${file}] - ROW => [${row}] - MESSAGE => [${message}]`;
        await fs.appendFile(fullFileName, log + '\n');

    } catch (error) {
        console.log(error);
    }
};
/* writeLog({logLvl: "info", file: "index.js", row: 42, message: "c'est pour un test"}); */

module.exports = writeLog;

