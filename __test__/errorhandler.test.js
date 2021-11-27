const { app } = require("../src/server");
const supertest = require("supertest");

const mockReq = supertest(app);
describe("test 404 &&500", () => {
  test("should give 404", async () => {
    const res = await mockReq.get("/notfound");
    expect(res.status).toBe(404);
  });
  test("should give 500", async () => {
    const res = await mockReq.get("/erro");
    expect(res.status).toBe(500);
  });
});
