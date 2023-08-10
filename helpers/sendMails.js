const nodemailer = require("nodemailer");

const { UKR_NET_MAIL, UKR_NET_PASS } = process.env;

const nodemailerConfig = {
	host: "smtp.ukr.net",
	port: 465,
	secure: true,
	auth: {
		user: UKR_NET_MAIL,
		pass: UKR_NET_PASS,
	},
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMails = async (data) => {
	const email = { ...data, from: UKR_NET_MAIL };
	return transport.sendMail(email);
};

module.exports = sendMails;
