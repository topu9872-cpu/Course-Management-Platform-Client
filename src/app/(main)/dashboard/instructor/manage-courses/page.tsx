import { LazyLoader } from "@/Components/UI/LazyLoder";

const ManageCourses =LazyLoader(()=>import("@/DashboardComponents/Instructor/ManageCoursesPage")) ;


const ManageCoursesPage = () => {
  return (
    <div>
        <ManageCourses/>
    </div>
  );
};

export default ManageCoursesPage;