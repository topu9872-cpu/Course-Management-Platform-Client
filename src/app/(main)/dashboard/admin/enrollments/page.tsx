import { getAllEnrollment } from "@/app/api/ServerAction";
import { LazyLoader } from "@/Components/UI/LazyLoder";

const EnrollmentsManagement =LazyLoader(()=>import ("@/DashboardComponents/Admin/EnrollmentsManagement"));

const EnrollmentsPage = async() => {
  const getEnrollment=await getAllEnrollment()
  return (
    <div>
        <EnrollmentsManagement getEnrollment={getEnrollment}/>
    </div>
  );
};

export default EnrollmentsPage;