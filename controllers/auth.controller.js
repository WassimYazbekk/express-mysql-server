const { getUserByUsername, addUser } = require("../services/auth.service");
const { hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

module.exports.register = async (req, res) => {
  const user = await getUserByUsername(req.body.username);
  if (!user) {
    const password = hashSync(req.body.password, 10);
    const result = await addUser(req.body.username, password);
    if (result) {
      const jwtoken = sign(
        { username: req.body.username, uid: result },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        },
      );
      return res.status(200).json({
        success: 1,
        token: jwtoken,
      });
    }
  }
  return res.status(404).json({
    success: 0,
    error: "user-exists",
  });
};

module.exports.login = async (req, res) => {
  const user = await getUserByUsername(req.body.username);
  if (user && user.password) {
    const result = compareSync(req.body.password, user.password);
    if (result) {
      user.password = undefined;
      const jwtoken = sign(
        { username: user.username, uid: user.uid },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        },
      );
      return res.status(200).json({
        success: 1,
        token: jwtoken,
      });
    }
  }
  return res.status(404).json({
    success: 0,
    error: "wrong-credentials",
  });
};
