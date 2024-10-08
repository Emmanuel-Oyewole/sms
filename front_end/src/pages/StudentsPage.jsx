import { useState } from "react";
import api from "../services/api";

const StudentsPage = () => {
  const [students, setStudents] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useState(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students/");
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Students</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="py-2 border">{student.id}</td>
                <td className="py-2 border">{student.name}</td>
                <td className="py-2 border">{student.email}</td>
                {/* Add more data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentsPage;
