import { LazyLoader } from "@/Components/UI/LazyLoder";

const CreateCourse =LazyLoader(()=>import("@/DashboardComponents/Instructor/CreateCoursePage")) ;


const CreateCoursePage = () => {
  return (
    <div>
    <CreateCourse/>
    </div>
  );
};

export default CreateCoursePage;