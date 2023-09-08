const axios = require("axios");
const { baseUrl } = require("../_testConfig/testConfig.json");

// get bearer token function
const fetchBearerToken = async () => {  
    try {
        const { data } = await axios.post(`${baseUrl}/api/login`, { email: "admin@admin.com", password: "secret" }, { family: 4 });
        return data.token;
    } catch (error) {
        return error;
    }
};

module.exports = fetchBearerToken;