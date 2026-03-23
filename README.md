# Alert Notification System

A full-stack, real-time alert notification web application designed to manage, display, and interact with user notifications. The system features a modern frontend built with React and Tailwind CSS, combined with a robust backend powered by Node.js, Express, and MongoDB.

## 🌟 System Flow & Architecture

The system operates efficiently across two main environments: the **Frontend** client and the **Backend** API.

1. **User Authentication:**
   - Users seamlessly register or log in via the React frontend.
   - The backend validates credentials, hashes passwords using \`bcrypt\`, and securely issues a \`JWT\` (JSON Web Token).
   - The frontend stores the token safely and manages a global authentication state via the React Context API.

2. **Fetching & Managing Alerts:**
   - Once authenticated, the user connects to the dashboard.
   - The frontend precisely requests the user's notifications from the backend REST API (\`/alerts/v1\`).
   - The backend looks up the user's specific alerts in the MongoDB database via Mongoose, sending them back to the client interface.

3. **Interacting with Alerts (Read/Unread):**
   - The user marks an alert as read or unread with a single click.
   - A PATCH request is dispatched to the backend to update the respective alert state in the database.
   - The frontend instantly and dynamically reflects these changes using state management for a snappy experience.

## 🚀 Tech Stack

### Frontend

- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **State Management:** React Context API

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js (TypeScript)
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens) & bcrypt
- **Development Tool:** Nodemon & ts-node

## 📁 Project Structure

```text
Alert-Notification-System/
├── backend/                  # Node.js/Express API
│   ├── config/               # Database and environment configs
│   ├── controllers/          # API route controllers
│   ├── middleware/           # Auth and error handling middlewares
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express route definitions
│   ├── services/             # Core business logic
│   └── app.ts                # Express app setup
└── frontend/                 # React UI Client
    ├── public/               # Static assets
    ├── src/
    │   ├── components/       # Reusable React components
    │   ├── context/          # React Context (Auth)
    │   ├── index.css         # Tailwind configurations
    │   └── App.tsx           # Application routing
    └── vite.config.ts        # Vite build settings
```

## ✨ Features

- **End-to-End Authentication:** Highly secure JWT-based user login and registration flow.
- **Protected Routes:** Ensures comprehensive privacy where dashboard access applies only to authenticated users.
- **RESTful API:** Completely typed TypeScript backend architecture.
- **Cross-Origin Resource Sharing (CORS):** Fully configured to securely connect frontend requests to backend endpoints.
- **Responsive Dashboard:** Beautiful desktop and mobile-friendly UI using Tailwind CSS.
- **Toggleable Alerts:** Features specific functionality to mark alerts as read/unread directly within the UI.

## 🛠️ Prerequisites

Before installing the project, make sure you have installed the following requirements:

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **MongoDB:** A running local instance or a cloud MongoDB Atlas connection URI

## 📥 Installation

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <your-repository-url>
   cd Alert-Notification-System
   ```

2. **Set up the Backend**:

   ```bash
   cd backend
   npm install
   ```

   **Environment Variables**: Create a `.env` file directly inside the `backend/` directory and structure it with your respective values:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/alert_notifier
   JWT_SECRET=your_super_secret_jwt_key
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Set up the Frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

## 🏃‍♂️ Running the System

You will need to separately start both the backend proxy environment and the frontend interface in dedicated terminal windows.

**Terminal 1 (Backend):**

```bash
cd backend
# npm run dev
npx nodemon server.ts
```

_(The backend normally runs on `http://localhost:5000` by default)_

**Terminal 2 (Frontend):**

```bash
cd frontend
npm run dev
```

_(The frontend typically surfaces on `http://localhost:5173` by default)_

## 🔗 Main API Endpoints

### Auth (`/auth/v1`)

- `POST /register`: Create a new user account.
- `POST /login`: Authenticate and receive a signed JWT.

### Alerts (`/alerts/v1`)

- `GET /`: Retrieve all notifications specific to the authenticated user.
- `POST /`: Create a new notification.
- `PATCH /:id`: Update the status of a specific alert (e.g., alternating between read status).
- `DELETE /:id`: Delete a specific alert.
