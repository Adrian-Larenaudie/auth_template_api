const axios = require("axios");
const { baseUrl } = require("../_testConfig/testConfig.json");

// delete user function
const deleteUser = async (userIdToDelete) => {
    try {
        await axios.delete(
            `${baseUrl}/api/users/${userIdToDelete}`, 
            { headers: { Authorization: `Bearer ${authToken}` } },
            { family: 4 }
        );  
        console.log("user deleted => " + userIdToDelete);    
    } catch (error) {
       //console.log(error);
    }
};

module.exports = deleteUser;