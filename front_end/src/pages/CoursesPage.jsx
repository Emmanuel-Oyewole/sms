import { useState, useEffect } from "react";
import api from "../services/api";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses/");
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error getting courses");
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Courses</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="text-center">
                <td className="py-2 border">{course.id}</td>
                <td className="py-2 border">{course.name}</td>
                {/* Add more data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoursePage;
