import { LazyLoader } from "@/Components/UI/LazyLoder";

const LoginForm =LazyLoader(()=>import("@/Components/auth/LoginForm")) ;


const LoginPage = () => {
  return (
    <div>
     <LoginForm/>
    </div>
  );
};

export default LoginPage;