import { getAllUsers } from "@/app/api/ServerAction";
import { LazyLoader } from "@/Components/UI/LazyLoder";

const UsersManagement =LazyLoader(()=>import ("@/DashboardComponents/Admin/Users"));


const UsersPage = async() => {
  const allUsers=await getAllUsers()
  console.log(allUsers)
  return (
    <div>
        <UsersManagement allUsers={allUsers}/>
    </div>
  );
};

export default UsersPage;