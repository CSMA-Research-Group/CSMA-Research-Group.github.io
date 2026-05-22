CREATE TABLE IF NOT EXISTS visitors (
  visitor_hash TEXT PRIMARY KEY,
  country_code TEXT,
  country_name TEXT,
  region TEXT,
  city TEXT,
  latitude REAL,
  longitude REAL,
  first_seen TEXT NOT NULL,
  last_seen TEXT NOT NULL,
  visit_count INTEGER NOT NULL DEFAULT 1,
  visitor_number INTEGER
);

CREATE TABLE IF NOT EXISTS country_stats (
  country_code TEXT PRIMARY KEY,
  country_name TEXT,
  latitude REAL,
  longitude REAL,
  visit_count INTEGER NOT NULL DEFAULT 0,
  unique_visitors INTEGER NOT NULL DEFAULT 0,
  last_seen TEXT
);

CREATE TABLE IF NOT EXISTS global_stats (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT OR IGNORE INTO global_stats (key, value) VALUES
  ('total_visits', '0'),
  ('unique_visitors', '0'),
  ('visitor_sequence', '0'),
  ('founded_at', '2026-05-19 05:19');
