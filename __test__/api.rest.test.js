'use strict';
require("dotenv").config();
process.env.SECRET = "abcdefghijklmnopqrstuvwxyz";
const supertest = require("supertest");
const { app } = require("../src/server");
const mockReq = supertest(app);
const faker = require("faker");
const { db, users } = require('../src/models/index');
const acl = require("../src/middleware/acl");
process.env.SECRET = "toes";
const newUser = {
  username: faker.name.findName(),
  password: faker.name.findName(),
  Email: faker.name.findName(),
  role: "admin",
};
beforeAll(async () => {
  await db.sync();
  await users.create(newUser);

});
describe("api-rest test", () => {
    let token;
    let id;
  
    it("GET all", async () => {
      const res1 = await mockReq
        .post("/signin")
        .auth(newUser.username, newUser.password);
      token = res1.body.token;
      console.log("==========================",token,"==========================")
      const res2 = await mockReq
        .post("/api/v1/house")
        .send({
          location: "amman000",
          Description: "ffffffffff000f",
          price: "ffffff000fff",
          ownerName: "aaaaaaaaaa",
          phoneNumber: "n000nnnnnn",
        })
        .set({ Authorization: `Bearer ${token}` });
      const res = await mockReq
      .get("/api/v1/house")
      .set({ Authorization: `Bearer ${token}` });
      expect(res.status).toEqual(200);
      expect(res2.status).toEqual(201);
      expect(res.body[1].id).toBeDefined();
      expect(res.body[1].location).toEqual("amman000");
    });
  });