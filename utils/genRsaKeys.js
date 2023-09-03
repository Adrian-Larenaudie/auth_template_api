const crypto = require('crypto');
const fs = require('fs').promises;

const genarateKeys = async () => {
    try {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
              type: 'spki',
              format: 'pem',
            },
            privateKeyEncoding: {
              type: 'pkcs8',
              format: 'pem',
            },
          });
          await fs.writeFile('./keys/private-key.pem', privateKey);
          await fs.writeFile('./keys/public-key.pem', publicKey);
          console.log("private & public Key genaration done"); 
          return;
    } catch (error) {
        console.log(error);
    }
};

exports.generateKeysIfNotExist = async () => {
    try {
        await fs.access('./keys/private-key.pem');
        await fs.access('./keys/public-key.pem');
        return;
    } catch (error) {
        await genarateKeys();
        return;
    }   
};
