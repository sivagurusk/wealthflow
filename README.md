# WealthFlow - Personal Finance Manager

A professional MERN stack application to track income, expenses, and manage your overall financial health with a modern, dark-green themed UI.

## Features
- **Dynamic Dashboard**: Summary cards for Balance, Income, and Expenses.
- **Transaction Tracking**: Add and delete transactions with ease.
- **Secure Auth**: JWT-based Authentication (Login/Signup).
- **Elegant UI**: Dark-green sidebar, custom emerald themes, and response toast notifications.
- **Persistent State**: Keeps you logged in using LocalStorage and JWT.

## Prerequisites
- **Node.js**: (v16+)
- **MongoDB**: Installed and running locally (`mongodb://localhost:27017/wealthflow`)

## Getting Started

### 1. Setup Backend
- Navigate to the `backend` folder:
    cd backend
- Install dependencies:
    npm install
- Configure Environment variables:
    (The code uses defaults, but verify the .env file exists)
- Start the server:
    npm run dev

### 2. Setup Frontend
- Open a new terminal and navigate to the `frontend` folder:
    cd frontend
- Install dependencies:
    npm install
- Start the React application:
    npm start

## Configuration
The backend runs on `http://localhost:5000` and the frontend on `http://localhost:3000`. Ensure MongoDB is active before starting the backend server.

## Usage
1. **Signup**: Create an account to see the success notification.
2. **Login**: Use your credentials to access the dashboard.
3. **Add Transaction**: Use the sidebar form to add income or expense.
4. **Dashboard**: Observe how your total balance and cards update automatically.

## Project Structure
- `backend/`: Express server, MongoDB models, and Auth routes.
- `frontend/`: React components, Context API (State), and Tailwind CSS styling.
- `context/`: `GlobalContext.js` handles all API operations and synchronized state across the app.
