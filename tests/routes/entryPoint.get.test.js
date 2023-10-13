const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl } = require("../_testConfig/testConfig.json");

// first entry point route /
describe("Route delete user", function() {
    it("Should return a 200 success status", function(done) {
        request(baseUrl)
            .get(`/`)
            .expect(200)
            .end(function(err, res) {
                if (err) {
                  return done(err);
                }
                try {
                    expect(res.body).to.have.property("message");
                    expect(res.body.message).to.be.a("string");
                    expect(res.body.message).to.equal("Welcome into auth template API");
                    done(); 
                } catch (error) {
                  done(error);
                }
            });
    });
    
});

// not implemented routes route exemple /toto
describe("Route delete user", function() {
    it("Should return a 501 status not implemented", function(done) {
        request(baseUrl)
            .get(`/toto`)
            .expect(501)
            .end(function(err, res) {
                if (err) {
                  return done(err);
                }
                try {
                    expect(res.body).to.have.property("message");
                    expect(res.body.message).to.be.a("string");
                    expect(res.body.message).to.equal("Not Implemented");
                    done(); 
                } catch (error) {
                  done(error);
                }
            });
    });
    
});
