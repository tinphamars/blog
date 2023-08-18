const express = require("express");

const route = express.Router();
const adminController = require("../controllers/adminController");
const postController = require("../controllers/admin/postController");

// GET request to /admin/dashboard
route.get("/dashboard", adminController.dashboard);

route.get("/posts/:id/edit", postController.edit);
route.post("/posts/delete", postController.delete);
route.post("/posts/create", postController.store);
route.get("/posts/create", postController.create);

module.exports = route;
