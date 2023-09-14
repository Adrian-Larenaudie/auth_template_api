/* 
=> step 1 Based on the specified date, create a folder name and a file name
=> step 2 If the folder don't exist create it
=> step 3 If the file don't exist create it
=> step 4 Get the current date time
=> step 5 Using payload parameters & the date time to prepare the current log content 
=> step 6 Using the file path retrieved earlier, write a new line containing the log to the file
*/

const fs = require('node:fs').promises;

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

const createFolderIfNotExist = async (folderName) => {
    try {
        await fs.access(folderName);
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
    } catch (error) {
        console.log(`File not exist create one`); 
        await fs.writeFile(fileName, '');
    } finally {
        return fileName;
    }
};

const getCurrentDateTime = () => {
    const currentTimestamp = new Date();
    const year = currentTimestamp.getFullYear();
    const month = String(currentTimestamp.getMonth() + 1).padStart(2, '0');
    const day = String(currentTimestamp.getDate()).padStart(2, '0');
    const hours = String(currentTimestamp.getHours()).padStart(2, '0');
    const minutes = String(currentTimestamp.getMinutes()).padStart(2, '0');
    const secondes = String(currentTimestamp.getSeconds()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day} ${hours}:${minutes}:${secondes}`;
    return currentDate;
};

const writeLog = async (payload) => {
    try {
        const { logLvl, file, message, } = payload;

        const folderPath = `${__dirname}/${getFolderName()}`;
        const filePath = `${__dirname}/${getFolderName()}/${getFileName()}`;

        await createFolderIfNotExist(folderPath);

        const fullFileName = await createFileIfNotExist(filePath, '.txt');
        const currentDateTime = getCurrentDateTime();

        const log = `[${logLvl}]- [${currentDateTime}] - FILE => ${file} - MESSAGE => ${message}`;
        await fs.appendFile(fullFileName, log + '\n');

    } catch (error) {
        console.log(error);
    }
};

module.exports = writeLog;

