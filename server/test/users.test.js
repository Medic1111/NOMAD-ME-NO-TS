const request = require("supertest");
const app = require("../app");
jest.setTimeout(20000);

// LOGIN

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
