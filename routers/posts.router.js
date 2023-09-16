const express = require("express"),
  router = express.Router();

const {
  getPosts,
  getPostById,
  addPost,
  deletePost,
  editPost,
} = require("../controllers/posts.controller");
const { checkToken, checkOwner } = require("../validation/token-validation");

router.get("/", checkToken, getPosts);
router.get("/:pid", checkToken, getPostById);
router.post("/", checkToken, addPost);
router.delete("/:pid", checkOwner, deletePost);
router.put("/:pid", checkOwner, editPost);

module.exports = router;
