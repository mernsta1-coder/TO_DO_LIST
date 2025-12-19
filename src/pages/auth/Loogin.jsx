import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Auth from "../../components/Auth";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Check if fetch returned an error
      if (!res.ok) {
        toast.error(data.message || "Login failed!");
        return;
      }

      // Check if token exists
      if (data.token) {
        // Store token and role safely
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role || "user");

        toast.success("Login successful!");

        // Navigate based on role
        if (data.role === "admin") navigate("/admin");
        else navigate("/todo");
      } else {
        toast.error("Login failed: No token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Auth
        type="login"
        title="Login"
        buttonText={loading ? "Logging in..." : "Login"}
        textLabel="Don't have an account? "
        linkText="Register"
        linkText2="Forgot Password?"
        fields={[
          { label: "Email:", type: "email", name: "email", placeholder: "Enter your email", required: true },
          { label: "Password:", type: "password", name: "password", placeholder: "Enter your password", required: true },
        ]}
        onSubmit={onSubmit}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Login;
