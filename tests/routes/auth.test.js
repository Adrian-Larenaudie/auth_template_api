const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl } = require("../_testConfig/testConfig.json");

describe("Route login", function() {
    it("Should return a 400 status bad request", function(done) {
      request(baseUrl)
        .post("/api/login")
        .send({ email: "admin@admin.com", password: ""})
        .expect(400, done);
    });
    it("Should return a 401 status unauthorized", function(done) {
        request(baseUrl)
          .post("/api/login")
          .send({ email: "admin@admin.com", password: "bad"})
          .expect(401, done);
      });
    it("Should return a 200 status success & return a body with a token string", function(done) {
        request(baseUrl)
          .post("/api/login")
          .send({ email: "admin@admin.com", password: "secret"})
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            try {
              expect(res.body).to.have.property("token");
              expect(res.body.token).to.be.a("string");
              done(); 
            } catch (error) {
              done(error);
            }
          });
      });
});