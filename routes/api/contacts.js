const express = require("express");
const controllers = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { contactSchemas } = require("../../models");

const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:id", isValidId, controllers.getContactById);

router.post(
	"/",
	validateBody(contactSchemas.addSchema),
	controllers.addContact
);

router.delete("/:id", isValidId, controllers.removeContact);

router.put(
	"/:id",
	isValidId,
	validateBody(contactSchemas.addSchema),
	controllers.updateContact
);

router.patch(
	"/:id/favorite",
	isValidId,
	validateBody(contactSchemas.updateFavoriteSchema),
	controllers.updateFavorite
);

module.exports = router;
