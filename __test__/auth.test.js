"use strict";

require("dotenv").config();
process.env.SECRET = "abcdefghijklmnopqrstuvwxyz";
const supertest = require("supertest");
const { app } = require("../src/server");
const mockReq = supertest(app);
const faker=require('faker');

afterAll(() => setTimeout(() => process.exit(), 0));


const newUser = {
  username: faker.name.findName(),
  password: "test244422",
  Email: "test@114411",
  role: "admin"
};
describe("sign-up sign-in", () => {
  it("sign up", async () => {
    const res = await mockReq.post("/signup").send(newUser);
    expect(res.status).toEqual(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toEqual(newUser.username);
  });

  it("sign in", async () => {
    const res = await mockReq
      .post("/signin")
      .auth(newUser.username, newUser.password);
    expect(res.status).toEqual(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toEqual(newUser.username);
  });
});

let token;

describe("/users", () => {
  it("/users", async () => {
    const res1 = await mockReq
      .post("/signin")
      .auth(newUser.username, newUser.password);
    token = res1.body.token;
    const res = await mockReq
      .get("/users")
      .set({ Authorization: `Bearer ${token}` });
    expect(res.status).toEqual(200);
  });
});
