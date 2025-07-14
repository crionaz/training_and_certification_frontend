# Training and Certification Tracking System

This system implements a comprehensive training and certification tracking solution for hospital staff. Below are the available APIs:

## API Endpoints

### Authentication & Users
- `POST /api/auth/register` - Register a new user (Admin only)
- `POST /api/auth/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get single department
- `POST /api/departments` - Create department (Admin only)
- `PUT /api/departments/:id` - Update department (Admin only)
- `DELETE /api/departments/:id` - Delete department (Admin only)

### Trainings
- `GET /api/trainings` - Get all trainings
- `GET /api/trainings/:id` - Get single training
- `POST /api/trainings` - Create training (Admin only)
- `PUT /api/trainings/:id` - Update training (Admin only)
- `POST /api/trainings/:id/assign` - Assign users to training (Admin only)
- `DELETE /api/trainings/:id` - Delete training (Admin only)

### User Training Management
- `GET /api/user-trainings/my-trainings` - Get user's own training records
- `GET /api/user-trainings` - Get all user training records (Admin/Manager)
- `PUT /api/user-trainings/:id/status` - Update training status
- `GET /api/user-trainings/compliance-dashboard` - Get compliance dashboard (Admin/Manager)

### Notifications
- `GET /api/notifications/my-notifications` - Get user's notifications
- `GET /api/notifications` - Get all notifications (Admin only)
- `PUT /api/notifications/:id/mark-sent` - Mark notification as sent (Admin only)

## User Roles

1. **Staff** - Regular employees who attend training
2. **Manager** - Can view compliance for their team
3. **Admin** - Full access to schedule training, update records

## Key Features Implemented

1. **Training Scheduling** - Admins can create and schedule training sessions
2. **Certification Tracking** - Digital records of completed training and certifications
3. **Alerts and Reminders** - Automatic notifications for assignments and compliance
4. **Reporting** - Compliance dashboards for managers and admins
5. **User Management** - Role-based access control

## Sample API Usage

### Create a Department
```bash
POST /api/departments
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Emergency Department",
  "description": "Emergency medical services department"
}
```

### Create a Training
```bash
POST /api/trainings
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "trainingName": "CPR Certification",
  "department": "department_id_here",
  "content": "Cardiopulmonary resuscitation training and certification",
  "lastDate": "2025-12-31T23:59:59.000Z",
  "users": ["user_id_1", "user_id_2"]
}
```

### Update Training Status
```bash
PUT /api/user-trainings/:id/status
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "status": "completed"
}
```

### Get Compliance Dashboard
```bash
GET /api/user-trainings/compliance-dashboard?departmentId=dept_id
Authorization: Bearer <manager_token>
```

## Database Schema

The system uses the following main collections:
- **Users** - Staff information with employee numbers, departments, and roles
- **Departments** - Organizational departments
- **Training** - Training sessions and requirements
- **UserTraining** - Individual training records and status
- **Certification** - Completed certifications
- **Logs** - Audit trail of training activities
- **Notification** - System notifications and alerts

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables (see `.env.example`)
3. Build the project: `npm run build`
4. Start the server: `npm run dev`

The server will start on the configured port (default: 3000).
