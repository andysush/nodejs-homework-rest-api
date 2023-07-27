const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
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

authRouter.get("/current", authenticate, controllers.getCurrent);

authRouter.post("/logout", authenticate, controllers.logout);

module.exports = authRouter;
