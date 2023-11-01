import express from "express";
import product from "../product.js";

const router = express.Router();

router.post("/", async (req, res) => {
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

export default router;
