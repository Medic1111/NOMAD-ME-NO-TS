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

  await User.findOneAndDelete({ username: "jestuser" })
    .then(() => console.log("deleted"))
    .catch((err) => console.log(err));
});

// POSTS

describe("Testing AUTH route /login for ", () => {
  // SUCCESS LOGIN
  test("Successful login", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
      });
  });

  //  NOT REGISTERED
  test("Successful login", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
      });
  });

  // INVALID DATA
  test("Successful login", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
      });
  });

  // INCORRECT DATA
  test("Successful login", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
      });
  });
});

// REGISTRATION

describe("Testing AUTH route /login for ", () => {
  // SUCCESS REGISTRATION
  test("Successful login", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/register")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
      });
  });

  //  ALREADY REGISTERED
  test("Successful login", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/register")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
      });
  });

  // INVALID DATA
  test("Successful login", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
      });
  });
});

// VALIDATION

describe("Testing AUTH route /login for ", () => {
  // SUCCESS LOGIN
  test("Successful login", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
      });
  });
});

// LOGOUT

describe("Testing AUTH route /login for ", () => {
  // SUCCESS LOGIN
  test("Successful login", async () => {
    const data = { username: "", password: "" };
    await request(app)
      .post("/api/v1/auth/login")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
      });
  });
});
