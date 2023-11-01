import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_publishable_key");

const Purchase = () => {
  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "T-shirt",
                },
                unit_amount: 2000,
              },
              quantity: 1,
            },
          ],
          success_url:
            "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
          cancel_url: "https://oflatest.net/category/2023-batch/page/2/",
        }),
      }
    );

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <button role="link" onClick={handleClick}>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
        sint architecto odio hic ipsa voluptates neque nesciunt? Eaque minus
        incidunt consequatur, facilis fugiat doloremque facere, obcaecati nemo,
        omnis amet nobis.
      </h1>
      Checkout
    </button>
  );
};

export default Purchase;
