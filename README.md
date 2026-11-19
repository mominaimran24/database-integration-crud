# Database Integration (CRUD) API

**DecodeLabs – Industrial Training Program, Batch 2026**

## Project Overview

This project demonstrates how to integrate a REST API with a PostgreSQL database using Node.js, Express.js, and Prisma ORM.

The API performs complete CRUD (Create, Read, Update, Delete) operations on user records. Data is stored permanently in PostgreSQL and remains available even after the server restarts.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Postman
- JavaScript

## Database Schema

The project uses a `users` table with the following fields:

| Field | Data Type | Description |
|---|---|---|
| id | UUID | Unique user identifier |
| email | VARCHAR(255) | Unique email address |
| age | INTEGER | User age (must be non-negative) |
| is_active | BOOLEAN | Defaults to true |
| created_at | TIMESTAMPTZ | Record creation timestamp |

Database constraints include:
- UNIQUE constraint on email.
- NOT NULL constraints on required fields.
- CHECK constraint ensuring age is greater than or equal to zero.
- Default value of TRUE for is_active.

## API Endpoints

| Method | Endpoint | Description | Status |
|---|---|---|---|
| GET | / | Welcome message | 200 |
| POST | /users | Create a user | 201 |
| GET | /users | Retrieve all users | 200 |
| PUT | /users/:id | Update a user | 200 |
| DELETE | /users/:id | Delete a user | 204 |

## Error Handling

- **400 Bad Request:** Invalid input.
- **404 Not Found:** User does not exist.
- **409 Conflict:** Duplicate email address.
- **500 Internal Server Error:** Unexpected server error.

Prisma's P2002 error code is handled to detect duplicate email addresses.

## Project Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd database-integration-crud
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/decode_labs_db"
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

### 4. Apply database migrations

```bash
npx prisma migrate deploy
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Start the server

```bash
node server.js
```

The API will run at:

`http://localhost:3000`

## API Testing

The API was tested using Postman.

| Test | Expected Status |
|---|---|
| Create user | 201 Created |
| Create duplicate email | 409 Conflict |
| Retrieve users | 200 OK |
| Update user | 200 OK |
| Delete user | 204 No Content |
| Persistence after restart | Data retained |

## Database Persistence

PostgreSQL stores user records permanently. The project was tested by creating a user, restarting the Node.js server, and retrieving the same user successfully.

## Security

- Database credentials are stored in environment variables.
- `.env` is excluded from GitHub using `.gitignore`.
- `.env.example` provides a placeholder connection string.

## Author

**Momina Imran**

DecodeLabs Industrial Training Program – Batch 2026