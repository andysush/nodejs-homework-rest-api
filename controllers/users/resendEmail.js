const { HttpError, sendMails } = require("../../helpers");
const { User } = require("../../models");
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(404, "missing required field email");
	}
	if (user.verify) {
		throw HttpError(400, "Verification has already been passed");
	}

	const verifyEmail = {
		to: email,
		subject: "Verify Email",
		html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">
				<strong>Click to verify your Email</strong>
			</a>`,
	};

	await sendMails(verifyEmail);

	res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendEmail;
