
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl, createUserBody, createUserBodyDuplicate } = require("../_testConfig/testConfig.json");
const fetchBearerToken = require('../utils/fetchBearerToken');
const deleteUser = require('../utils/deleteUser');

// store JWT to manage tests
let authToken;
// store ID of user created for testing purposes, it will be subsequently deleted from the database
let createdUserId;

// before running all tests, obtain the JWT and create the user who will be used for testing the patch routes
beforeAll(async () => {
    try {
        authToken = await fetchBearerToken();
    } catch (error) {
       console.log(error); 
    }
   
});

// post /api/users
describe("Route post user: user creation", function() {
    it("Should return a 401 status unauthorized", function(done) {
        request(baseUrl)
            .post(`/api/users`)
            .send(createUserBody)
            .expect(401, done);
    });
    it("Should return a 400 status bad request no body sended", function(done) {
        request(baseUrl)
            .post(`/api/users`)
            .send({})
            .set('Authorization', `Bearer ${authToken}`)
            .expect(400, done);
    });
    it("Should return a 409 status conflict duplicate unique value into database", function(done) {
        request(baseUrl)
            .post(`/api/users`)
            .send(createUserBodyDuplicate)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(409, done);
    });
    it("Should return a 201 status created", function(done) {
        request(baseUrl)
            .post(`/api/users`)
            .send(createUserBody)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(201)
            .end(async function(err, res) {
                if (err) {
                  return done(err);
                }
                try {
                  expect(res.body).to.have.property("userId");
                  expect(res.body.userId).to.be.a("string");
                  createdUserId = res.body.userId;
                  done(); 
                } catch (error) {
                  done(error);
                }
            });
    });
});

// action to manage after tests
afterAll(async () => {
    await deleteUser(createdUserId, authToken);
});