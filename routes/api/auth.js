const express = require("express");
const { validateBody } = require("../../middlewares");
const { userSchemas } = require("../../models");
const controllers = require("../../controllers/users");

const authRouter = express.Router();

authRouter.post(
	"/signup",
	validateBody(userSchemas.userSignupSchema),
	controllers.signup
);

authRouter.post(
	"/signin",
	validateBody(userSchemas.userSigninSchema),
	controllers.signin
);

module.exports = authRouter;
