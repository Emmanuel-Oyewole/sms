import Sidebar from "../components/Layout/Sidebar";

const TeachersDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        {/* Add dashboard content here */}
      </main>
    </div>
  );
};

export default TeachersDashboard;
