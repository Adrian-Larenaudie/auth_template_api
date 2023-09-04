const request = require("supertest");
const app = require("../../server.js");

//! carefull => check if this url is valid
const baseUrl = "http://localhost:5000/api";

describe('/api/users', () => {
  it('devrait retourner un code 200 OK', async () => {
    const response = await request(app).get(`${baseUrl}/users`);
    expect(response.status).toBe(200);
  });

  // todo
 /*  it('devrait retourner un contenu valide', async () => {
    const response = await request(app).get(`${baseUrl}/users`);
    expect(response.body).toEqual({ message: 'Contenu de route1' });
  }); */
});
