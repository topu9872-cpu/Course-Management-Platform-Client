import { LazyLoader } from "@/Components/UI/LazyLoder";

const PremiumAnalytics=LazyLoader(()=>import("@/DashboardComponents/Instructor/AnalyticsPage")) ;


const AnalyticsPage = () => {
  return (
    <div>
      <PremiumAnalytics/>
    </div>
  );
};

export default AnalyticsPage;