const axios = require("axios");
const { baseUrl, userToUpdate } = require("../_testConfig/testConfig.json");

// create user to update function
const createUserToUpdate = async (authToken) => {
    try {
        const { data } = await axios.post(
            `${baseUrl}/api/users`, 
            userToUpdate,
            { headers: { Authorization: `Bearer ${authToken}` } },
            { family: 4 }
        );
        return data;   
    } catch (error) {
       console.log(error);
       return error;
    }
};

module.exports = createUserToUpdate;