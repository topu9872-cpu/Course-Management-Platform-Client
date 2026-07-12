import { getDetailsData } from "@/app/api/ServerAction";
import CourseDetails from "@/Components/Courses/CoursesDetails";

type prop = {
  params: Promise<{
    id: any;
  }>;
};
const CourseDetailsPage = async ({ params }: prop) => {
  const { id } = await params;
  const detailsData = await getDetailsData(id);
  return (
    <div>
      <CourseDetails detailsData={detailsData} />
    </div>
  );
};

export default CourseDetailsPage;
