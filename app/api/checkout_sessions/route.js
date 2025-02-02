// route for the stripe api

import { NextResponse } from "next/server";
import Stripe from "stripe";

// formats amount $ to cents?
const formatAmountForStripe = (amount, currency) => {
  return Math.round(amount * 100);
};

// the stripe object
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15", // double check this
});

export async function POST(req) {
  try {
    const { plan } = await req.json();
    const planConfig = {
      basic: {
        amount: 5,
        name: "Basic subscription",
      },
      pro: {
        amount: 10,
        name: "Pro subscription",
      },
    };
    if (!planConfig[plan]) {
      return NextResponse.json(
        { error: { message: "Invalid plan selected " } },
        { status: 400 }
      );
    }
    const params = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planConfig[plan].name,
            },
            unit_amount: formatAmountForStripe(planConfig[plan].amount, "usd"), // $10.00 per month
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      // the URLs redirect the user after the payment process
      success_url: `${req.headers.get(
        "Referer"
      )}result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get(
        "Referer"
      )}result?session_id={CHECKOUT_SESSION_ID}`,
    };

    // creates the checkout session
    const checkoutSession = await stripe.checkout.sessions.create(params);

    // returns the created session as a JSON response
    return NextResponse.json(checkoutSession, {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new NextResponse(
      JSON.stringify({ error: { message: error.message } }, { status: 500 })
    );
  }
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get("session_id");

  try {
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}
