const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const profileCtrl = require("../controllers/profile");

router.get('/:id', auth, profileCtrl.getProfile);
router.delete('/:id', auth, profileCtrl.deleteProfile);
router.put('/:id', auth, profileCtrl.updateProfile);

module.exports = router;