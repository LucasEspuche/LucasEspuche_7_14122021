
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const profileCtrl = require("../controllers/profile");

router.get('/:id', auth, profileCtrl.getUser);

module.exports = router;