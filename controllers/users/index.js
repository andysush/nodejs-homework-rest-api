const { controllersWrapper } = require("../../helpers");

const signup = require("./signup");
const signin = require("./signin");

module.exports = {
	signup: controllersWrapper(signup),
	signin: controllersWrapper(signin),
};
