const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      imgUrl: req.body.imgUrl,
    });

    user
      .save()
      .then((user) => {
        res.json({
          message: "User Added Successfully",
        });
      })
      .catch((error) => {
        res.json({
          message: "An error occured",
        });
      });
  });
};

const login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign(
            { email: user.email },
            process.env.ACCESS_TOKET_SECRET,
            {
              expiresIn: process.env.ACCESS_TOKET_EXPIRE_TIME,
            }
          );

          let refreshtoken = jwt.sign(
            { email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
            }
          );
          res.status(200).json({
            message: "Login Successful!",
            token,
            refreshtoken,
          });
        } else {
          res.status(200).json({
            message: "Password does not matched",
          });
        }
      });
    } else {
      res.json({
        message: "No user found",
      });
    }
  });
};

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, "refreshTokensecret", function (err, decode) {
    if (err) {
      res.status(400).json({
        err,
      });
    } else {
      let token = jwt.sign(
        { email: decode.email },
        process.env.ACCESS_TOKET_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKET_EXPIRE_TIME,
        }
      );

      let refreshToken = req.body.refreshToken;
      res.status(200).json({
        message: "Token refreshed successfully!",
        token,
        refreshToken,
      });
    }
  });
};

module.exports = {
  register,
  login,
  refreshToken,
};
