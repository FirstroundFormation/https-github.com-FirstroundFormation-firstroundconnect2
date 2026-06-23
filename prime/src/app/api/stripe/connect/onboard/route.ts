import { NextResponse } from "next/server";
import { createConnectedAccount, createAccountLink } from "@/lib/stripe";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured — add STRIPE_SECRET_KEY" }, { status: 500 });
  }
  const { gym_id, email } = await req.json();
  if (!gym_id || !email) return NextResponse.json({ error: "Missing gym_id or email" }, { status: 400 });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const account = await createConnectedAccount(email);
  const link = await createAccountLink(account.id, `${baseUrl}/gym/dashboard`, `${baseUrl}/gym/dashboard`);

  // TODO: store account.id in Supabase gyms table
  return NextResponse.json({ url: link.url, account_id: account.id });
}
