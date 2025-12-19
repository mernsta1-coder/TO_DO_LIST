import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("jwt");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />; // Not logged in
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />; // Role mismatch
  }

  return children;
};

export default ProtectedRoute;
