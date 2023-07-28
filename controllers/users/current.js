const getCurrent = async (req, res) => {
	const { id, email, subscription } = req.user;

	res.json({
		id,
		email,
		subscription,
	});
};

module.exports = getCurrent;
