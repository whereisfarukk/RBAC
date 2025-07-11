require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const chalk = require("chalk");
const PORT = process.env.PORT || 8080;

const session = require("express-session");
const connectFlash = require("connect-flash");

// importing all routes

const indexRoute = require("./route/indexRoute");
const userRoute = require("./route/userRoute");
const authRoute = require("./route/authRoute");

app.use(morgan("dev"));

//these two lines for ejs accessibity and rendering
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// init session
app.use(
  session({
    secret: "itsasecreat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true, // only use when the server in https
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  })
);
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/*splat", (req, res) => {
  res.send("jfdns");
});
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  error.status = error.status || 500;
  res.status(error.status).send(error);
  //   res.send(error);
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gaywc.mongodb.net/rbac`
    // `mongodb+srv://omarf6197:mynameisfaruk@cluster0.gaywc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.white.inverse(`🚀 app is listening in port ${PORT}`));
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
