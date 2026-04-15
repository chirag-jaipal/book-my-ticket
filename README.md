# Book My Ticket — Backend System

A production-style backend system built by extending an existing codebase.  
Implements authentication, protected booking flow, and concurrency-safe seat booking using PostgreSQL.

---

## Features

- User Registration & Login (JWT-based authentication)
- Protected Routes using middleware
- Seat Booking System
- Concurrency-safe booking using **transactions + row locking (FOR UPDATE)**
- Duplicate booking prevention (DB constraint + logic)
- Backward compatibility with existing endpoints

---

## Tech Stack

- **Node.js + Express**
- **PostgreSQL (pg)**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **Zod (validation)**

---

## Project Structure

```
src/
├── common/
│ ├── db/
│ ├── dto/
│ ├── middleware/
│ └── utils/
│
├── modules/
│ ├── auth/
│ │ ├── dto/
│ │ ├── auth.routes.js
│ │ ├── auth.controller.js
│ │ └── auth.service.js
│
│ └── booking/
│ ├── booking.routes.js
│ ├── booking.controller.js
│ └── booking.service.js
│
├── .env
├── index.mjs
├── index.html
├── package.json
└── README.md
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-link>
cd book-my-ticket
```

### 2. Install Dependencies

```bash
npm install
```

---

## Authentication Flow

1. User registers via `/auth/register`
2. User logs in via `/auth/login`
3. Server returns a JWT token
4. Client sends token in headers:

```bash
Authorization: Bearer <token>
```

5. Middleware verifies token and attaches user to `req.user`

---

## Booking Flow (Core Logic)

```bash
Request → Auth Middleware → Service → DB Transaction
```

Steps:

1. Begin transaction
2. Lock seat using `FOR UPDATE`
3. Check if seat is available
4. Insert into `bookings` table
5. Update `seats.isbooked`
6. Commit transaction

---

## API Endpoints

### Auth

| Method | Route          | Description   |
| ------ | -------------- | ------------- |
| POST   | /auth/register | Register user |
| POST   | /auth/login    | Login user    |

---

### Booking (Protected)

| Method | Route     | Description                |
| ------ | --------- | -------------------------- |
| PUT    | /book/:id | Book a seat (requires JWT) |

---

### Legacy (Unchanged)

| Method | Route      |
| ------ | ---------- |
| PUT    | /:id/:name |
| GET    | /seats     |

> Preserved for backward compatibility

---

## Error Handling

- Centralized error handling middleware
- Zod validation errors formatted into readable responses
- Custom `ApiError` used for consistent error handling
- No sensitive data exposed in API responses

---

## Notes

- Existing endpoints were preserved as per assignment instructions
- New authenticated booking flow implemented separately
- Frontend is optional and not modified

---

## Author

Chirag Jaipal
