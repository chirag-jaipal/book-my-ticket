-- BookMyTicket Database Schema
-- Includes: seats, users, bookings

-- =========================
-- SEATS TABLE
-- =========================
CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0
);

INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);

SELECT * FROM seats;

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

SELECT * FROM users;

-- =========================
-- BOOKINGS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  seat_id INT NOT NULL REFERENCES seats(id),
  booked_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (seat_id) -- prevent duplicate bookings
);

SELECT * FROM bookings;