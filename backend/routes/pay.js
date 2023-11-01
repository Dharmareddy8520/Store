import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(
  "sk_test_51O7eCbSACSkgw9V4EkB2JvwfjKpvzguiBc0Ffr8ESpvaKlvQHZ4Gy9bqC3em2gdf6m2NywhqwxVB8oy5lzXlCuhd00L1LN3otq"
);

router.post("/", async (req, res) => {
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

export default router;
