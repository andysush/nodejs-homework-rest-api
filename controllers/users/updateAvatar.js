const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models");

const avatarWay = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tempUpload, originalname } = req.file;
	const newName = `${_id}_${originalname}`;
	const realUpload = path.join(avatarWay, newName);
	await fs.rename(tempUpload, realUpload);
	const avatarURL = path.join("avatars", newName);
	await User.findByIdAndUpdate(_id, { avatarURL });
	res.status(201).json({
		avatarURL,
	});
};
module.exports = updateAvatar;
