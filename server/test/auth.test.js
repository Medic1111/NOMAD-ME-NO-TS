const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { User } = require("../models/users");
jest.setTimeout(30000);

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
  test("Fails validation mongoose", async () => {
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
});

describe("Testing AUTH route/validate for ", () => {
  let id;
  let mockUser;
  let token;
  beforeAll(async () => {
    await User.findOneAndDelete({ username: "jestuser" })
      .then(() => console.log("deleted"))
      .catch((err) => console.log(err));
  });
  beforeEach(async () => {
    mockUser = await User.create({
      username: "jestuser",
      password: "jestuser",
      email: "jestuser@any.com",
      passwordConfirm: "jestuser",
    });

    await request(app)
      .post("/api/v1/auth/login")
      .send({ username: "jestuser", password: "jestuser" })
      .then((serverRes) => {
        id = serverRes.body.user.id;
        token = serverRes.header["set-cookie"][0]
          .slice(4)
          .split(" ")[0]
          .slice(0, -1);
      });
  });

  afterEach(async () => {
    await User.findOneAndDelete({ username: "jestuser" })
      .then(() => console.log("AFTER_ALL:deleted"))
      .catch((err) => console.log(err));
  });
  test("Successful validation", async () => {
    await request(app)
      .get("/api/v1/auth/validate")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.user).toBeDefined();
      });
  });
  // FAIL VALIDATION
  test("Fail validation no /exp token", async () => {
    await request(app)
      .get("/api/v1/auth/validate")
      .expect(403)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.message).toBeDefined();
      });
  });
});

// LOGOUT
describe("Testing AUTH route /logout for ", () => {
  // SUCCESS LOGOUT
  test.only("Successful logout", async () => {
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
