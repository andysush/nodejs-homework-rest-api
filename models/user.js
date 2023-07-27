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
		enum: ["starter", "pro", "business"],
		default: "starter",
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	token: {
		type: String,
		default: "",
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

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const userSchemas = {
	userSignupSchema,
	userSigninSchema,
};

module.exports = {
	User,
	userSchemas,
};
