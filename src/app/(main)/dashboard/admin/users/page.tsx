import { LazyLoader } from "@/Components/UI/LazyLoder";

const UsersManagement =LazyLoader(()=>import ("@/DashboardComponents/Admin/Users"));


const UsersPage = () => {
  return (
    <div>
        <UsersManagement/>
    </div>
  );
};

export default UsersPage;