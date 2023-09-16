const db = require("../db");

module.exports.getPosts = async () => {
  try {
    const [posts] = await db.query("SELECT * FROM posts");
    return posts;
  } catch (e) {
    console.log(e);
    return [];
  }
};

module.exports.getPostById = async (id) => {
  try {
    const [post] = await db.query("SELECT * FROM posts WHERE pid = ?", [id]);
    return post;
  } catch (e) {
    console.log(e);
    return [];
  }
};

module.exports.deletePost = async (id) => {
  try {
    const [{ affectedRows }] = await db.query(
      "DELETE FROM posts WHERE pid = ?",
      [id],
    );
    return affectedRows;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

module.exports.addPost = async (uid, body) => {
  try {
    const [{ affectedRows }] = await db.query(
      "INSERT INTO posts (`uid`, `value`) VALUES (?,?)",
      [uid, body.value],
    );
    return affectedRows;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

module.exports.editPost = async (pid, uid, body) => {
  try {
    const sql = `UPDATE posts SET uid = ?, value = ? WHERE pid = ?`;
    const [{ affectedRows }] = await db.query(sql, [uid, body.value, pid]);
    return affectedRows;
  } catch (e) {
    console.log(e);
    return 0;
  }
};
