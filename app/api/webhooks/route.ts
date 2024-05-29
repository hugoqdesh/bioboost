import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Webhook signature verification failed: ${err.message}`);
    } else {
      console.error(
        "Webhook signature verification failed due to an unknown error"
      );
    }
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.mode === "subscription" && session.customer_email) {
      try {
        const user = await prisma.user.update({
          where: { email: session.customer_email },
          data: { role: "PRO" },
        });

        console.log(`Updated user ${user.id} to PRO role`);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`Failed to update user role: ${err.message}`);
        } else {
          console.error("Failed to update user role due to an unknown error");
        }
        return NextResponse.json(
          { error: "Failed to update user role" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
