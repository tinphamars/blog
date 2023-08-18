const Blog = require("../models/blog");

exports.dashboard = async (req, res) => {
  const data = await Blog.findAll();
  res.render("admin/dashboard", { data });
};
