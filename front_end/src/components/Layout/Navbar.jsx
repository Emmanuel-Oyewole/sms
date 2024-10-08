import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

const Navbar = () => {
  const { authTokens, user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="font-bold text-xl">
          School Management System
        </Link>
      </div>
      <div>
        {authTokens ? (
          <>
            <span className="mr-4">Hello, {user.username}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
