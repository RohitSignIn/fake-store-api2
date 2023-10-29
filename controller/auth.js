const User = require("../model/user");
const jwt = require("jsonwebtoken");

const ALL_LOGIN_USER = [];

module.exports.login = (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    User.findOne({
      username: username,
      password: password,
    })
      .then((user) => {
        if (user) {
          ALL_LOGIN_USER.push(username);
          // return res.json({
          // 	token: jwt.sign({ id: user.id, user: username }, 'secret_key'),
          // });
          let token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 Hour
              data: { id: user.id, user: username },
            },
            process.env.ACCESS_TOKEN_SECRET
          );

          res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });
          res.cookie("user_id", user.id, {
            sameSite: "none",
            secure: true,
          });
          res.cookie("username", user.username, {
            sameSite: "none",
            secure: true,
          });
          res.cookie("email", user.email, {
            sameSite: "none",
            secure: true,
          });
          res.cookie("auth", true, {
            sameSite: "none",
            secure: true,
          });
          res.send({
            success: true,
            message: "Successfully Signed in",
            user_id: user.id,
            username: user.username,
            email: user.email,
            auth: true,
          });
        } else {
          res.status(401);
          res.send({ success: false, message: "Invalid Credentials" });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("user_id");
  res.clearCookie("username");
  res.clearCookie("email");
  res.clearCookie("auth");
  res.send({ success: true, message: "Successfully Signed out" });
};
