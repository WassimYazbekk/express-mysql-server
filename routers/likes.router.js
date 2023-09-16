const express = require("express"),
  router = express.Router();
const { checkToken } = require("../validation/token-validation");
const { like, unLike } = require("../controllers/likes.controller");

router.post("/:pid", checkToken, like);
router.delete("/:pid", checkToken, unLike);
module.exports = router;
