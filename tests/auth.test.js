const request = require("supertest");
const  app = require("../app");
const mongoose = require("mongoose");
const { User } = require("../models");

require("dotenv").config();

const { HOST_DB_TEST } = process.env;

describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(HOST_DB_TEST);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany();
  });

  test("Should register new user", async () => {
    const response = await request(app).post("/api/users/signup").send({
      email: "test1_user1@testmail.com",
      password: "987654",
    });
    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      user: {
          email:  expect.any(String),
          subscription: expect.any(String)
        },
    });
    const {email, subscription} = response.body.user;
    expect(email).toBe("test1_user1@testmail.com");
    expect(subscription).toBe("starter");
  });

  test("Can't register 2 users with the same email", async () => {
    const testEmail = "test2_user1@testmail.com";
    await request(app).post("/api/users/signup").send({
      email: testEmail,
      password: "987654",
    });

    const response = await request(app).post("/api/users/signup").send({
      email: testEmail,
      password: "123456",
    });

    expect(response.status).toBe(409);
    expect(response.body).toStrictEqual({
      message: expect.any(String),
    });
    expect(response.body.message).toBe("Email in use");
  });

  test("Can't register new users with empty email", async () => {
    const response = await request(app).post("/api/users/signup").send({
      email: '',
      password: "987654",
    });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      message: expect.any(String),
    });
  });

  test("Can't register new users without email", async () => {
    const response = await request(app).post("/api/users/signup").send({
      password: "987654",
    });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      message: expect.any(String),
    });
    expect(response.body.message).toBe('Validation error: "email" is required');
  });

  test("Can't register new users without password", async () => {
    const response = await request(app).post("/api/users/signup").send({
      email: "test3_user1@testmail.com",
    });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      message: expect.any(String),
    });
    expect(response.body.message).toBe('Validation error: "password" is required');
  });
});

