import { LazyLoader } from "@/Components/UI/LazyLoder";
import { userDet } from "@/lib/user";

const CreateCourse =LazyLoader(()=>import("@/DashboardComponents/Instructor/CreateCoursePage")) ;


const CreateCoursePage = async() => {
const user=await userDet()
console.log(user)
  return (
    <div>
    <CreateCourse userId={String(user?.id)}/>
    </div>
  );
};

export default CreateCoursePage;