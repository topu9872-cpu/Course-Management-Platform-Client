import { LazyLoader } from "@/Components/UI/LazyLoder";
import { userDet } from "@/lib/user";

const Students = LazyLoader(
  () => import("@/DashboardComponents/Instructor/Students"),
);

const StudentsPage = async () => {
  const user = await userDet();
  if (!user?.id) return;

  return (
    <div>
      <Students userId={user?.id} />
    </div>
  );
};

export default StudentsPage;
