const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl, badSessionToken } = require("../_testConfig/testConfig.json");
const fetchTokens = require('../utils/fetchTokens');
const cleanUserSessionTokens = require('../utils/cleanUserSessionTokens.js');

// store JWT to manage tests
let sessionToken;

// before running all tests, obtain the JWT and create the user who will be used for testing the patch routes
beforeAll(async () => {
    try {
        const tokenData = await fetchTokens();
        sessionToken = tokenData.sessionToken;
    } catch (error) {
       console.log(error); 
    }
   
});

describe("Route login", function() {
    it("Should return a 400 status bad request", function(done) {
      request(baseUrl)
            .post("/api/auth/refresh_token")
            .send({})
            .expect(400, done);
    });
    it("Should return a 401 status unauthorized", function(done) {
        request(baseUrl)
            .post("/api/auth/refresh_token")
            . send({ username: "admin", sessionToken: badSessionToken })
            .expect(401, done);
      });
    it("Should return a 200 status success & return a body with a token string", function(done) {
        request(baseUrl)
            .post("/api/auth/refresh_token")
            .send({ username: "admin", sessionToken: sessionToken })
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                try {
                    expect(res.body).to.have.property("token");
                    expect(res.body.token).to.be.a("string");
                    expect(res.body).to.have.property("sessionToken");
                    expect(res.body.sessionToken).to.be.a("string");
                    done(); 
                } catch (error) {
                    done(error);
                }
            });
      });
});

// action to manage after tests
afterAll(async () => {
    console.log("hello world !");
    await cleanUserSessionTokens();
});