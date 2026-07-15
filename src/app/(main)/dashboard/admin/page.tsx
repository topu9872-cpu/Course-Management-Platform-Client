import { getAllEnrollment, getAllUsers, getHomeCoursesData } from "@/app/api/ServerAction";
import { LazyLoader } from "@/Components/UI/LazyLoder";
import { userDet } from "@/lib/user";

const AdminDashboard =LazyLoader(()=>import ("@/DashboardComponents/Admin/AdminDashboard"));


const AdminPage = async() => {
  const allUsers=await getAllUsers()
    const getEnrollment=await getAllEnrollment()
    const admin=await userDet()
    const getAllCourses=await getHomeCoursesData()
  return (
    <div>
        <AdminDashboard getAllCourses={getAllCourses} allUsers={allUsers} admin={admin} getEnrollment={getEnrollment}/>
    </div>
  );
};

export default AdminPage;