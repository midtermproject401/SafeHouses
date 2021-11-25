"use strict";

"use strict";
require("dotenv").config();
process.env.SECRET = "abcdefghijklmnopqrstuvwxyz";
const supertest = require("supertest");
const { app } = require("../src/server");
const mock = supertest(app);
const faker=require('faker');
const fakerName=faker.name.findName()
// jest.useRealTimers();
// jest.setTimeout(20000)

describe("admin", () => {
  let token;
  let id;
  
  it("sign up", async () => {
    const res = await mock
      .post("/signup")
      .send({ username: fakerName, password: "test", role: "admin" });
    expect(res.status).toEqual(201);
  });
  it("sign in", async () => {
    const res = await mock.post("/signin").auth(fakerName, "test");
    token = res.body.token;
    expect(res.status).toEqual(200);
    expect(res.body.user.role).toEqual("admin");
    expect(res.body.token).toEqual(token);
  });
  it("GET all" ,async () => {
    const res1 = await mock
      .post("/api/v1/house")
      .send({
        location:"amman",
        Description:"fffffffffff",
        price:"fffffffff",
        ownerName:"ttttt",
        phoneNumber:"nnnnnnn",
        rentDuration:"daily"
    })
      .set({ Authorization: `Bearer : ${token}` });
    const res = await mock.get("/api/v1/house");
    expect(res.status).toEqual(200);
    // expect(res.body[1]._id).toBeDefined();
    // expect(res.body[1].location).toEqual("amman");
    // expect(res.body[1].Description).toEqual("fffffffffff");
    // expect(res.body.length).toEqual(5);
  });
  xit("GET one", async () => {
    const res = await mock.get(`/api/v1/food/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body._id).toBeDefined();
    expect(res.body.name).toEqual("Salad");
    expect(res.body.type).toEqual("VEGETABLE");
    expect(res.body._id).toEqual(id);
  });
  xit("DELETE", async () => {
    const res = await mock
      .delete(`/api/v1/food/${id}`)
      .set({ Authorization: `Bearer ${token}` });
    expect(res.status).toEqual(200);
    const res1 = await mock.get(`/api/v1/food/${id}`);
    expect(res1.status).toEqual(200);
    expect(res1.body).toEqual(null);
    const res2 = await mock.get("/api/v1/food/");
    expect(res2.body.length).toEqual(1);
  });
});
