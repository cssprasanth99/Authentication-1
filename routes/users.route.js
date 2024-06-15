const express = require("express");
const UserModel = require("../models/user.model");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");

userRoute.post("/register", async (req, res) => {
  const userData = req.body;
  try {
    const user = new UserModel(userData);
    await user.save();
    res.status(200).send("Regitration successful");
  } catch (error) {
    console.log("There is error in registration", error);
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email, password });
    if (user) {
      const token = jwt.sign(
        { email: user.email, username: user.username, role: user.role },
        "masai",
        { expiresIn: "1h" }
      );
      res.send({ msg: "Login successful", token: token });
    } else {
      res.send("Login Failed");
    }
  } catch (error) {
    res.status(404).send("error in login");
  }
});

module.exports = userRoute;
