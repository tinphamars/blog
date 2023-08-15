const User = require('../models/user');

exports.index = (req, res) => {
	res.render("login");
};

exports.submit = async (req, res) => {
	res.render("login");
};