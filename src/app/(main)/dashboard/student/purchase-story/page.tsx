import { getStudentsCourses } from "@/app/api/ServerAction";
import PurchaseStoryPage from "@/DashboardComponents/Student/PurchaseStoryPage";
import { userDet } from "@/lib/user";


const PurchaseStory =async () => {

      const user=await userDet()
      if(!user)return
      const studentCourses=await getStudentsCourses(user?.id)
  return (
    <div>
        <PurchaseStoryPage studentCourses={studentCourses}/>
    </div>
  );
};

export default PurchaseStory;