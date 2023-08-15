const Blog = require("../models/blog");
exports.detail = async (req, res, next) => {
  console.log(req.params.slug);
  const data = await Blog.findOne({ where: { slug: req.params.slug } });
  console.log(data);
  res.render("blogs/detail", { data });
};
