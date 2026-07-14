import { getStudentsCourses } from "@/app/api/ServerAction";
import { LazyLoader } from "@/Components/UI/LazyLoder";
import { userDet } from "@/lib/user";

const MyCourses =LazyLoader(()=>import ("@/DashboardComponents/Student/MyCoursesPage"));


const MyCoursesPage = async() => {
  const user=await userDet()
  if(!user)return
  const studentCourses=await getStudentsCourses(user?.id)
  return (
    <div>
        <MyCourses studentCourses={studentCourses}/>
    </div>
  );
};

export default MyCoursesPage;