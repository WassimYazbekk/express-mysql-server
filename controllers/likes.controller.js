const service = require("../services/likes.service");

module.exports.like = async (req, res) => {
  const affectedRows = await service.like(res.locals.uid, req.params.pid);
  if (affectedRows == 0)
    res.status(404).json({
      success: 0,
      error: "not-found",
    });
  else if (affectedRows < 0) {
    res.status(404).json({
      success: 0,
      error: "already-liked",
    });
  } else
    res.status(200).json({
      success: 1,
    });
};
module.exports.unLike = async (req, res) => {
  const affectedRows = await service.unLike(res.locals.uid, req.params.pid);
  if (affectedRows == 0)
    res.status(404).json({
      success: 0,
      error: "not-found",
    });
  else
    res.status(200).json({
      success: 1,
    });
};
