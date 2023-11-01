import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import register from "./routes/register.js";
import Stripe from "stripe";
import login from "./routes/login.js";
import product from "./routes/product.js";
import pay from "./routes/pay.js";
import createCheckoutSession from "./routes/create-checkout-session.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const stripe = new Stripe(
  "sk_test_51O7eCbSACSkgw9V4EkB2JvwfjKpvzguiBc0Ffr8ESpvaKlvQHZ4Gy9bqC3em2gdf6m2NywhqwxVB8oy5lzXlCuhd00L1LN3otq"
);
app.get("/", async (req, res) => {
  res.send("hello world");
});

app.use("/register", register);
app.use("/login", login);
app.use("/product", product);
app.use("/pay", pay);
app.use("/create-checkout-session", createCheckoutSession);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log("server started at port " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
