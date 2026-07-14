import { LazyLoader } from "@/Components/UI/LazyLoder";
import { userDet } from "@/lib/user";
import { redirect } from "next/navigation";

const CourseHubSidebar = LazyLoader(()=>import("@/DashboardComponents/SideBar/SideBar")) ;


const Layout = async({ children }:{children: React.ReactNode}) => {
  const user=await userDet()
  if(!user){
    redirect('/login')
  
  }
  return (
    <main className="min-h-screen bg-slate-50">
      <CourseHubSidebar />

      <section className="pt-20  lg:ml-70">
       
          {children}
        
      </section>
    </main>
  );
};

export default Layout;