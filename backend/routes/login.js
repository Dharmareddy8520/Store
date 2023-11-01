import express from "express";
import newuser from "../user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
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

export default router;
