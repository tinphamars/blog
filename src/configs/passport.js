const bCrypt = require("crypto");

module.exports = function (passport, user) {
  const User = user;
  const LocalStrategy = require("passport-local");

  //serialize
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser(function (id, done) {
    User.findByPk(id).then(function (user, err) {
      if (user) {
        done(null, user);
      } else {
        done(null, err);
      }
    });

    // User.findByPk(id).then((user) => {
    //   done(null, user);
    // }).catch(done);
  });

  // LOCAL SIGNUP
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      function (req, email, password, done) {
        var generateHash = function (password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        User.findOne({
          where: {
            email: email,
          },
        }).then(function (user) {
          if (user) {
            return done(null, false, {
              message: "That email is already taken",
            });
          } else {
            var userPassword = generateHash(password);
            var data = {
              email: email,
              password: userPassword,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
            };

            User.create(data).then(function (newUser, created) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  // LOCAL SIGN IN
  passport.use(
    "sign-in",
    new LocalStrategy(function verify(email, password, cb) {
      User.findOne({ where: { email: email } }).then(function (user) {
        if (!user) {
          return cb(null, false, { message: "Incorrect email or password" });
        }
        // hash password after check
        if (user.password === password) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: "Incorrect email or password" });
        }
      });
    })
  );
};
