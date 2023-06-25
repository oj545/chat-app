const express = require("express");
const authController = require("../controllers/authController");
const middleware = require("../midellwares/protect");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(middleware.protect);
router.route("/").get(authController.getMe);

module.exports = router;
