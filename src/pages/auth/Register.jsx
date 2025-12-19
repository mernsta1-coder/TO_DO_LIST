import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Auth from "../../components/Auth";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const { password, confirmpassword } = formData;

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/;
    if (!passwordPattern.test(password)) {
      toast.error("Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special char and 8-20 chars");
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Confirm password does not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Registered successfully!");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Auth
        type="register"
        title="Sign Up"
        buttonText={loading ? "Submitting..." : "Submit"}
        textLabel="Have an Account? "
        linkText="Login"
        linkText2="Forgot Password?"
        fields={[
          { label: "Name:", type: "text", name: "name", placeholder: "Enter your name", required: true, pattern: "^[A-Za-z ]+$" },
          { label: "Email:", type: "email", name: "email", placeholder: "Enter your email", required: true },
          { label: "Password:", type: "password", name: "password", placeholder: "Enter your password", required: true },
          { label: "Confirm Password:", type: "password", name: "confirmpassword", placeholder: "Confirm your password", required: true },
        ]}
        onSubmit={onSubmit}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Register;
