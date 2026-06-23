import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { session_id, athlete_id } = body;
  if (!session_id || !athlete_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // TODO: create Stripe PaymentIntent + insert booking
  return NextResponse.json({ message: "Booking initiated — connect Stripe to process payment", client_secret: null });
}
