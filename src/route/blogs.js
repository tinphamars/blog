const express = require("express");

const route = express.Router();
const blogController = require("../controllers/blogController");

// GET request to /api/products
// route.get("/", blogController.index);

// PUT request to /api/products:id
route.get("/:slug", blogController.detail);

module.exports = route;
