import type { ScoreInput, Grade, Tier } from './types';

function rowingScore(seconds: number, gender: 'M' | 'F'): number {
  if (gender === 'M') {
    if (seconds < 390) return 18;
    if (seconds < 420) return 15;
    if (seconds < 450) return 12;
    if (seconds < 480) return 9;
    return 5;
  } else {
    if (seconds < 450) return 18;
    if (seconds < 480) return 15;
    if (seconds < 510) return 12;
    if (seconds < 540) return 9;
    return 5;
  }
}

function runScore(meters: number, gender: 'M' | 'F'): number {
  if (gender === 'M') {
    if (meters > 1600) return 17;
    if (meters > 1450) return 14;
    if (meters > 1300) return 11;
    if (meters > 1150) return 8;
    return 4;
  } else {
    if (meters > 1400) return 17;
    if (meters > 1250) return 14;
    if (meters > 1100) return 11;
    if (meters > 950) return 8;
    return 4;
  }
}

function wallBallsScore(reps: number, gender: 'M' | 'F'): number {
  if (gender === 'M') {
    if (reps > 100) return 15;
    if (reps > 80) return 12;
    if (reps > 60) return 9;
    if (reps > 40) return 6;
    return 3;
  } else {
    if (reps > 80) return 15;
    if (reps > 65) return 12;
    if (reps > 50) return 9;
    if (reps > 35) return 6;
    return 3;
  }
}

function pushupsScore(reps: number, gender: 'M' | 'F'): number {
  if (gender === 'M') {
    if (reps > 40) return 15;
    if (reps > 30) return 12;
    if (reps > 20) return 9;
    if (reps > 10) return 6;
    return 3;
  } else {
    if (reps > 25) return 15;
    if (reps > 18) return 12;
    if (reps > 12) return 9;
    if (reps > 6) return 6;
    return 3;
  }
}

function broadJumpScore(cm: number, gender: 'M' | 'F'): number {
  if (gender === 'M') {
    if (cm > 250) return 10;
    if (cm > 230) return 8;
    if (cm > 210) return 6;
    if (cm > 190) return 4;
    return 2;
  } else {
    if (cm > 210) return 10;
    if (cm > 190) return 8;
    if (cm > 170) return 6;
    if (cm > 150) return 4;
    return 2;
  }
}

function pushPressScore(reps: number): number {
  if (reps > 15) return 10;
  if (reps > 12) return 8;
  if (reps > 9) return 6;
  if (reps > 6) return 4;
  return 2;
}

function deadliftScore(kg: number, bodyWeight: number, gender: 'M' | 'F'): number {
  const ratio = bodyWeight > 0 ? kg / bodyWeight : 0;
  if (gender === 'M') {
    if (ratio > 2.5) return 5;
    if (ratio > 2.0) return 4;
    if (ratio > 1.5) return 3;
    if (ratio > 1.0) return 2;
    return 1;
  } else {
    if (ratio > 2.0) return 5;
    if (ratio > 1.6) return 4;
    if (ratio > 1.2) return 3;
    if (ratio > 0.8) return 2;
    return 1;
  }
}

function farmersScore(meters: number, gender: 'M' | 'F'): number {
  if (gender === 'M') {
    if (meters > 100) return 5;
    if (meters > 80) return 4;
    if (meters > 60) return 3;
    if (meters > 40) return 2;
    return 1;
  } else {
    if (meters > 80) return 5;
    if (meters > 60) return 4;
    if (meters > 40) return 3;
    if (meters > 20) return 2;
    return 1;
  }
}

function gradeScore(grade: Grade): number {
  const map: Record<Grade, number> = { A: 2.5, B: 2.0, C: 1.5, D: 1.0 };
  return map[grade];
}

function getTier(score: number): Tier {
  if (score >= 85) return 'Elite';
  if (score >= 65) return 'Avancé';
  if (score >= 45) return 'Intermédiaire';
  return 'Débutant';
}

export function computePrimeScore(input: ScoreInput) {
  const score_cardio = rowingScore(input.rowing_2km_seconds, input.gender) + runScore(input.run_6min_meters, input.gender);
  const score_resistance = wallBallsScore(input.wall_balls_5min_reps, input.gender) + pushupsScore(input.pushups_max_reps, input.gender);
  const score_puissance = broadJumpScore(input.broad_jump_cm, input.gender) + pushPressScore(input.push_press_amrap_reps);
  const score_force = deadliftScore(input.deadlift_5rm_kg, input.body_weight_kg, input.gender) + farmersScore(input.farmers_carry_meters, input.gender);
  const score_mobilite = Math.round(gradeScore(input.overhead_squat_grade) + gradeScore(input.hip_flexor_grade));
  const prime_score = score_cardio + score_resistance + score_puissance + score_force + score_mobilite;
  const tier = getTier(prime_score);
  return { score_cardio, score_resistance, score_puissance, score_force, score_mobilite, prime_score, tier };
}

export const PILLAR_COLORS = {
  cardio: '#3B5FCC',
  resistance: '#22C55E',
  puissance: '#C9A227',
  force: '#EF4444',
  mobilite: '#A78BFA',
};

export const PILLAR_MAX = { cardio: 35, resistance: 30, puissance: 20, force: 10, mobilite: 5 };
