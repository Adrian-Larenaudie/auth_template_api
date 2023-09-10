const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl, createUserBody, createUserBodyDuplicate, userToUpdate } = require("../_testConfig/testConfig.json");
const fetchBearerToken = require('../utils/fetchBearerToken');
const createUser = require('../utils/createUser');
const deleteUser = require('../utils/deleteUser');

// store JWT to manage tests
let authToken;
// store ID of user created for testing purposes, it will be subsequently deleted from the database
let userIdToUpdate;

// before running all tests, obtain the JWT and create the user who will be used for testing the patch routes
beforeAll(async () => {
    try {
        authToken = await fetchBearerToken();
        const data = await createUser(authToken, userToUpdate);
        userIdToUpdate = data.userId;
    } catch (error) {
       console.log(error); 
    }
   
});

// patch /api/users/:{id}
describe("Route patch user: user update", function() {
    it("Should return a 401 status unauthorized", function(done) {
        request(baseUrl)
            .patch(`/api/users/${userIdToUpdate}`)
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
            .patch(`/api/users/${userIdToUpdate}`)
            .send({})
            .set('Authorization', `Bearer ${authToken}`)
            .expect(400, done);
    });
    it("Should return a 409 status conflict duplicate unique value into database", function(done) {
        request(baseUrl)
            .patch(`/api/users/${userIdToUpdate}`)
            .send(createUserBodyDuplicate)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(409, done);
    });
    it("Should return a 201 status created", function(done) {
        const body = userToUpdate;
        body.role = "utilisateur";
        request(baseUrl)
            .patch(`/api/users/${userIdToUpdate}`)
            .send(body)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                  return done(err);
                }
                try {
                    expect(res.body.updatedUser).to.have.property("_id");
                    expect(res.body.updatedUser._id).to.be.a("string");
                    expect(res.body.updatedUser).to.have.property("username");
                    expect(res.body.updatedUser.username).to.be.a("string");
                    expect(res.body.updatedUser).to.have.property("email");
                    expect(res.body.updatedUser.email).to.be.a("string");
                    expect(res.body.updatedUser).to.have.property("role");
                    expect(res.body.updatedUser.role).to.be.a("string");
                    done(); 
                } catch (error) {
                    done(error);
                }
            });
    });
});

// action to manage after tests
afterAll(async () => {
    await deleteUser(userIdToUpdate, authToken);  
});
