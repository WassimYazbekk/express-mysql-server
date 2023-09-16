const db = require("../db");

module.exports.like = async (uid, pid) => {
  const date = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    const [[check]] = await db.query(
      "SELECT * FROM likes WHERE uid = ? AND pid =?",
      [uid, pid],
    );
    if (!check) {
      const [{ affectedRows }] = await db.query(
        "INSERT INTO likes VALUES (?,?,?,null)",
        [uid, pid, date],
      );
      return affectedRows;
    } else {
      return -1;
    }
  } catch (e) {
    console.log(e);
    return 0;
  }
};

module.exports.unLike = async (uid, pid) => {
  try {
    const [{ affectedRows }] = await db.query(
      "DELETE FROM likes WHERE uid = ? AND pid = ?",
      [uid, pid],
    );
    return affectedRows;
  } catch (e) {
    console.log(e);
    return 0;
  }
};
