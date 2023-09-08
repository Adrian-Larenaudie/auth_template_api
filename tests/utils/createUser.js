const axios = require("axios");
const { baseUrl } = require("../_testConfig/testConfig.json");

// create user to update function
const createUser = async (authToken, userBody) => {
    try {
        const { data } = await axios.post(
            `${baseUrl}/api/users`, 
            userBody,
            { headers: { Authorization: `Bearer ${authToken}` } },
            { family: 4 }
        );
        return data;   
    } catch (error) {
       console.log(error);
       return error;
    }
};

module.exports = createUser;