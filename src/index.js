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
const indexRoute = require("./route");
const app = express();
dotenv.config();

// SET router
indexRoute(app);

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set template for application
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  cors({
    origin: "http://localhost:1010",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(csrf());
app.use(passport.authenticate("session"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});
app.use(function (req, res, next) {
  console.log(req.session.messages)
  console.log(req.session.messages)
  res.locals.csrfToken = req.csrfToken();
  next();
});
// config helmet allow for image
// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "img-src": ["'self'", "https: data:"],
//     },
//   })
// );

const port = process.env.APP_PORT || 6789;
app.listen(port, () => {
  console.log("Hello world! How are you !!!" + port);
});
