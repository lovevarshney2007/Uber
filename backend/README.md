# Uber Clone Backend API Documentation

## Overview
Complete REST API for an Uber-like ride-sharing application with User and Captain management.

---

## TABLE OF CONTENTS
- [User Endpoints](#user-endpoints)
- [Captain Endpoints](#captain-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Quick Reference](#quick-reference)
- [Status Codes](#status-codes)
- [Example Usage](#example-usage-with-curl)

---

## USER ENDPOINTS

### 1. Register User
**Endpoint:** `POST /api/users/register`

Creates a new user account with name, email, and password.

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "Password123"
}
```

#### Validation Rules
| Field | Type | Constraints |
|-------|------|-------------|
| `fullName.firstName` | string | Required, minimum 3 characters |
| `fullName.lastName` | string | Required, minimum 3 characters |
| `email` | string | Required, must be valid email format |
| `password` | string | Required, minimum 6 characters, must contain 1 uppercase letter and 1 number |

#### Success Response (201 Created)
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "642cebc9e77b3d0012345678",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "createdAt": "2026-06-02T10:30:00.000Z",
    "updatedAt": "2026-06-02T10:30:00.000Z"
  }
}
```

#### Error Responses
**400 Bad Request** - Validation failed:
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullName.firstName"
    }
  ]
}
```

**400 Bad Request** - User already exists:
```json
{
  "message": "User with this email already exists"
}
```

---

### 2. Login User
**Endpoint:** `POST /api/users/login`

Authenticate user with email and password.

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "Password123"
}
```

#### Validation Rules
| Field | Type | Constraints |
|-------|------|-------------|
| `email` | string | Required, must be valid email format |
| `password` | string | Required, cannot be empty |

#### Success Response (200 OK)
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "642cebc9e77b3d0012345678",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "createdAt": "2026-06-02T10:30:00.000Z",
    "updatedAt": "2026-06-02T10:30:00.000Z"
  }
}
```

#### Error Responses
**400 Bad Request** - Validation failed:
```json
{
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email"
    }
  ]
}
```

**401 Unauthorized** - Invalid credentials:
```json
{
  "message": "Invalid email or password"
}
```

---

### 3. Get User Profile
**Endpoint:** `GET /api/users/profile`

Retrieve the authenticated user's profile information.

#### Request Headers
```
Content-Type: application/json
Authorization: Bearer <token>
```

#### Request Body
No body required

#### Success Response (200 OK)
```json
{
  "message": "User profile retrieved successfully",
  "user": {
    "_id": "642cebc9e77b3d0012345678",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "createdAt": "2026-06-02T10:30:00.000Z",
    "updatedAt": "2026-06-02T10:30:00.000Z"
  }
}
```

#### Error Responses
**401 Unauthorized** - No token or invalid token:
```json
{
  "message": "Unauthorized"
}
```

---

### 4. Logout User
**Endpoint:** `GET /api/users/logout`

Logout the authenticated user by blacklisting their token.

#### Request Headers
```
Content-Type: application/json
Authorization: Bearer <token>
Cookie: token=<token>
```

#### Request Body
No body required

#### Success Response (200 OK)
```json
{
  "message": "Logout successful"
}
```

#### Error Responses
**400 Bad Request** - No token provided:
```json
{
  "message": "No token provided"
}
```

**401 Unauthorized** - Invalid token:
```json
{
  "message": "Unauthorized"
}
```

---

## CAPTAIN ENDPOINTS

### 1. Register Captain
**Endpoint:** `POST /api/captains/register`

Creates a new captain account with personal information and vehicle details.

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "fullName": {
    "firstName": "Ahmed",
    "lastName": "Khan"
  },
  "email": "ahmed.khan@example.com",
  "password": "Captain@123",
  "vehicle": {
    "color": "Black",
    "plateNumber": "ABC-1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Validation Rules
| Field | Type | Constraints |
|-------|------|-------------|
| `fullName.firstName` | string | Required |
| `fullName.lastName` | string | Required |
| `email` | string | Required, must be valid email format |
| `password` | string | Required, minimum 6 characters |
| `vehicle.color` | string | Required, minimum 3 characters |
| `vehicle.plateNumber` | string | Required, minimum 3 characters |
| `vehicle.capacity` | number | Required, minimum 1 |
| `vehicle.vehicleType` | string | Required, must be one of: `car`, `auto`, `motorcycle` |

#### Success Response (201 Created)
```json
{
  "message": "Captain registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "642cebc9e77b3d0012345679",
    "fullName": {
      "firstName": "Ahmed",
      "lastName": "Khan"
    },
    "email": "ahmed.khan@example.com",
    "socketId": null,
    "status": "inactive",
    "vehicle": {
      "color": "Black",
      "plateNumber": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car",
      "location": {
        "latitude": null,
        "longitude": null
      }
    }
  }
}
```

#### Error Responses
**400 Bad Request** - Validation failed:
```json
{
  "errors": [
    {
      "msg": "First name is required",
      "param": "fullName.firstName"
    }
  ]
}
```

**400 Bad Request** - Captain already exists:
```json
{
  "message": "Captain with this email already exists"
}
```

**400 Bad Request** - Missing fields:
```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

## AUTHENTICATION

### Token Format
All endpoints requiring authentication use JWT (JSON Web Token) in the Authorization header.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration
- User tokens expire in: 24 hours
- Captain tokens expire in: 24 days

### How to Pass Token
1. **In Header (Recommended):**
   ```
   Authorization: Bearer <token>
   ```

2. **In Cookie:**
   ```
   Cookie: token=<token>
   ```

---

## ERROR HANDLING

### Standard Error Response Format

#### 400 Bad Request
```json
{
  "message": "Error description",
  "errors": [
    {
      "msg": "Specific error message",
      "param": "field_name"
    }
  ]
}
```

#### 401 Unauthorized
```json
{
  "message": "Unauthorized - Invalid or missing token"
}
```

#### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error description"
}
```

---

## QUICK REFERENCE

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/users/profile` | Get user profile | Yes |
| GET | `/api/users/logout` | Logout user | Yes |
| POST | `/api/captains/register` | Register new captain | No |

---

## STATUS CODES

| Code | Description |
|------|-------------|
| 201 | Created - Resource successfully created |
| 200 | OK - Request successful |
| 400 | Bad Request - Invalid input or validation error |
| 401 | Unauthorized - Authentication required or failed |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error occurred |

---

## EXAMPLE USAGE WITH CURL

### Register User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "Password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "Password123"
  }'
```

### Get User Profile
```bash
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer <token>"
```

### Logout User
```bash
curl -X GET http://localhost:3000/api/users/logout \
  -H "Authorization: Bearer <token>"
```

### Register Captain
```bash
curl -X POST http://localhost:3000/api/captains/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": {
      "firstName": "Ahmed",
      "lastName": "Khan"
    },
    "email": "ahmed.khan@example.com",
    "password": "Captain@123",
    "vehicle": {
      "color": "Black",
      "plateNumber": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

---

## NOTES

- All timestamps are in ISO 8601 format (UTC)
- Passwords are never returned in API responses
- Tokens should be stored securely on the client side
- Token should be included in the Authorization header for protected routes
- For logout, token is blacklisted to prevent reuse
- Email addresses must be unique for both users and captains
