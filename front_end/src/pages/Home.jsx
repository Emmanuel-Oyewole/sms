import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold">
        Welcome to School Management System
      </h1>
      <p className="mt-4">Manage students, courses, and results efficiently.</p>
      <div className="mt-6">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
