const { controllersWrapper } = require("../../helpers");

const signup = require("./signup");
const signin = require("./signin");
const getCurrent = require("./current");
const logout = require("./logout");

module.exports = {
	signup: controllersWrapper(signup),
	signin: controllersWrapper(signin),
	getCurrent: controllersWrapper(getCurrent),
	logout: controllersWrapper(logout),
};
