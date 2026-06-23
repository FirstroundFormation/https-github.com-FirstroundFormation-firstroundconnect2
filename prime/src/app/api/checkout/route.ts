import { NextResponse } from "next/server";
import { SERVICES } from "@/lib/data";
import Stripe from "stripe";

export async function POST(req: Request) {
  const { serviceId } = await req.json();
  const service = SERVICES.find((s) => s.id === serviceId);
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      { url: null, message: "Stripe not configured — demo mode" },
      { status: 200 }
    );
  }

  const stripe = new Stripe(stripeKey);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: service.title,
            description: `Freelance — ${service.seller.name}`,
          },
          unit_amount: service.price * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/checkout/success?service=${service.id}`,
    cancel_url: `${baseUrl}/services/${service.id}`,
  });

  return NextResponse.json({ url: session.url });
}
