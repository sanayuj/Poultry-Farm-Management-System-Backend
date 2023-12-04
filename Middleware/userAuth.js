const jwt = require("jsonwebtoken");
const user = require("../Model/userModel");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authentication;
    const authToken = authHeader && authHeader.split(" ")[1];
    if (!authToken)
      return res.json({
        loginfail: true,
        status: false,
        message: "no auth token",
      });
    const decode = jwt.verify(authToken, "JWT");

    const user = await user.findOne({ _id: decode.id });
    if (!user) {
      return res.json({
        message: "Unauthorized access",
        status: false,
        loginFail: true,
      });
    }
    req.user = user;
    next()
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Unauthorized access",
      status: false,
      loginFail: true,
    });
  }
};
