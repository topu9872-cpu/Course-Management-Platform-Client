import { getStudentsCourses } from "@/app/api/ServerAction";
import { LazyLoader } from "@/Components/UI/LazyLoder";
import { userDet } from "@/lib/user";

const StudentDashboard =LazyLoader(()=>import ("@/DashboardComponents/Student/StudentDashboard"));

const StudentPage = async() => {
  const user=await userDet()
    if(!user)return
        const studentCourses=await getStudentsCourses(user?.id)
  return (
    <div>
        <StudentDashboard user={user} studentCourses={studentCourses}/>
    </div>
  );
};

export default StudentPage;