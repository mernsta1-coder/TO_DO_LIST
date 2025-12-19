import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Redirect if no token
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Axios instance with token
  const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/admin`,
    headers: { Authorization: `Bearer ${token}` },
  });

  // Fetch all users
  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/users");
      setUsers(data.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadUsers();
  }, [token]);

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);
      loadUsers(); // Refresh list
    } catch (err) {
      console.error("Delete error:", err.response?.data?.message || err.message);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Navbar */}
      <nav style={{ padding: "10px 20px", background: "#222", color: "#fff", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "bold" }}>Admin Panel</span>
        <button
          onClick={logout}
          style={{ background: "#ff4d4f", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}
        >
          Logout
        </button>
      </nav>

      {/* Users Table */}
      <div style={{ padding: "20px" }}>
        <h2>All Users</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f0f0f0" }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(user._id)}
                        style={{ background: "#ff4d4f", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Admin;
