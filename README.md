# Task Manager Application

A full-stack task management application built for the Full-Stack Development Intern assignment. Users can sign up, log in, and manage their personal tasks with CRUD operations.

## Features

### Core Requirements
- User authentication (signup/login) with JWT
- Task CRUD operations (Create, Read, Update, Delete)
- Task status management (todo, in-progress, done)
- Due date tracking
- User-specific task isolation

### Additional Features
- Material-UI for better UI/UX
- Form validation and error handling
- Task filtering and sorting
- Search functionality
- Responsive design
- Toast notifications for user feedback

## Tech Stack

### Backend
- **NestJS** - Node.js framework with TypeScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety

### Frontend
- **React** - Frontend framework
- **TypeScript** - Type safety
- **Material-UI** - UI component library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── tasks/          # Task management module
│   │   ├── users/          # User management module
│   │   └── main.ts         # Application entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/            # API service layer
│   │   ├── components/     # Reusable components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and validation
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Helper functions
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- Node.js (v18 or higher) - [Download here](https://nodejs.org/)
- MongoDB (local or cloud) - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud
- Yarn or npm (I used Yarn, but npm works too)

### Backend Setup

1. **Clone and navigate to the backend:**
```bash
git clone <your-repo-url>
cd task-manager/backend
```

2. **Install dependencies:**
```bash
yarn install
# or npm install
```

3. **Set up environment variables:**
Create a `.env` file in the backend directory with:
```env
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=3600s
PORT=3000
```

4. **Start the development server:**
```bash
yarn start:dev
# or npm run start:dev
```

The backend API will be running at `http://localhost:3000`

### Frontend Setup

1. **Navigate to the frontend directory:**
```bash
cd ../frontend
```

2. **Install dependencies:**
```bash
yarn install
# or npm install
```

3. **Start the development server:**
```bash
yarn dev
# or npm run dev
```

The frontend will be available at `http://localhost:5173`

### Database Setup

If you're using local MongoDB:
1. Make sure MongoDB is running on your machine
2. The app will automatically create the `task-manager` database
3. Collections (`users` and `tasks`) will be created automatically when you first use the app

If you're using MongoDB Atlas:
1. Create a cluster and get your connection string
2. Replace the `MONGO_URI` in your `.env` file with your Atlas connection string

## 📚 API Documentation

Here are all the API endpoints I built. I've also included a Postman collection file (`Task_Manager.postman_collection.json`) that you can import to test the APIs easily.

### Authentication Endpoints

#### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /users/signup
Create a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "userId": "68dc0b3be108c326e64ae63d"
}
```

#### GET /users/me
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "_id": "68dc0b3be108c326e64ae63d",
  "username": "johndoe",
  "email": "user@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Task Endpoints

All task endpoints require authentication (Bearer token in Authorization header).

#### GET /tasks
Get all tasks for the authenticated user.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
[
  {
    "_id": "68dc0b8de108c326e64ae641",
    "title": "Finish Project",
    "description": "Complete backend and frontend integration",
    "status": "todo",
    "dueDate": "2024-01-15T00:00:00.000Z",
    "userId": "68dc0b3be108c326e64ae63d",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### POST /tasks
Create a new task.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description (optional)",
  "status": "todo",
  "dueDate": "2024-01-15T00:00:00.000Z"
}
```

**Response:**
```json
{
  "_id": "68dc0b8de108c326e64ae641",
  "title": "Task title",
  "description": "Task description",
  "status": "todo",
  "dueDate": "2024-01-15T00:00:00.000Z",
  "userId": "68dc0b3be108c326e64ae63d",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### GET /tasks/:id
Get a specific task by ID.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "_id": "68dc0b8de108c326e64ae641",
  "title": "Task title",
  "description": "Task description",
  "status": "todo",
  "dueDate": "2024-01-15T00:00:00.000Z",
  "userId": "68dc0b3be108c326e64ae63d",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PATCH /tasks/:id
Update a task.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "dueDate": "2024-01-20T00:00:00.000Z"
}
```

**Response:**
```json
{
  "_id": "68dc0b8de108c326e64ae641",
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "dueDate": "2024-01-20T00:00:00.000Z",
  "userId": "68dc0b3be108c326e64ae63d",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### DELETE /tasks/:id
Delete a task.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```
HTTP 200 OK (no body)
```

## Development Notes

- Used TypeScript for type safety
- Implemented proper error handling
- Used custom hooks for state management
- Added form validation with Zod
- Implemented responsive design with Material-UI

## Assumptions and Decisions

- Used MongoDB instead of PostgreSQL/MySQL for faster development
- Implemented JWT authentication instead of sessions for stateless API
- Used Material-UI for quick UI development instead of custom CSS
- Added toast notifications for better user experience
- Implemented client-side routing for SPA experience
- Used TypeScript throughout for type safety

## Deployment

### Live Demo
- **Frontend**: https://task-beta.netlify.app/login
- **Backend**: https://task-manager-app-e27v.onrender.com

### Local Deployment

**Backend:**
```bash
cd backend
yarn build
yarn start
```

**Frontend:**
```bash
cd frontend
yarn build
# Serve the dist folder with any static server
```



