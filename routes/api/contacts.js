const express = require("express");
const controllers = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { contactSchemas } = require("../../models");

const contactRouter = express.Router();

contactRouter.get("/", authenticate, controllers.listContacts);

contactRouter.get("/:id", isValidId, controllers.getContactById);

contactRouter.post(
	"/",
	validateBody(contactSchemas.addSchema),
	controllers.addContact
);

contactRouter.delete("/:id", isValidId, controllers.removeContact);

contactRouter.put(
	"/:id",
	isValidId,
	validateBody(contactSchemas.addSchema),
	controllers.updateContact
);

contactRouter.patch(
	"/:id/favorite",
	isValidId,
	validateBody(contactSchemas.updateFavoriteSchema),
	controllers.updateFavorite
);

module.exports = contactRouter;
