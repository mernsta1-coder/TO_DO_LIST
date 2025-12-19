import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages & Components
import Navbar from './assets/Navbar';
import Todo from './pages/todo/Todo';
import Login from './pages/auth/Loogin';
import Register from './pages/auth/Register';
import HomePage from './pages/HomePage';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/Reset';
import Admin from "./pages/admin/admin";

// --------------------- ProtectedRoute ---------------------
// role check will now rely on backend response
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

// --------------------- App Component ---------------------
function App() {
  return (
    <>
      <BrowserRouter>
      
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />

          {/* Protected Routes */}
          <Route
            path="/home_page"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <Todo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          {/* Catch-all: redirect unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
