const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl, adminId, badAdminId } = require("../_testConfig/testConfig.json");
const fetchBearerToken = require('../utils/fetchBearerToken');

// store JWT to manage tests
let authToken;

// before running all tests, obtain the JWT and create the user who will be used for testing the patch routes
beforeAll(async () => {
    try {
        authToken = await fetchBearerToken();
    } catch (error) {
       console.log(error); 
    }
});

// get /api/users
describe("Route get all users", function() {
    it("Should return a 401 status unauthorized", function(done) {
        request(baseUrl)
            .get("/api/users")
            .expect(401, done);
    });
    it("Should return a 200 status with a body object and all users data", function(done) {
        request(baseUrl)
            .get("/api/users")
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200, done);
    }); 
});

// get /api/users/:{id}
describe("Route get user by id", function() {
    it("Should return a 401 status unauthorized", function(done) {
        request(baseUrl)
            .get(`/api/users/${adminId}`)
            .expect(401, done);
    });
    it("Should return a 404 status not found", function(done) {
        request(baseUrl)
            .get(`/api/users/${badAdminId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(404, done);
    });
    it("Should return a 500 status server error", function(done) {
        request(baseUrl)
            .get(`/api/users/0`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(500, done);
    });
    it("Should return a 200 status with a body object and user data", function(done) {
        request(baseUrl)
            .get(`/api/users/${adminId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200, done);
    }); 
});