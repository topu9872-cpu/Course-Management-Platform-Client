import { LazyLoader } from "@/Components/UI/LazyLoder";

const AdminDashboard =LazyLoader(()=>import ("@/DashboardComponents/Admin/AdminDashboard"));


const AdminPage = () => {
  return (
    <div>
        <AdminDashboard/>
    </div>
  );
};

export default AdminPage;