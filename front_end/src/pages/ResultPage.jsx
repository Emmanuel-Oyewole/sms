import { useState, useEffect } from "react";
import api from "../services/api";

const ResultsPage = () => {
  const [results, setResult] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get("/result/");
        setResult(response.data);
      } catch (err) {
        setError(err.message || "Error getting result");
      }
    };
    fetchResults();
  }, []);
  const downloadPDF = async (resultId) => {
    try {
      const response = await api.get(
        `/students/${resultId}/results/${resultId}/download`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `result_${resultId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError(err.message || "Error downloading PDF");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Results</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Student ID</th>
            <th className="py-2">Course ID</th>
            <th className="py-2">First CA</th>
            <th className="py-2">Second CA</th>
            <th className="py-2">Exam</th>
            <th className="py-2">Total</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="text-center">
              <td className="py-2 border">{result.id}</td>
              <td className="py-2 border">{result.student_id}</td>
              <td className="py-2 border">{result.course_id}</td>
              <td className="py-2 border">{result.first_ca}</td>
              <td className="py-2 border">{result.second_ca}</td>
              <td className="py-2 border">{result.exam}</td>
              <td className="py-2 border">{result.total}</td>
              <td className="py-2 border">
                <button
                  onClick={() => downloadPDF(result.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPage;
