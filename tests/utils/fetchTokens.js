const axios = require("axios");
const { baseUrl } = require("../_testConfig/testConfig.json");

// get bearer token function
const fetchTokens = async () => {  
    try {
        const { data } = await axios.post(`${baseUrl}/api/auth/login`, { email: "admin@admin.com", password: "secret" }, { family: 4 });
        const dataToReturn = {
            sessionToken: data.sessionToken,
            token: data.token
        }
        return dataToReturn;
    } catch (error) {
        return error;
    }
};

module.exports = fetchTokens;