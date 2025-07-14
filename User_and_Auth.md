
# API Documentation

## Table of Contents
- [Authentication APIs](#authentication-apis)
- [User APIs](#user-apis)
- [Admin APIs](#admin-apis)
- [Training System APIs](#training-system-apis)

---

## Authentication APIs

Base URL: `/api/auth`

### 1. Create Account (Public Registration)
**POST** `/api/auth/create-account`

Creates a new user account with default staff role.

**Request Body:**
```json
{
  "empNo": "EMP001",
  "fullName": "John Doe",
  "email": "john.doe@hospital.com",
  "password": "Password123",
  "phone": "+1234567890",
  "address": "123 Main St, City, State",
  "dateOfBirth": "1990-01-15",
  "departmentId": "department_id_here",
  "managerId": "manager_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "empNo": "EMP001",
      "fullName": "John Doe",
      "email": "john.doe@hospital.com",
      "role": "staff",
      "status": "active"
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  },
  "message": "Account created successfully"
}
```

### 2. Register User (Admin Only)
**POST** `/api/auth/register`

Admin endpoint to register users with specific roles.

**Request Body:**
```json
{
  "empNo": "EMP002",
  "fullName": "Jane Smith",
  "email": "jane.smith@hospital.com",
  "password": "Password123",
  "role": "manager",
  "status": "active",
  "phone": "+1234567891",
  "address": "456 Oak Ave, City, State",
  "dateOfBirth": "1985-03-20",
  "departmentId": "department_id_here",
  "managerId": "manager_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "empNo": "EMP002",
      "fullName": "Jane Smith",
      "email": "jane.smith@hospital.com",
      "role": "manager"
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

### 3. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john.doe@hospital.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "empNo": "EMP001",
      "fullName": "John Doe",
      "email": "john.doe@hospital.com",
      "role": "staff"
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

### 4. Logout
**POST** `/api/auth/logout`

**Response:**
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

### 5. Get Current User
**GET** `/api/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "empNo": "EMP001",
    "fullName": "John Doe",
    "email": "john.doe@hospital.com",
    "role": "staff",
    "status": "active",
    "phone": "+1234567890",
    "address": "123 Main St, City, State",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "departmentId": "department_id_here",
    "managerId": "manager_id_here",
    "lastLogin": "2025-07-14T08:30:00.000Z",
    "createdAt": "2025-07-01T10:00:00.000Z",
    "updatedAt": "2025-07-14T08:30:00.000Z"
  }
}
```

### 6. Refresh Token
**POST** `/api/auth/refresh-token`

**Request Body:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "new_jwt_access_token",
    "refreshToken": "new_jwt_refresh_token"
  }
}
```

---

## User APIs

Base URL: `/api/users`

### 1. Get User Profile
**GET** `/api/users/profile`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "empNo": "EMP001",
    "fullName": "John Doe",
    "email": "john.doe@hospital.com",
    "role": "staff",
    "status": "active",
    "phone": "+1234567890",
    "address": "123 Main St, City, State",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "departmentId": "department_id_here",
    "managerId": "manager_id_here",
    "lastLogin": "2025-07-14T08:30:00.000Z",
    "createdAt": "2025-07-01T10:00:00.000Z",
    "updatedAt": "2025-07-14T08:30:00.000Z"
  }
}
```

### 2. Update User Profile
**PUT** `/api/users/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "fullName": "John Updated Doe",
  "phone": "+1234567899",
  "address": "789 New Street, City, State",
  "dateOfBirth": "1990-01-15"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "empNo": "EMP001",
    "fullName": "John Updated Doe",
    "email": "john.doe@hospital.com",
    "role": "staff",
    "status": "active",
    "phone": "+1234567899",
    "address": "789 New Street, City, State",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "departmentId": "department_id_here",
    "managerId": "manager_id_here",
    "lastLogin": "2025-07-14T08:30:00.000Z",
    "createdAt": "2025-07-01T10:00:00.000Z",
    "updatedAt": "2025-07-14T09:00:00.000Z"
  },
  "message": "Profile updated successfully"
}
```

---

## Admin APIs

Base URL: `/api/admin`

### 1. Get All Users
**GET** `/api/admin/users`

**Headers:** `Authorization: Bearer <admin_token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (active, locked, close)
- `role` (optional): Filter by role (staff, manager, admin)
- `search` (optional): Search by name or email

