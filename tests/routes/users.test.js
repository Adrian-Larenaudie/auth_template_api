
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl, adminId, badAdminId, createUserBody, createUserBodyDuplicate, userToUpdate } = require("../_testConfig/testConfig.json");
const fetchBearerToken = require('../utils/fetchBearerToken');
const createUserToUpdate = require('../utils/createUserToUpdate');
const deleteUser = require('../utils/deleteUser');

// store JWT to manage tests
let authToken;
// store IDs of users created for testing purposes, they will be subsequently deleted from the database
let usersId = {};

// before running all tests, obtain the JWT and create the user who will be used for testing the patch routes
beforeAll(async () => {
    try {
        authToken = await fetchBearerToken();
        const data = await createUserToUpdate(authToken);
        usersId['userIdToUpdate'] = data.userId;
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
                  usersId['userIdCreated'] = res.body.userId;
                  done(); 
                } catch (error) {
                  done(error);
                }
            });
    });
});

// patch /api/users/:{id}
describe("Route patch user: user update", function() {
    it("Should return a 401 status unauthorized", function(done) {
        request(baseUrl)
            .patch(`/api/users/${usersId.userIdToUpdate}`)
            .send(createUserBody)
            .expect(401, done);
    });
    it("Should return a 400 status bad request no body sended", function(done) {
        request(baseUrl)
            .patch(`/api/users`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(404, done);
    });
    it("Should return a 400 status bad request no body sended", function(done) {
        request(baseUrl)
            .patch(`/api/users/${usersId.userIdToUpdate}`)
            .send({})
            .set('Authorization', `Bearer ${authToken}`)
            .expect(400, done);
    });
    it("Should return a 409 status conflict duplicate unique value into database", function(done) {
        request(baseUrl)
            .patch(`/api/users/${usersId.userIdToUpdate}`)
            .send(createUserBodyDuplicate)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(409, done);
    });
    it("Should return a 201 status created", function(done) {
        const body = userToUpdate;
        body.role = "utilisateur";
        request(baseUrl)
            .patch(`/api/users/${usersId.userIdToUpdate}`)
            .send(body)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200, done)
    });
});

// delete /api/users/:{id}


// action to manage after tests
afterAll(async () => {
    await deleteUser(usersId.userIdCreated);  
    await deleteUser(usersId.userIdToUpdate);  
});
