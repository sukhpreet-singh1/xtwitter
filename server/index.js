import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";

const app = express();
dotenv.config();
const __dirname = path.resolve();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connect to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname + "/public")));
app.use("/auth", authRoutes);
app.use("/tweets", tweetRoutes);
app.use("/users", userRoutes);

app.listen(process.env.PORT || 8000, () => {
  connect();
  console.log("Listening to port 8000");
});
