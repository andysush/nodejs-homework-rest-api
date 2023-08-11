const multer = require("multer");
const path = require("path");

const tempWay = path.join(__dirname, "../", "tmp");
const multerConfig = multer.diskStorage({
	destination: tempWay,
});

const upload = multer({
	storage: multerConfig,
});

module.exports = upload;
