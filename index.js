const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const auth = require("./middlewares/auth.middleware");

const connection = require("./config/db");

const userRoute = require("./routes/users.route");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("server is running fine");
});

app.get("/data", auth, (req, res) => {
  res.send("Private Data");
});

app.get("/student", auth, (req, res) => {
  res.send("Private Data");
});

app.get("/principal", auth, (req, res) => {
  if (req.user.role === "principal") {
    res.send("Private Data");
  } else {
    res.send("You are not authorized to sit in the principal room");
  }
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`server is running on ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
