const axios = require("axios");
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const { baseUrl, adminId, badAdminId, createUserBody, createUserBodyDuplicate, userToUpdate } = require("./testConfig.json");

let authToken;
let usersId = {};

// get bearer token
const fetchBearerToken = async () => {  
    try {
        const { data } = await axios.post(`${baseUrl}/api/login`, { email: "admin@admin.com", password: "secret" }, { family: 4 });
        return data.token;
    } catch (error) {
        return error;
    }
};

// delete user 
const deleteUser = async (userIdToDelete) => {
    try {
        await axios.delete(
            `${baseUrl}/api/users/${userIdToDelete}`, 
            { headers: { Authorization: `Bearer ${authToken}` } },
            { family: 4 }
        );      
    } catch (error) {
       //console.log(error);
    }
};

// create user to update
const createUserToUpdate = async () => {
    try {
        const { data } = await axios.post(
            `${baseUrl}/api/users`, 
            userToUpdate,
            { headers: { Authorization: `Bearer ${authToken}` } },
            { family: 4 }
        );
        usersId['userIdToUpdate'] = data.userId;      
    } catch (error) {
       console.log(error);
    }
};

// before all users test need to fetch an access token
beforeAll(async () => {
    try {
        authToken = await fetchBearerToken();
        await createUserToUpdate();
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
