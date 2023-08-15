const blogs = require("./blogs");
const login = require("./login");
const indexController = require("../controllers/indexController");

const indexRoute = (app) => {
  app.use("/blogs", blogs);
	app.use("/login", login);
	app.get("/", indexController.index);
	
	app.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
  });

};

module.exports = indexRoute;
