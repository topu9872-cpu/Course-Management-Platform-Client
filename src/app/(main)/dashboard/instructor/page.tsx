import { LazyLoader } from "@/Components/UI/LazyLoder";

const InstructorDashboard =LazyLoader(()=>import("@/DashboardComponents/Instructor/InstructorDashboard"));


const InstructorPage = () => {
  return (
    <div>
        <InstructorDashboard/>
    </div>
  );
};

export default InstructorPage;