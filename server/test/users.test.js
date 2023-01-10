const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { User } = require("../models/users");
jest.setTimeout(20000);

let mockUser;
let token;

beforeAll(async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log(err));
});

describe("Testing USER route for /:id GET user", () => {
  // GET REGISTERED USER
  beforeAll(async () => {
    mockUser = await User.create({
      username: "jestuser",
      password: "jestuser",
      email: "jestuser@any.com",
      passwordConfirm: "jestuser",
    });
  });
  afterAll(async () => {
    await User.findOneAndDelete({ username: mockUser.username })
      .then(() => console.log("AFTER_ALL: deleted"))
      .catch((err) => console.log(err));
  });
  test("Find a user with posts", async () => {
    await request(app)
      .get(`/api/v1/users/${mockUser.id}`)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body).toEqual(
          expect.objectContaining({ user: expect.any(Object) })
        );
        expect(serverRes.body.user.posts).toBeDefined();
        expect(serverRes.body.user.posts).toEqual(expect.any(Array));
      });
  });
  // GET 404 IF NOT REGISTERED USER
  test("gets 404 for unregistered users", async () => {
    await request(app)
      .post("/api/v1/users/63b475c73892400e88382d72")
      .expect(404)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
      });
  });
});

describe("Testing USER route for /:id DELETE user", () => {
  let id;
  beforeAll(async () => {
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

  afterAll(async () => {
    await User.findOneAndDelete({ username: "jestuser" })
      .then(() => console.log("AFTER_ALL:deleted"))
      .catch((err) => console.log(err));
  });

  //  DELETE USER
  test("Successful deletion of user", async () => {
    const data = { password: "jestuser" };
    await request(app)
      .delete(`/api/v1/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.message).toBeDefined();
      });
  });
});

describe("Testing USER route for /:id PATCH avatar", () => {
  let id;
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
  //  USER AVATAR EDIT
  test("Successful change of user avatar", async () => {
    const data = {
      avatar:
        "https://st2.depositphotos.com/3143277/8644/i/600/depositphotos_86446164-stock-photo-business-man-in-office.jpg",
    };
    await request(app)
      .patch(`/api/v1/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.user.avatar).toEqual(data.avatar);
      });
  });

  test("No avatar data adds DEFAULT AVATAR", async () => {
    await request(app)
      .patch(`/api/v1/users/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send({})
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
      });
  });
});

describe("Testing USER route for /:id/new_password PATCH avatar", () => {
  let id;
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
  //  CHANGE PASSWORD VOLUNTARY SUCCESS
  test("Successful change password", async () => {
    const data = {
      currentPassword: "jestuser",
      newPassword: "newpass",
    };
    await request(app)
      .patch(`/api/v1/users/${id}/new_password`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.message).toBeDefined();
      });
  });
  // FAIL WRONG PASSWORD
  test("Fail to change password with 401 wrong pass", async () => {
    const data = {
      currentPassword: "jestser",
      newPassword: "newpass",
    };
    await request(app)
      .patch(`/api/v1/users/${id}/new_password`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data)
      .expect(401)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.message).toBeDefined();
      });
  });
  // FAIL WRONG PASSWORD
  test("Fail to change password with 422 invalid data", async () => {
    const data = {
      currentPassword: "jestuser",
      newPassword: "",
    };
    await request(app)
      .patch(`/api/v1/users/${id}/new_password`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data)
      .expect(422)
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

describe("Testing USER route for /forgot_password POST", () => {
  beforeEach(async () => {
    mockUser = await User.create({
      username: "jestuser",
      password: "jestuser",
      email: "jestuser@any.com",
      passwordConfirm: "jestuser",
    });
  });

  afterEach(async () => {
    await User.findOneAndDelete({ username: "jestuser" })
      .then(() => console.log("AFTER_ALL:deleted"))
      .catch((err) => console.log(err));
  });
  //  REQUEST TEMP PASSWORD
  test("Successfully request a temp pass", async () => {
    const data = {
      email: "jestuser@any.com",
    };
    await request(app)
      .post(`/api/v1/users/forgot_password`)
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        console.log(serverRes.body);
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.message).toBeDefined();
      });
  });
  // FAIL REQUESTING, INVALID EMAIL
  test("Fail requesting a temp pass with 404, invalid email", async () => {
    const data = {
      email: "non-existent@any.com",
    };
    await request(app)
      .post(`/api/v1/users/forgot_password`)
      .send(data)
      .expect(404)
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

// BRAINSTORM AUTOMATION OF TEST CONSIDERING WE NEED
// EMAIL DATA TO INSERT...
// 1- Perhaps, during dev include temp hash on response

// FORGOT PASSWORD: RESET
// test("Successful reset", async () => {
//   const data = { username: "", password: "" };
//   await request(app)
//     .post("/api/v1/auth/login")
//     .send(data)
//     .expect(200)
//     .expect("Content-type", /json/)
//     .then((serverRes) => {
//       console.log(serverRes.body);
//     });
// });

// FORGOT PASSWORD: RESET FAIL EXP TOKEN
// test("Expired token", async () => {
//   const data = { username: "", password: "" };
//   await request(app)
//     .post("/api/v1/auth/login")
//     .send(data)
//     .expect(200)
//     .expect("Content-type", /json/)
//     .then((serverRes) => {
//       console.log(serverRes.body);
//     });
// });

// FORGOT PASSWORD: RESET FAIL PASSWORDS DONT MATCH
// test("Passwords dont match", async () => {
//   const data = { username: "", password: "" };
//   await request(app)
//     .post("/api/v1/auth/login")
//     .send(data)
//     .expect(200)
//     .expect("Content-type", /json/)
//     .then((serverRes) => {
//       console.log(serverRes.body);
//     });
// });

// FORGOT PASSWORD: RESET FAIL WRONG TOKEN
// test("Wrong token", async () => {
//   const data = { username: "", password: "" };
//   await request(app)
//     .post("/api/v1/auth/login")
//     .send(data)
//     .expect(200)
//     .expect("Content-type", /json/)
//     .then((serverRes) => {
//       console.log(serverRes.body);
//     });
// });
