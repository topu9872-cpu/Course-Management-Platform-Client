import { LazyLoader } from "@/Components/UI/LazyLoder";

const EnrollmentsManagement =LazyLoader(()=>import ("@/DashboardComponents/Admin/EnrollmentsManagement"));


const EnrollmentsPage = () => {
  return (
    <div>
        <EnrollmentsManagement/>
    </div>
  );
};

export default EnrollmentsPage;