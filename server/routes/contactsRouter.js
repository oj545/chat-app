const express = require("express");
const contactsController = require("../controllers/contactsController");
const router = express.Router();

const middleware = require("../midellwares/protect");

router.use(middleware.protect);
router.route("/").post(contactsController.addContact);

router.route("/:id").post(contactsController.updateContact);
module.exports = router;
