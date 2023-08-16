const blogs = require("./blogs");
const login = require("./login");
const indexController = require("../controllers/indexController");

const indexRoute = (app, passport) => {
  app.use("/blogs", blogs);
  app.use("/login", login);
	app.get('/dashboard', isLoggedIn, indexController.isLogin)

  app.post(
    "/login",
    passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  app.get("/", indexController.index);

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/signin');
	}

  app.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
  });
};

module.exports = indexRoute;
