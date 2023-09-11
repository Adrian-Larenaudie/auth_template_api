const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl, userToDelete, badAdminId } = require("../_testConfig/testConfig.json");
const fetchTokens = require('../utils/fetchTokens');
const createUser = require('../utils/createUser');

// store JWT to manage tests
let authToken;
// store ID of user created for testing purposes, it will be subsequently deleted from the database
let userIdToDelete;

// before running all tests, obtain the JWT and create the user who will be used for testing the patch routes
beforeAll(async () => {
    try {
        const tokenData = await fetchTokens();
        authToken = tokenData.token;
        const data = await createUser(authToken, userToDelete);
        userIdToDelete = data.userId;
    } catch (error) {
       console.log(error); 
    }
   
});

// delete /api/users/:{id}
describe("Route delete user", function() {
    it("Should return a 401 status unauthorized", function(done) {
        request(baseUrl)
            .delete(`/api/users/${userIdToDelete}`)
            .expect(401, done);
    });
    it("Should return a 404 status not found", function(done) {
        request(baseUrl)
            .delete(`/api/users/${badAdminId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(404, done);
    });
    it("Should return a 404 status not found", function(done) {
        request(baseUrl)
            .delete(`/api/users`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(404, done);
    });
    it("Should return a 204 status delete successfully", function(done) {
        request(baseUrl)
            .delete(`/api/users/${userIdToDelete}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(204, done);
    }); 
});
