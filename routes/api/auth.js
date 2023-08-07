const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
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

authRouter.patch(
	"/users",
	authenticate,
	validateBody(userSchemas.updateSubscriptionSchema),
	controllers.updateSubscription
);

authRouter.patch(
	"/avatars",
	authenticate,
	upload.single("avatar"),
	controllers.updateAvatar
);

module.exports = authRouter;
