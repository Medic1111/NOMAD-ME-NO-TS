const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { User } = require("../models/users");
const { Post } = require("../models/posts");
jest.setTimeout(20000);

// EDIT POST 200
// EDIT POST 404
// EDIT POST 422
// EDIT POST 401
// UPVOTE POST 200
// UPVOTE POST 401
// UPVOTE POST 404
// UPVOTE POST 401
// GET LABEL POST 200
// GET LABEL POST 404
// GET LABEL POST 401 (check if val middleware)

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

describe("Testing POST route / for ", () => {
  let mockUser;
  let token;
  let postIdDel;
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
    await Post.findByIdAndDelete(postIdDel)
      .then(() => console.log("Post deleted"))
      .catch((err) => console.log(err));
  });
  // SUCCESS GET ALL POSTS
  test("Successful fetch of all posts", async () => {
    await request(app)
      .get("/api/v1/posts")
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Array));
      });
  });
  // SUCCESS CREATE NEW POST 201
  test("Successful fetch of all posts", async () => {
    const data = {
      author: id,
      url: "https://media.istockphoto.com/id/847714996/photo/miami-beach-florida-usa.jpg?s=612x612&w=0&k=20&c=lT0wFzLOav0uoA8-glWpps552IVbHZaXEGtEtMxjVM8=",
      title: "TESTING API3",
      content: "This is my API TEST VAR Post",
    };
    await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data)
      .expect(201)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        postIdDel = serverRes.body.id;
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
      });
  });
  // FAIL CREATE NEW POST 403
  test("Successful fetch of all posts", async () => {
    const data = {
      author: id,
      url: "https://media.istockphoto.com/id/847714996/photo/miami-beach-florida-usa.jpg?s=612x612&w=0&k=20&c=lT0wFzLOav0uoA8-glWpps552IVbHZaXEGtEtMxjVM8=",
      title: "TESTING API3",
      content: "This is my API TEST VAR Post",
    };
    await request(app)
      .post("/api/v1/posts")
      .set("Authorization", "any")
      .set("Accept", "application/json")
      .send(data)
      .expect(403)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.message).toBeDefined();
      });
  });

  // FAIL CREATE NEW POST 422
  test("Successful fetch of all posts", async () => {
    const data = {
      author: "non-registered-user",
      url: "https://media.istockphoto.com/id/847714996/photo/miami-beach-florida-usa.jpg?s=612x612&w=0&k=20&c=lT0wFzLOav0uoA8-glWpps552IVbHZaXEGtEtMxjVM8=",
      title: "TESTING API3",
      content: "This is my API TEST VAR Post",
    };
    await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data)
      .expect(422)
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

// POST/:ID

describe("Testing POST route /:id  for ", () => {
  let mockUser;
  let token;
  let postIdDel;
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
    const data = {
      author: id,
      url: "https://media.istockphoto.com/id/847714996/photo/miami-beach-florida-usa.jpg?s=612x612&w=0&k=20&c=lT0wFzLOav0uoA8-glWpps552IVbHZaXEGtEtMxjVM8=",
      title: "TESTING API3",
      content: "This is my API TEST VAR Post",
    };
    await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data)
      .expect(201)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        postIdDel = serverRes.body.id;
      });
  });

  afterEach(async () => {
    await User.findOneAndDelete({ username: "jestuser" })
      .then(() => console.log("AFTER_ALL:deleted"))
      .catch((err) => console.log(err));
    await Post.findByIdAndDelete(postIdDel)
      .then(() => console.log("Post deleted"))
      .catch((err) => console.log(err));
  });
  // SUCCESS GET SPEC POST
  test("Successful get spec post", async () => {
    await request(app)
      .get(`/api/v1/posts/${postIdDel}`)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(Object));
        expect(serverRes.body.id).toBeDefined();
      });
  });
  // FAIL GET SPEC POST NULL
  test.only("Successful get spec post", async () => {
    await request(app)
      .get(`/api/v1/posts/63b9ce69a5199f6be9de8a8c`)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeNull();
        expect(serverRes.body).not.toBeTruthy();
      });
  });
});

describe("Test DELETE route for /:id for ", () => {
  let mockUser;
  let token;
  let postIdDel;
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
    const data = {
      author: id,
      url: "https://media.istockphoto.com/id/847714996/photo/miami-beach-florida-usa.jpg?s=612x612&w=0&k=20&c=lT0wFzLOav0uoA8-glWpps552IVbHZaXEGtEtMxjVM8=",
      title: "TESTING API3",
      content: "This is my API TEST VAR Post",
    };
    await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data)
      .expect(201)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        postIdDel = serverRes.body.id;
      });
  });

  afterEach(async () => {
    await User.findOneAndDelete({ username: "jestuser" })
      .then(() => console.log("AFTER_ALL:deleted"))
      .catch((err) => console.log(err));
    await Post.findByIdAndDelete(postIdDel)
      .then(() => console.log("Post deleted"))
      .catch((err) => console.log(err));
  });

  // SUCCESSFUL DELETE POST
  test("Successfully delete a post", async () => {
    let data = { id: id };
    await request(app)
      .delete(`/api/v1/posts/${postIdDel}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data)
      .expect(200)
      .expect("Content-type", /json/)
      .then((serverRes) => {
        expect(serverRes.body).toBeDefined();
        expect(serverRes.body).not.toBeNull();
        expect(serverRes.body).toBeTruthy();
        expect(serverRes.body).toEqual(expect.any(String));
      });
  });

  // FAIL DELETE POST 404
  test("Successfully delete a post", async () => {
    let data = { id: id };
    await request(app)
      .delete(`/api/v1/posts/63b9ce69a5199f6be9de4a7c`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
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
  // FAIL DELETE POST 401/403
  test("Successfully delete a post", async () => {
    let data = { id: id };
    await request(app)
      .delete(`/api/v1/posts/${postIdDel}`)
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmciLCJpYXQiOjE2NzMxMjEwMzcsImV4cCI6MTY3MzEyNDYzN30.SYWTgsXMHURZjT1QRXZHixtaIE4wKA1yqUh0AxNpOQ4`
      )
      .set("Accept", "application/json")
      .send(data)
      .expect(403)
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
