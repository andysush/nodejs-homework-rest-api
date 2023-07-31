const { controllersWrapper } = require("../../helpers");

const listContacts = require("./getAll");
const getContactById = require("./getById");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
	listContacts: controllersWrapper(listContacts),
	getContactById: controllersWrapper(getContactById),
	addContact: controllersWrapper(addContact),
	removeContact: controllersWrapper(removeContact),
	updateContact: controllersWrapper(updateContact),
	updateFavorite: controllersWrapper(updateFavorite),
};
