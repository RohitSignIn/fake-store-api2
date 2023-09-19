const express = require("express");
const router = express.Router();
const auth = require("../controller/auth");

router.post("/login", auth.login);
router.get("/logout", auth.logout);

module.exports = router;
