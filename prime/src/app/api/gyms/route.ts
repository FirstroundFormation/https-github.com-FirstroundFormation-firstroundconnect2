import { NextResponse } from "next/server";

export async function GET() {
  // TODO: replace with Supabase query
  return NextResponse.json({ gyms: [], message: "Connect Supabase to fetch live data" });
}
