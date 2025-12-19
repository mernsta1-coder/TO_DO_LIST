import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/", { replace: true }); // go to login
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold tracking-wide">
        Todo App
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
