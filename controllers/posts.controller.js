const service = require("../services/posts.service");

module.exports.getPosts = async (req, res) => {
  const posts = await service.getPosts();
  if (posts.length == 0) {
    res.status(404).json({
      success: 0,
      error: "no-records",
    });
  }
  res.status(200).json({
    success: 1,
    data: posts,
  });
};

module.exports.getPostById = async (req, res) => {
  const post = await service.getPostById(req.params.pid);
  if (post.length == 0)
    res.status(404).json({
      success: 0,
      error: "not-found",
    });
  else
    res.status(200).json({
      success: 1,
      data: post,
    });
};

module.exports.deletePost = async (req, res) => {
  const affectedRows = await service.deletePost(req.params.pid);
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

module.exports.addPost = async (req, res) => {
  const affectedRows = await service.addPost(res.locals.uid, req.body);
  if (affectedRows == 0)
    res.status(404).json({
      success: 0,
      error: "not-added",
    });
  else
    res.status(201).json({
      success: 1,
    });
};

module.exports.editPost = async (req, res) => {
  const affectedRows = await service.editPost(
    req.params.pid,
    res.locals.uid,
    req.body,
  );
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
