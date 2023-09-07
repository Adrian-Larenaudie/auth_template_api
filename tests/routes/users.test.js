const axios = require("axios");
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl, userId, badId } = require("./testConfig.json");

let authToken;

// get bearer token
const fetchBearerToken = async () => {  
    try {
        const { data } = await axios.post("http://localhost:5050/api/login", { email: "admin@admin.com", password: "secret" }, { family: 4 });
        return data.token;
    } catch (error) {
        return error;
    }
};

beforeAll(async () => {
    authToken = await fetchBearerToken();
});

// get /api/users
describe("Route get all users tests", function() {
    it("Should return a 401 status bad request", function(done) {
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
describe("Route get user by id tests", function() {
    it("Should return a 401 status bad request", function(done) {
        request(baseUrl)
            .get(`/api/users/${userId}`)
            .expect(401, done);
    });
    it("Should return a 404 status not found", function(done) {
        request(baseUrl)
            .get(`/api/users/${badId}`)
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
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200, done);
    }); 

});


// post /api/users

// patch /api/users/:{id}

// delete /api/users/:{id}

