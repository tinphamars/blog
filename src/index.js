const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const session = require("express-session");
const passport = require("passport");
const connectFlash = require("connect-flash");
const configPassport = require("./configs/passport");
const indexRoute = require("./route");
const User = require("./models/user");
const app = express();
dotenv.config();

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set template for application
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "development",
    resave: true, // don't save session if unmodified
    saveUninitialized: true,
    cookie: { expires: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
app.use(passport.authenticate("session"));
app.use(csrf());

app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  res.locals.user = req.user;
  req.session.messages = [];
  next();
});

app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Connect Flash
app.use(connectFlash());

// config helmet allow for image
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);

app.get("/flash", function (req, res) {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash("info", "Flash is back!");
  res.redirect("/");
});

configPassport(passport, User);
// SET router
indexRoute(app, passport);

const port = process.env.APP_PORT || 6789;
app.listen(port, () => {
  console.log("Hello world! How are you !!!" + port);
});
