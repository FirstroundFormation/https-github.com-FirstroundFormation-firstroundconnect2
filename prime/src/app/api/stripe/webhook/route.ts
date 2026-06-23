import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });

  const stripe = new Stripe(stripeKey);
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature")!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log("Payment succeeded:", pi.metadata.booking_id);
      // TODO: update booking + create transfer 80%
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log("Payment failed:", pi.metadata.booking_id);
      break;
    }
    case "account.updated": {
      const account = event.data.object as Stripe.Account;
      console.log("Account updated:", account.id);
      break;
    }
    case "transfer.created": {
      const transfer = event.data.object as Stripe.Transfer;
      console.log("Transfer created:", transfer.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
