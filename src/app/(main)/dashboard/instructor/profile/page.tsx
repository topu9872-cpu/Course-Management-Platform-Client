import { LazyLoader } from "@/Components/UI/LazyLoder";

const Profile =LazyLoader(() => import("@/DashboardComponents/Profile/Profile"));


const ProfilePage = () => {
  return (
    <div>
        <Profile/>
    </div>
  );
};

export default ProfilePage;