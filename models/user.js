const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const {
	emailRegexp,
	subscriptionList,
} = require("../constants/user_constants");
const Joi = require("joi");
const userSchema = new Schema({
	email: {
		type: String,
		required: [true, "Email is required"],
		match: emailRegexp,
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Set password for user"],
	},
	subscription: {
		type: String,
		enum: subscriptionList,
		default: "starter",
	},
	token: {
		type: String,
		default: "",
	},
	avatarURL: {
		type: String,
		required: true,
	},
	verify: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
	},
});

const userSignupSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
	subscription: Joi.string().valid(...subscriptionList),
});
const userSigninSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string()
		.valid(...subscriptionList)
		.required(),
});

const userVerifyEmailSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
});

userSchema.post("save", handleMongooseError);

const userSchemas = {
	userSignupSchema,
	userSigninSchema,
	updateSubscriptionSchema,
	userVerifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
	User,
	userSchemas,
};
