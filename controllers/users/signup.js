const { HttpError, sendMails } = require("../../helpers");

const { User } = require("../../models");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const signup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, "Email in use");
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);
	const verificationToken = nanoid();

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});

	const verifyEmail = {
		to: email,
		subject: "Verify Email",
		html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">
				<strong>Click to verify your Email</strong>
			</a>`,
	};

	await sendMails(verifyEmail);

	res.status(201).json({
		email: newUser.email,
		subscription: newUser.subscription,
	});
};

module.exports = signup;
