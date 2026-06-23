export type UserRole = 'athlete' | 'gym' | 'admin';
export type Gender = 'M' | 'F';
export type TargetComp = 'hyrox' | 'athx' | 'trail' | 'marathon' | 'crossfit' | 'triathlon';
export type SessionStatus = 'scheduled' | 'completed' | 'cancelled';
export type BookingStatus = 'pending' | 'paid' | 'refunded';
export type TransferStatus = 'pending' | 'completed' | 'failed';
export type Tier = 'Elite' | 'Avancé' | 'Intermédiaire' | 'Débutant';
export type Grade = 'A' | 'B' | 'C' | 'D';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Athlete {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  birth_year: number;
  gender: Gender;
  city: string;
  target_competition: TargetComp;
  photo_url?: string;
  created_at: string;
}

export interface Gym {
  id: string;
  user_id: string;
  name: string;
  address: string;
  city: string;
  zip_code: string;
  description?: string;
  equipment: Record<string, boolean>;
  photo_url?: string;
  stripe_account_id?: string;
  is_active: boolean;
  affiliation_fee_paid: boolean;
  lat?: number;
  lng?: number;
  created_at: string;
}

export interface Session {
  id: string;
  gym_id: string;
  date: string;
  max_participants: number;
  price_cents: number;
  status: SessionStatus;
  created_at: string;
  gym?: Gym;
  bookings_count?: number;
}

export interface Booking {
  id: string;
  session_id: string;
  athlete_id: string;
  stripe_payment_intent_id?: string;
  amount_cents: number;
  status: BookingStatus;
  created_at: string;
  session?: Session;
  athlete?: Athlete;
}

export interface ScoreInput {
  rowing_2km_seconds: number;
  run_6min_meters: number;
  wall_balls_5min_reps: number;
  pushups_max_reps: number;
  broad_jump_cm: number;
  push_press_amrap_reps: number;
  deadlift_5rm_kg: number;
  body_weight_kg: number;
  farmers_carry_meters: number;
  overhead_squat_grade: Grade;
  hip_flexor_grade: Grade;
  gender: Gender;
}

export interface Score {
  id: string;
  booking_id: string;
  athlete_id: string;
  session_id: string;
  gym_id: string;
  scored_by: string;
  rowing_2km_seconds: number;
  run_6min_meters: number;
  wall_balls_5min_reps: number;
  pushups_max_reps: number;
  broad_jump_cm: number;
  push_press_amrap_reps: number;
  deadlift_5rm_kg: number;
  farmers_carry_meters: number;
  overhead_squat_grade: Grade;
  hip_flexor_grade: Grade;
  score_cardio: number;
  score_resistance: number;
  score_puissance: number;
  score_force: number;
  score_mobilite: number;
  prime_score: number;
  tier: Tier;
  created_at: string;
  athlete?: Athlete;
}

export interface Transfer {
  id: string;
  booking_id: string;
  gym_id: string;
  stripe_transfer_id?: string;
  amount_cents: number;
  status: TransferStatus;
  created_at: string;
}
