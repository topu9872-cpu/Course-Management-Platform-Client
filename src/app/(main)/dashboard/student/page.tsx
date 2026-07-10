import { LazyLoader } from "@/Components/UI/LazyLoder";

const StudentDashboard =LazyLoader(()=>import ("@/DashboardComponents/Student/StudentDashboard"));


const StudentPage = () => {
  return (
    <div>
        <StudentDashboard/>
    </div>
  );
};

export default StudentPage;