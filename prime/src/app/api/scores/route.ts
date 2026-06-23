import { NextResponse } from "next/server";
import { computePrimeScore } from "@/lib/scoring";
import type { ScoreInput } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.json();
  const { booking_id, athlete_id, session_id, gym_id, scored_by, gender, body_weight_kg, ...perf } = body;
  if (!booking_id || !athlete_id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const input: ScoreInput = { ...perf, gender, body_weight_kg };
  const computed = computePrimeScore(input);
  // TODO: insert into Supabase scores table + send scorecard email
  return NextResponse.json({
    message: "Score computed",
    score: { ...computed, booking_id, athlete_id, session_id, gym_id, scored_by },
  });
}
