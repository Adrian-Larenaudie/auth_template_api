const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl, adminId, badAdminId } = require("../_testConfig/testConfig.json");
const fetchTokens = require('../utils/fetchTokens');

// store JWT to manage tests
let authToken;

// before running all tests, obtain the JWT and create the user who will be used for testing the patch routes
beforeAll(async () => {
    try {
        const tokenData = await fetchTokens();
        authToken = tokenData.token;
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
            .expect(200)
            .end(function(err, res) {
                if (err) {
                  return done(err);
                }
                try {
                    if(res.body.users.length > 0) {
                        expect(res.body.users[0]).to.have.property("_id");
                        expect(res.body.users[0]._id).to.be.a("string");
                        expect(res.body.users[0]).to.have.property("username");
                        expect(res.body.users[0].username).to.be.a("string");
                        expect(res.body.users[0]).to.have.property("email");
                        expect(res.body.users[0].email).to.be.a("string");
                        expect(res.body.users[0]).to.have.property("role");
                        expect(res.body.users[0].role).to.be.a("string");
                    }
                    done(); 
                } catch (error) {
                  done(error);
                }
            });
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
            .expect(200)
            .end(function(err, res) {
                if (err) {
                  return done(err);
                }
                try {
                    expect(res.body.user[0]).to.have.property("_id");
                    expect(res.body.user[0]._id).to.be.a("string");
                    expect(res.body.user[0]).to.have.property("username");
                    expect(res.body.user[0].username).to.be.a("string");
                    expect(res.body.user[0]).to.have.property("email");
                    expect(res.body.user[0].email).to.be.a("string");
                    expect(res.body.user[0]).to.have.property("role");
                    expect(res.body.user[0].role).to.be.a("string");
                    done(); 
                } catch (error) {
                    done(error);
                }
            });
    }); 
});