const bcrypt = require('bcrypt');

const hashPassword = async (plaintextPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plaintextPassword, salt);
    return hash;
};

module.exports = hashPassword;
  
