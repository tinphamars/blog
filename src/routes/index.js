const blogs = require("./blogs");
const login = require("./login");
const admin = require("./admin");
const indexController = require("../controllers/indexController");

const indexRoute = (app, passport) => {
  app.use("/blogs", blogs);
  app.use("/login", login);
  app.use("/admin", isLoggedIn, admin);
  // app.get("/dashboard", isLoggedIn, indexController.index);

  app.post(
    "/sign-in",
    passport.authenticate("sign-in", {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );

  app.get("/", indexController.index);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) 
      return next();
    res.redirect("/login");
  }

  app.all("*", (req, res, next) => {
    // next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
    res.send('page not found');
  });
};

module.exports = indexRoute;
