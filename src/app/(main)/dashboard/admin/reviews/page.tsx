import { LazyLoader } from "@/Components/UI/LazyLoder";

const ReviewsManagement=LazyLoader(()=>import("@/DashboardComponents/Admin/ReviewsManagement"));


const ReviewsPage = () => {
  return (
    <div>
        <ReviewsManagement/>
    </div>
  );
};

export default ReviewsPage;