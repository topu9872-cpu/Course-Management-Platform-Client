import { LazyLoader } from "@/Components/UI/LazyLoder";

const Certificates =LazyLoader(()=>import ("@/DashboardComponents/Student/CertificatesPage"));


const CertificatesPage = () => {
  return (
    <div>
        <Certificates/>
    </div>
  );
};

export default CertificatesPage;