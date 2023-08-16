const express = require("express");

const route = express.Router();
const authController = require("../controllers/authController");

// PUT request to /api/products:id
route.get("/", authController.index);
route.post("/", authController.submit);

module.exports = route;

