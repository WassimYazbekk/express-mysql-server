const { verify } = require("jsonwebtoken");
const { getPostById } = require("../services/posts.service");
require("dotenv").config();

module.exports.checkToken = async (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.status(404).json({
          success: 0,
          error: "invalid-token",
        });
      } else {
        res.locals.uid = decoded.uid;

        next();
      }
    });
  } else {
    res.status(404).json({
      success: 0,
      error: "access-denied",
    });
  }
};

module.exports.checkOwner = async (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    const [post] = await getPostById(req.params.pid);
    verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        res.status(404).json({
          success: 0,
          error: "invalid-token",
        });
      } else if (decoded.uid == post.uid) {
        res.locals.uid = decoded.uid;
        next();
      } else {
        res.status(404).json({
          success: 0,
          error: "access-denied",
        });
      }
    });
  } else {
    res.status(404).json({
      success: 0,
      error: "access-denied",
    });
  }
};
