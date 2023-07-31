const { Contact } = require("../../models");

const listContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, ...query } = req.query;
	const skip = (page - 1) * limit;
	const result = await Contact.find({ owner, ...query }, "-__v", {
		skip,
		limit,
	}).populate("owner", "email subscription");
	res.json(result);
};

module.exports = listContacts;
