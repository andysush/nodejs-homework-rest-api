const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models");
const { DB_HOST_TEST } = process.env;

describe("test signin route", () => {
	let server = null;
	beforeAll(async () => {
		await mongoose.connect(DB_HOST_TEST);
		server = app.listen(3000);
	});

	afterAll(async () => {
		await mongoose.connection.close();
		server.close();
	});

	beforeEach(async () => {
		const regData = {
			email: "test123@mail.tyt",
			password: "testQ123",
		};
		await request(app).post("/api/users/signup").send(regData);
	});

	afterEach(async () => {
		await User.deleteMany({});
	});

	test("should signin with correct data", async () => {
		const signData = {
			email: "test123@mail.tyt",
			password: "testQ123",
		};
		const { statusCode, body } = await request(app)
			.post("/api/users/signin")
			.send(signData);

		expect(statusCode).toBe(200);
		expect(typeof body.token).toBe("string");
		expect(typeof body.user).toBe("object");
		expect(typeof body.user.email).toBe("string");
		expect(typeof body.user.subscription).toBe("string");
	});
});
