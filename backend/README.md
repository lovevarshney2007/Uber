# Backend API Documentation

## `POST /api/users/register`

Register a new user account.

### Description
Creates a new user with a full name, email, and password. The password is hashed before being stored. On success, it returns a JSON response with a success message, an authentication token, and the created user data.

### Request URL
`http://<HOST>:<PORT>/api/users/register`

### Request Headers
- `Content-Type: application/json`

### Request Body
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

### Required Fields
- `fullName.firstName` (string): must be at least 3 characters
- `fullName.lastName` (string): must be at least 3 characters
- `email` (string): must be a valid email address
- `password` (string): must be at least 6 characters and contain at least one uppercase letter and one number

### Success Response
- Status: `201 Created`

### Example Response
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

### Error Responses
- `400 Bad Request`
  - Validation errors when required fields are missing or invalid.
  - Example:
```json
{
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```
- `500 Internal Server Error`
  - Server-side error during registration.

### Notes
- The endpoint expects JSON data in the request body.
- All required fields must be included together in the request payload.
- `fullName` is an object containing `firstName` and `lastName`.
