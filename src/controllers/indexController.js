const Blog = require('../models/blog');

exports.index = async (req, res) => {
	console.log(req.user);
	const data =	await Blog.findAll();
	res.render("index", { data });
};
