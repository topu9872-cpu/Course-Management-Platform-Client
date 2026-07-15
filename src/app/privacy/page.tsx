import { LazyLoader } from "@/Components/UI/LazyLoder";

const PrivacyPage = LazyLoader(
  () => import("@/Components/PrivacyPage/PrivacyPage"),
);

const Privacy = () => {
  return (
    <div>
      <PrivacyPage />
    </div>
  );
};

export default Privacy;
