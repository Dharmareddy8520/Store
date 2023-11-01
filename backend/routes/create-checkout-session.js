import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(
  "sk_test_51O7eCbSACSkgw9V4EkB2JvwfjKpvzguiBc0Ffr8ESpvaKlvQHZ4Gy9bqC3em2gdf6m2NywhqwxVB8oy5lzXlCuhd00L1LN3otq"
);

router.post("/", async (req, res) => {
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

export default router;
