import { LazyLoader } from "@/Components/UI/LazyLoder";

const RegistrationForm = LazyLoader(
  () => import("@/Components/auth/RegistrationForm"),
);

const RegistrationPage = () => {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
