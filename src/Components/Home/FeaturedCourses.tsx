import { AnimatePresence } from "framer-motion";
import AllCards from "../AllCards/AllCards";
import { getHomeCoursesData } from "@/app/api/ServerAction";

const FeaturedCourses: React.FC = async () => {
  const CoursesData = await getHomeCoursesData();
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-350 mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Featured Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {CoursesData?.map((course: any) => (
              <AllCards key={course._id} course={course} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
