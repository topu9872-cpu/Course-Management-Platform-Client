import { LazyLoader } from "@/Components/UI/LazyLoder";

const MyCourses =LazyLoader(()=>import ("@/DashboardComponents/Student/MyCoursesPage"));


const MyCoursesPage = () => {
  return (
    <div>
        <MyCourses/>
    </div>
  );
};

export default MyCoursesPage;