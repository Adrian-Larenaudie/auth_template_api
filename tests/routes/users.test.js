const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
let authToken;

// get bearer token
describe("Route login", function() {
  it("Should return a 200 status and an authentication token", function(done) {
    request("http://localhost:5050")
      .post("/api/login")
      .send({ email: "admin@admin.com", password: "secret" })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        authToken = res.body.token;
        done();
      });
  });
});

// get /api/users
describe("Route get all users tests", function() {
    it("Should return a 401 status bad request", function(done) {
      request("http://localhost:5050")
        .get("/api/users")
        .expect(401, done);
    });
    it("Should return a 200 status with a body object and all users data", function(done) {
        request("http://localhost:5050")
          .get("/api/users")
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200, done);
      });
    
});

// get /api/users/:{id}

// post /api/users

// patch /api/users/:{id}

// delete /api/users/:{id}
