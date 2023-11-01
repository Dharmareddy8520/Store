import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import newuser from "./user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import bodyParser from "body-parser";
dotenv.config();

import product from "./product.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const stripe = new Stripe(
  "sk_test_51O7eCbSACSkgw9V4EkB2JvwfjKpvzguiBc0Ffr8ESpvaKlvQHZ4Gy9bqC3em2gdf6m2NywhqwxVB8oy5lzXlCuhd00L1LN3otq"
);
app.get("/", async (req, res) => {
  res.send("hello world");
});

app.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hash = bcrypt.hashSync(password, 10);
    const nebie = await newuser.create({
      username,
      email,
      password: hash,
    });
    console.log(nebie);
    await nebie.save();
    res.status(200).send("user registered successfully in database");
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await newuser.findOne({ email: email });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        res.status(404).send("password does not match");
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, users: user._id });
        res.status(200).send("user logged in successfully");
      }
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/products", async (req, res) => {
  try {
    const { productname, price, description, imageurl, stock } = req.body;
    const r = await product.create({
      productname,
      price,
      description,
      imageurl,
      stock,
    });
    const newproduct = await r.save();
    console.log(newproduct);
    res.status(200).send("product added successfully");
  } catch (err) {
    console.log(err);
  }
});
app.post("/pay", async (req, res) => {
  try {
    const { amount, id } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });

    console.log("Payment", payment);

    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const { line_items, success_url, cancel_url } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url,
    cancel_url,
  });

  res.json({ id: session.id });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log("server started at port " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
