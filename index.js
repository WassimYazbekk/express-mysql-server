const express = require("express"),
  app = express();
const bodyParser = require("body-parser");
const db = require("./db"),
  likesRoutes = require("./routers/likes.router"),
  postsRoutes = require("./routers/posts.router"),
  authRoutes = require("./routers/auth.router");

require("dotenv").config();

app.use(bodyParser.json());
app.use("/api/posts", postsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/like", likesRoutes);

db.query("SELECT 1")
  .then((data) => {
    console.log("db connected");
    app.listen(process.env.PORT, () => console.log("Server started at 6969"));
  })
  .catch((err) => console.log("db connection faild \n" + err));
