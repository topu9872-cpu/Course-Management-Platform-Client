import { LazyLoader } from "@/Components/UI/LazyLoder";

const Assignments = LazyLoader(()=>import("@/DashboardComponents/Student/AssignmentsPage"));


const AssignmentsPage = () => {
  return (
    <div>
        <Assignments/>
    </div>
  );
};

export default AssignmentsPage;