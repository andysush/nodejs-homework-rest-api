const multer = require("multer");
const path = require("path");

const tempWay = path.join(__dirname, "../", "tmp");
const multerConfig = multer.diskStorage({
	destination: tempWay,
	// filename: (req, file, cb) => {
	// 	cb(null, file.originalname);
	// },
});

const upload = multer({
	storage: multerConfig,
});

module.exports = upload;
