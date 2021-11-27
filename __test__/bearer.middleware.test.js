'use strict';

process.env.SECRET = "toes";

const middleware = require('../src/middleware/bearer.js');
const { db, users } = require('../src/models/index.js');
const jwt = require('jsonwebtoken')
const faker = require("faker");

let username=faker.name.findName()

const userInfo = {
  username: username,
  password: 'hanin',
  Email: faker.name.findName(),
  role: "admin",

};

// Pre-load our database with fake users
beforeAll(async () => {
  await db.sync();
  await users.create(userInfo);
});
// afterAll(async (done) => {
//   await db.drop();
//   done();
// });

describe('Auth Middleware', () => {

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', () => {

      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalled();
        });

    });

    it('logs in a user with a proper token', () => {

      const user = { username: username };
      const token = jwt.sign(user, process.env.SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    });

  });

});