
import { LazyLoader } from "@/Components/UI/LazyLoder";


const AllCards =LazyLoader(()=>import( "@/Components/AllCards/AllCards"));
import PremiumPagination from "@/Components/Courses/PremiumPagination";
import SimpleSearchFilterBar from "@/Components/Courses/SimpleSearchFilterBar";




const CoursesPage = () => {



  const COURSES= [
  { id: 1, image: "bg-blue-100", title: "Full Stack Development", description: "Master modern web stacks.", price: "$199", date: "Jul 15", rating: 4.9, location: "Online" },
  { id: 2, image: "bg-indigo-100", title: "React Next.js Pro", description: "Deep dive into App Router.", price: "$179", date: "Aug 02", rating: 4.8, location: "Remote" },
  { id: 3, image: "bg-sky-100", title: "TypeScript Mastery", description: "Advanced type safety patterns.", price: "$149", date: "Aug 10", rating: 4.9, location: "Online" },
  { id: 4, image: "bg-slate-100", title: "UI/UX Architecture", description: "Design systems for scale.", price: "$159", date: "Aug 20", rating: 4.7, location: "Hybrid" },
];

  return <main className="w-11/12 gap-4 pt-20 mx-auto">
    <SimpleSearchFilterBar/>
      <div className=' grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-4'>
          {COURSES.map((course) => (
      <AllCards key={course.id} course={course} />
    ))}
      </div>
      <PremiumPagination/>
  </main>;
};

export default CoursesPage;
