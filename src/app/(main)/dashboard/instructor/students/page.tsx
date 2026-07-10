import { LazyLoader } from "@/Components/UI/LazyLoder";

const Students =LazyLoader(()=>import("@/DashboardComponents/Instructor/Students")) ;


const StudentsPage = () => {
  return (
    <div> 
    <Students/>
    </div>
  );
};

export default StudentsPage;