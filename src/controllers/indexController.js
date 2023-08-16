const Blog = require('../models/blog');

exports.index = async (req, res) => {
	const data =	await Blog.findAll();
	res.render("index", { data });
};

exports.isLogin = async (req, res) => {
	res.render("index", { data });
};