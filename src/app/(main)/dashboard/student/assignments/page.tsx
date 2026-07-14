import { LazyLoader } from "@/Components/UI/LazyLoder";
import { userDet } from "@/lib/user";
import { redirect } from "next/navigation";

const Assignments = LazyLoader(()=>import("@/DashboardComponents/Student/AssignmentsPage"));


const AssignmentsPage = async() => {
  const user=await userDet()
  if(user){
    redirect("/dashboard/student")
  }
  return (
    <div>
        <Assignments/>
    </div>
  );
};

export default AssignmentsPage;