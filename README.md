# Task Manager - Full Stack Application

Hey there! 👋 This is my take on the Full-Stack Development Intern assignment. I built a complete task management application that lets users sign up, log in, and manage their personal tasks. The app is built with modern technologies and includes some bonus features to make it more user-friendly.

## ✨ What I Built

**Core Features (Required):**
- User registration and login with JWT authentication
- Create, read, update, and delete tasks
- Task status management (Todo, In Progress, Done)
- Due date tracking for tasks
- Secure API endpoints with proper authentication

**Bonus Features I Added:**
- **Beautiful UI with Material-UI**: Clean, modern interface that looks professional
- **Form Validation & Error Handling**: Real-time validation with helpful error messages
- **Task Filtering & Sorting**: Filter tasks by status and sort by due date
- **Search Functionality**: Search tasks by title and description
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Loading States & User Feedback**: Smooth loading indicators and success/error messages
- **Task Status Quick Actions**: One-click status changes with visual feedback
- **Overdue Task Highlighting**: Tasks past their due date are highlighted in red

## 🛠 Tech Stack & Why I Chose These

I picked technologies that I'm comfortable with and that would help me build a solid, maintainable application quickly.

### Backend
- **NestJS** - I love how it structures Node.js apps with decorators and modules, similar to Angular
- **MongoDB + Mongoose** - NoSQL is perfect for this type of app, and Mongoose makes it easy to work with
- **JWT** - Industry standard for authentication, stateless and secure
- **bcryptjs** - Essential for password security
- **TypeScript** - Can't live without type safety, especially in larger projects

### Frontend
- **React 19** - Latest React with great performance improvements
- **TypeScript** - Same reason as backend, type safety is crucial
- **Material-UI (MUI)** - Gives me a professional look without spending time on custom CSS
- **React Hook Form + Zod** - Best combo for form handling and validation
- **React Router** - Standard for React navigation
- **Axios** - More features than fetch, better error handling

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

## 🎨 UI/UX Features

I focused on making the app look professional and be easy to use:

- **Material-UI Design**: Clean, modern interface that looks professional
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Form Validation**: Real-time validation with helpful error messages using Zod
- **Loading States**: Smooth loading indicators so users know what's happening
- **Error Handling**: User-friendly error messages instead of technical jargon
- **Task Cards**: Clean, organized task display with all important info visible
- **Status Indicators**: Color-coded task status (red for overdue, green for done, etc.)
- **Quick Actions**: One-click status changes and easy edit/delete buttons
- **Search & Filter**: Easy task discovery with real-time search
- **Overdue Highlighting**: Tasks past their due date are clearly marked

## 🔧 Development Approach

### Code Quality & Best Practices

I made sure to write clean, maintainable code:
- **TypeScript**: Full type safety throughout the entire stack
- **ESLint**: Code linting to catch potential issues
- **Custom Hooks**: Reusable logic for auth and task management
- **Error Boundaries**: Graceful error handling that doesn't crash the app
- **API Client**: Centralized HTTP client with automatic token handling
- **Form Validation**: Using Zod schemas for both frontend and backend validation

### Architecture Decisions

- **Modular Structure**: Separated concerns with clear module boundaries
- **Custom Hooks**: `useAuth` and `useTasks` for state management
- **Service Layer**: Clean API services that handle all backend communication
- **Type Safety**: Shared types between frontend and backend
- **Error Handling**: Consistent error handling patterns throughout the app

## 🚀 Deployment

### Backend Deployment

1. **Build the application:**
```bash
cd backend
yarn build
```

2. **Start the production server:**
```bash
yarn start
```

### Frontend Deployment

 **Build the application:**
```bash
cd frontend
yarn build
```


