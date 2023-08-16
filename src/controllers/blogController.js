const Blog = require("../models/blog");
exports.detail = async (req, res, next) => {
  const data = await Blog.findOne({ where: { slug: req.params.slug } });
  
  res.render("blogs/detail", { data });
};
