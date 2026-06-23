import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ sessions: [] });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { gym_id, date, max_participants, price_cents } = body;
  if (!gym_id || !date || !max_participants) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // TODO: insert into Supabase sessions table
  return NextResponse.json({ message: "Session created", data: { gym_id, date, max_participants, price_cents: price_cents ?? 8500 } }, { status: 201 });
}
