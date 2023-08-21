import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";

const app = express();
dotenv.config();

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect('mongodb+srv://tdhruv9781:Tdhruv123@cluster0.pkejjee.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      console.log("connect to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, "1234567sadvlbhj");
    const { password, ...othersData } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(othersData);
  } catch (err) {
    next(err);
  }
}
);
app.use("/api/tweets", tweetRoutes);
app.use("/api/users", userRoutes);
app.listen(8000, () => {
  connect();
  console.log("Listening to port 8000");
});
