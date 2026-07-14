import { getInstructorData, getInstructorsStudents } from "@/app/api/ServerAction";
import { LazyLoader } from "@/Components/UI/LazyLoder";
import { userDet } from "@/lib/user";

const InstructorDashboard =LazyLoader(()=>import("@/DashboardComponents/Instructor/InstructorDashboard"));


const InstructorPage = async() => {

   const user = await userDet();
 if(!user)return
    const fetchedData = await getInstructorData(String(user?.id));
          const data = await getInstructorsStudents(user?.id);
    
    const coursesData = fetchedData || [];
  
  return (
    <div>
        <InstructorDashboard user={user} data={data} coursesData={coursesData}/>
    </div>
  );
};
export default InstructorPage;