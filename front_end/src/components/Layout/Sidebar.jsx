import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4 text-2xl font-bold">Menu</div>
      <ul>
        <li className="p-2 hover:bg-gray-700">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="p-2 hover:bg-gray-700">
          <Link to="/students">Students</Link>
        </li>
        <li className="p-2 hover:bg-gray-700">
          <Link to="/courses">Courses</Link>
        </li>
        <li className="p-2 hover:bg-gray-700">
          <Link to="/results">Results</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </aside>
  );
};
export default Sidebar;