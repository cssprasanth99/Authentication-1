const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, "masai", (err, decoded) => {
    if (err) {
      res.send("please login first");
    } else {
      req.body = decoded;
      console.log(decoded);
      next();
    }
  });
};

module.exports = auth;
