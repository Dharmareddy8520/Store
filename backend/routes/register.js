import express from "express";
import newuser from "../user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req, res) => {
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

export default router;
