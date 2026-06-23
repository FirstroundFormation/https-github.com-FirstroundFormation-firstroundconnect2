-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  role TEXT NOT NULL CHECK (role IN ('athlete', 'gym', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Athletes
CREATE TABLE athletes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_year INT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('M', 'F')),
  city TEXT NOT NULL,
  target_competition TEXT CHECK (target_competition IN ('hyrox','athx','trail','marathon','crossfit','triathlon')),
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gyms
CREATE TABLE gyms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  description TEXT,
  equipment JSONB DEFAULT '{}',
  photo_url TEXT,
  stripe_account_id TEXT,
  is_active BOOLEAN DEFAULT false,
  affiliation_fee_paid BOOLEAN DEFAULT false,
  lat NUMERIC,
  lng NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL,
  max_participants INT NOT NULL DEFAULT 10,
  price_cents INT NOT NULL DEFAULT 8500,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES athletes(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  amount_cents INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scores
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  athlete_id UUID REFERENCES athletes(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
  scored_by UUID REFERENCES users(id),
  rowing_2km_seconds INT,
  run_6min_meters INT,
  wall_balls_5min_reps INT,
  pushups_max_reps INT,
  broad_jump_cm INT,
  push_press_amrap_reps INT,
  deadlift_5rm_kg INT,
  farmers_carry_meters INT,
  overhead_squat_grade TEXT CHECK (overhead_squat_grade IN ('A','B','C','D')),
  hip_flexor_grade TEXT CHECK (hip_flexor_grade IN ('A','B','C','D')),
  score_cardio INT,
  score_resistance INT,
  score_puissance INT,
  score_force INT,
  score_mobilite INT,
  prime_score INT,
  tier TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transfers
CREATE TABLE transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  gym_id UUID REFERENCES gyms(id) ON DELETE CASCADE,
  stripe_transfer_id TEXT,
  amount_cents INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','completed','failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_sessions_gym ON sessions(gym_id);
CREATE INDEX idx_bookings_session ON bookings(session_id);
CREATE INDEX idx_bookings_athlete ON bookings(athlete_id);
CREATE INDEX idx_scores_athlete ON scores(athlete_id);
CREATE INDEX idx_transfers_booking ON transfers(booking_id);

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfers ENABLE ROW LEVEL SECURITY;
