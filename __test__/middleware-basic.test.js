'use strict';

const middleware = require('../src/middleware/basic');
const { db, users } = require('../src/models/index');
const faker = require("faker");


const userInfo = {
  username: 'hala',
  password: 'hanin',
  Email: faker.name.findName(),
  role: "admin",

};


// Pre-load our database with fake users
beforeAll(async () => {
  await db.sync();
  await users.create(userInfo);
});

// afterAll(async () => {
//   await db.drop();
// })

describe('Auth Middleware', () => {

  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', () => {

      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic YWRtaW46Zm9v',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(403);
        });

    }); // it()

    it('logs in an admin user with the right credentials', () => {
      

      // Change the request to match this test case
      req.headers = {
        authorization: 'Basic aGFsYTpoYW5pbg==',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    }); 

  });

})