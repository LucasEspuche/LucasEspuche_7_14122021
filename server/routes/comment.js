const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

router.post("/", auth, commentCtrl.createComment);
router.get("/:id/all", auth, commentCtrl.getAllComments);

module.exports = router;