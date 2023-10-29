//initializes
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const myEnv = dotenv.config();
// const https = require("https");
const fs = require("fs");
dotenvExpand.expand(myEnv);

//app
const app = express();

//port
const port = process.env.PORT;

//routes
const productRoute = require("./routes/product");
const homeRoute = require("./routes/home");
const cartRoute = require("./routes/cart");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const practiceRoute = require("./routes/practice");
const cookieParser = require("cookie-parser");

//middleware
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
    sameSite: "none",
    secure: true,
  })
);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.set("view engine", "ejs");
app.set("views", "views");

app.disable("view cache");

app.use("/", homeRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);

app.use("/practice", practiceRoute);

//mongoose
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    // const serverHTTPS = https.createServer(
    //   {
    //     key: fs.readFileSync("./cert/key.pem"),
    //     cert: fs.readFileSync("./cert/cert.pem"),
    //   },
    //   app
    // );

    // serverHTTPS.listen(port, () => {
    //   console.log("connected");
    // });

    app.listen(port, () => {
      console.log("Connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
