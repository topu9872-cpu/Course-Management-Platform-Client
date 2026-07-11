import { LazyLoader } from "@/Components/UI/LazyLoder";

const AllCards = LazyLoader(() => import("@/Components/AllCards/AllCards"));
import PremiumPagination from "@/Components/Courses/PremiumPagination";
import SimpleSearchFilterBar from "@/Components/Courses/SimpleSearchFilterBar";
import { getCoursesData } from "@/app/api/ServerAction";

interface Props {
  searchParams: Promise<{
    category?: string;
    price?: string;
    rating?: string;
    search?: string;
    page?: string;
  }>;
}

const CoursesPage = async ({ searchParams }: Props) => {
  const { search, category, price, rating, page } = await searchParams;

  const AllCoursesData = await getCoursesData({
    search,
    category,
    price,
    rating,
    page,
  });
  
  const { itemsPerPage, totalItems, courses, currentPage } = AllCoursesData;

  return (
    <main className="w-11/12 gap-4 pt-20 mx-auto">
      <SimpleSearchFilterBar />
      <h1 className="text-lg py-6 font-bold text-blue-400">
  {courses.length} of {totalItems}
</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-4">
        {courses.map((course: any) => (
          <AllCards key={course._id} course={course} />
        ))}
      </div>
      <PremiumPagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
    </main>
  );
};

export default CoursesPage;
