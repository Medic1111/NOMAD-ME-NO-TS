const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { User } = require("../models/users");
jest.setTimeout(20000);

beforeAll(async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log(err));
});

afterAll(async () => {
  await User.findOneAndDelete({ username: "jestuser" })
    .then(() => console.log("deleted"))
    .catch((err) => console.log(err));
});

// LOGIN
describe("Testing AUTH route /login for ", () => {
  // SUCCESS LOGIN
  test("Successful login", async () => {
    const data = { username: "testing", password: "testing" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ token: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ user: expect.any(Object) })
        );
        expect(serverRes.body.user.posts).toBeDefined();
        expect(serverRes.body.user.posts).toEqual(expect.any(Array));
      });
  });

  //  NOT REGISTERED
  test("422 for unregistered users or wrong pass", async () => {
    const data = { username: "anynone", password: "anynone" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(422)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.status).toBeDefined();
        expect(serverRes.body.message).toBeDefined();
        expect(serverRes.body.error).toBeDefined();
      });
  });

  // INVALID DATA
  test("400 with invalid data", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(400)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.status).toBeDefined();
        expect(serverRes.body.message).toBeDefined();
        expect(serverRes.body.error).toBeDefined();
      });
  });

  // INCORRECT DATA
  test("401 Incorrect data ", async () => {
    const data = { username: "testing", password: "kodkoask" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(422)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.status).toBeDefined();
        expect(serverRes.body.message).toBeDefined();
        expect(serverRes.body.error).toBeDefined();
      });
  });
});

// REGISTRATION
describe("Testing AUTH route /login for ", () => {
  // SUCCESS REGISTRATION
  test.only("Successful registration", async () => {
    const data = {
      username: "jestuser",
      password: "jestuser",
      email: "jestuser@any.com",
      passwordConfirm: "jestuser",
    };
    await request(app)
      .post("/api/v1/auth/register")
      .send(data)
      .expect(201)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ token: expect.any(String) })
        );
        expect(serverRes.body).toEqual(
          expect.objectContaining({ user: expect.any(Object) })
        );
      });
  });
  //  ALREADY REGISTERED
  test("409 conflict for already registered", async () => {
    const data = {
      username: "jestuser",
      password: "jestuser",
      email: "jestuser@any.com",
      passwordConfirm: "jestuser",
    };
    await request(app)
      .post("/api/v1/auth/register")
      .send(data)
      .expect(409)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.status).toBeDefined();
        expect(serverRes.body.message).toBeDefined();
        expect(serverRes.body.error).toBeDefined();
      });
  });
  // INVALID DATA
  test.only("Fails validation mongoose", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(400)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.status).toBeDefined();
        expect(serverRes.body.message).toBeDefined();
        expect(serverRes.body.error).toBeDefined();
      });
  });
});

// VALIDATION
describe("Testing AUTH route /login for ", () => {
  // FAIL VALIDATION
  test("Fail validation no/exp token", async () => {
    await request(app)
      .get("/api/v1/auth/validate")
      .expect(403)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.status).toBeDefined();
        expect(serverRes.body.message).toBeDefined();
        expect(serverRes.body.error).toBeDefined();
      });
  });
  // SUCCESSFUL VALIDATION
  // REQUIRES REFACTOR. CONTROL READING FROM COOKIE ONLY
  // test("Successful validation no/exp token", async () => {
  //   await request(app)
  //     .get("/api/v1/auth/validate")
  //     .set(
  //       "Authorization",
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmciLCJpYXQiOjE2NzMyOTA0ODIsImV4cCI6MTY3MzI5NDA4Mn0.yGCW7lV5J7gBwarjUH8p-VEEJjg-Ez4aa074g8dlKTY"
  //     )
  //     .expect(200)
  //     .expect("Content-type", /json/)
  //     .then((serverRes) => {
  //       expect(serverRes.body).toBeDefined();
  //       expect(serverRes.body).not.toBeNull();
  //       expect(serverRes.body).toBeTruthy();
  //       expect(serverRes.body).toEqual(expect.any(Object));
  //     });
  // });
});

// LOGOUT

describe("Testing AUTH route /logout for ", () => {
  // SUCCESS LOGOUT
  test("Successful logout", async () => {
    await request(app)
      .get("/api/v1/auth/logout")
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.message).toBeDefined();
      });
  });
});
