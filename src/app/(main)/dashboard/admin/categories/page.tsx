import { LazyLoader } from "@/Components/UI/LazyLoder";

const CategoriesManagement =LazyLoader(()=>import("@/DashboardComponents/Admin/CategoriesManagement"));


const CategoriesPage = () => {
  return (
    <div>
      <CategoriesManagement/>
    </div>
  );
};

export default CategoriesPage;