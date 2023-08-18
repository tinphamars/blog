const User = require("../models/user");

exports.index = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/admin/dashboard");
  }
  res.render("login");
};

exports.submit = async (req, res) => {
  res.render("login");
};
