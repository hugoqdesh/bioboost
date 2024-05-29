import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1PKmLJEB8n3HbxCXSb1wbMi5",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("An unknown error occurred");
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
