import { getInstructorData } from "@/app/api/ServerAction";
import { LazyLoader } from "@/Components/UI/LazyLoder";
import { userDet } from "@/lib/user";

const ManageCourses = LazyLoader(() => import("@/DashboardComponents/Instructor/ManageCoursesPage"));

const ManageCoursesPage = async () => {
  const user = await userDet();
  
  if (!user || !user.id) {
    return (
      <div className="p-6 text-center text-slate-500">
        Please log in to view your courses.
      </div>
    );
  }

  // Fetch the data from the server action
  const fetchedData = await getInstructorData(String(user?.id ?? ""));
  
  // Safeguard: If the server returns null or undefined, pass an empty array instead
  const coursesData = fetchedData || [];

  return (
    <div>
        <ManageCourses coursesData={coursesData}/>
    </div>
  );
};

export default ManageCoursesPage;