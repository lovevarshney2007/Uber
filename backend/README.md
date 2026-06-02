# Backend API Documentation

## Authentication Routes

### `POST /api/users/register`

Register a new user account.

#### Description
Creates a new user with a full name, email, and password. The password is hashed before being stored. On success, it returns a JSON response with a success message, an authentication token, and the created user data.

#### Request URL
`http://<HOST>:<PORT>/api/users/register`

#### Request Headers
- `Content-Type: application/json`

#### Request Body
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "Password1"
}
```

#### Required Fields
- `fullName.firstName` (string): must be at least 3 characters
- `fullName.lastName` (string): must be at least 3 characters
- `email` (string): must be a valid email address
- `password` (string): must be at least 6 characters and contain at least one uppercase letter and one number

#### Success Response
- Status: `201 Created`

#### Example Response
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
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:00:00.000Z"
  }
}
```

#### Error Responses
- `400 Bad Request`
  - Validation errors when required fields are missing or invalid.
- `500 Internal Server Error`
  - Server-side error during registration.

---

### `POST /api/users/login`

Authenticate a user and create a session token.

#### Description
Logs in an existing user by email and password. On success, it returns a JSON response with a success message, an authentication token, and the user data. The token is also stored in a `token` cookie.

#### Request URL
`http://<HOST>:<PORT>/api/users/login`

#### Request Headers
- `Content-Type: application/json`

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "Password1"
}
```

#### Success Response
- Status: `200 OK`

#### Example Response
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
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:00:00.000Z"
  }
}
```

#### Error Responses
- `400 Bad Request`
  - Validation errors when required fields are missing.
- `401 Unauthorized`
  - Invalid email or password.

---

### `GET /api/users/profile`

Retrieve the authenticated user's profile.

#### Description
Returns the current user's profile data using the JWT token provided via cookie or Authorization header.

#### Request URL
`http://<HOST>:<PORT>/api/users/profile`

#### Request Headers
- `Authorization: Bearer <token>`
- Or send the cookie named `token` received during login.

#### Success Response
- Status: `200 OK`

#### Example Response
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
    "createdAt": "2026-05-31T12:00:00.000Z",
    "updatedAt": "2026-05-31T12:00:00.000Z"
  }
}
```

#### Error Responses
- `401 Unauthorized`
  - No token provided.
  - Invalid token.
  - Token is blacklisted.

---

### `GET /api/users/logout`

Log out the authenticated user.

#### Description
Invalidates the current token by adding it to the blacklist and clears the `token` cookie.

#### Request URL
`http://<HOST>:<PORT>/api/users/logout`

#### Request Headers
- `Authorization: Bearer <token>`
- Or send the cookie named `token`.

#### Success Response
- Status: `200 OK`

#### Example Response
```json
{
  "message": "Logout successful"
}
```

#### Error Responses
- `400 Bad Request`
  - No token provided.
- `401 Unauthorized`
  - Invalid token.
  - Token is blacklisted.

---

## Notes

- All protected routes (`/profile`, `/logout`) require authentication.
- Tokens may be supplied either as a `Bearer` token in the `Authorization` header or via the `token` cookie.
- `fullName` is an object containing `firstName` and `lastName`.
