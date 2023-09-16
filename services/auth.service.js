const db = require("../db");

module.exports.getUserByUsername = async (username) => {
  try {
    const [[user]] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return user;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

module.exports.addUser = async (username, password) => {
  try {
    const [{ insertId }] = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password],
    );
    return insertId;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