**Example:** `/api/admin/users?page=1&limit=5&status=active&role=staff`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "user_id_1",
      "empNo": "EMP001",
      "fullName": "John Doe",
      "email": "john.doe@hospital.com",
      "role": "staff",
      "status": "active",
      "phone": "+1234567890",
      "address": "123 Main St, City, State",
      "dateOfBirth": "1990-01-15T00:00:00.000Z",
      "departmentId": "department_id_here",
      "managerId": "manager_id_here",
      "createdAt": "2025-07-01T10:00:00.000Z",
      "updatedAt": "2025-07-14T08:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "offset": 0
  }
}
```

### 2. Get User by ID
**GET** `/api/admin/users/:id`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "empNo": "EMP001",
    "fullName": "John Doe",
    "email": "john.doe@hospital.com",
    "role": "staff",
    "status": "active",
    "phone": "+1234567890",
    "address": "123 Main St, City, State",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "departmentId": "department_id_here",
    "managerId": "manager_id_here",
    "lastLogin": "2025-07-14T08:30:00.000Z",
    "createdAt": "2025-07-01T10:00:00.000Z",
    "updatedAt": "2025-07-14T08:30:00.000Z"
  }
}
```

### 3. Update User Status
**PUT** `/api/admin/users/:id/status`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "status": "locked"
}
```

**Valid Status Values:** `active`, `locked`, `close`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "empNo": "EMP001",
    "fullName": "John Doe",
    "email": "john.doe@hospital.com",
    "role": "staff",
    "status": "locked",
    "phone": "+1234567890",
    "address": "123 Main St, City, State",
    "dateOfBirth": "1990-01-15T00:00:00.000Z",
    "departmentId": "department_id_here",
    "managerId": "manager_id_here",
    "lastLogin": "2025-07-14T08:30:00.000Z",
    "createdAt": "2025-07-01T10:00:00.000Z",
    "updatedAt": "2025-07-14T09:15:00.000Z"
  },
  "message": "User status has been updated to locked successfully"
}
```

### 4. Get Admin Transactions (Placeholder)
**GET** `/api/admin/transactions`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "message": "Admin transaction routes - coming soon",
  "data": []
}
```

### 5. Get Audit Logs (Placeholder)
**GET** `/api/admin/audit-logs`

**Headers:** `Authorization: Bearer <admin_token>`

**Response:**
```json
{
  "success": true,
  "message": "Admin audit logs routes - coming soon",
  "data": []
}
```

---

## Training System APIs

### Departments

#### Get All Departments
**GET** `/api/departments`

**Headers:** `Authorization: Bearer <token>`

#### Create Department (Admin Only)
**POST** `/api/departments`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "name": "Emergency Department",
  "description": "Emergency medical services department"
}
```

### Trainings

#### Get All Trainings
**GET** `/api/trainings`

**Headers:** `Authorization: Bearer <token>`

#### Create Training (Admin Only)
**POST** `/api/trainings`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "trainingName": "CPR Certification",
  "department": "department_id_here",
  "content": "Cardiopulmonary resuscitation training and certification",
  "lastDate": "2025-12-31T23:59:59.000Z",
  "users": ["user_id_1", "user_id_2"]
}
```

#### Assign Users to Training (Admin Only)
**POST** `/api/trainings/:id/assign`

**Headers:** `Authorization: Bearer <admin_token>`

**Request Body:**
```json
{
  "users": ["user_id_3", "user_id_4"]
}
```

### User Training Management

#### Get My Trainings
**GET** `/api/user-trainings/my-trainings`

**Headers:** `Authorization: Bearer <token>`

#### Update Training Status
**PUT** `/api/user-trainings/:id/status`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "completed"
}
```

**Valid Status Values:** `pending`, `inprogress`, `completed`, `expired`

#### Get Compliance Dashboard (Admin/Manager)
**GET** `/api/user-trainings/compliance-dashboard`

**Headers:** `Authorization: Bearer <admin_or_manager_token>`

**Query Parameters:**
- `departmentId` (optional): Filter by department

### Notifications

#### Get My Notifications
**GET** `/api/notifications/my-notifications`

**Headers:** `Authorization: Bearer <token>`

#### Get All Notifications (Admin Only)
**GET** `/api/notifications`

**Headers:** `Authorization: Bearer <admin_token>`

---

## Error Responses

All endpoints can return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation Error",
  "details": ["Field specific error messages"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "User role 'staff' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Server Error",
  "message": "Internal server error occurred"
}
```

---

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Role-Based Access:
- **Staff**: Can access their own profile and training records
- **Manager**: Can view team compliance, own profile and training records
- **Admin**: Full access to all endpoints

### Token Expiration:
- **Access Token**: 15 minutes (configurable)
- **Refresh Token**: 7 days (configurable)

Use the refresh token endpoint to get new access tokens when they expire.
