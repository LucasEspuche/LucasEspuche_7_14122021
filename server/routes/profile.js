const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const profileCtrl = require("../controllers/profile");

router.get('/', auth, profileCtrl.getProfile);
router.delete('/', auth, profileCtrl.deleteProfile);
router.put('/', auth, profileCtrl.updateProfile);

module.exports = router;