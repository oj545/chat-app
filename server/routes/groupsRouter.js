const express = require("express");
const goupsController = require("../controllers/goupsController");
const middleware = require("../midellwares/protect");

const router = express.Router();

router.use(middleware.protect);
router.route("/").post(goupsController.createGroup);

router.route("/:id").post(goupsController.updateGroup);

module.exports = router;
