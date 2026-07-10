import { LazyLoader } from "@/Components/UI/LazyLoder";

const CourseHubSidebar = LazyLoader(()=>import("@/DashboardComponents/SideBar/SideBar")) ;


const Layout = ({ children }:{children: React.ReactNode}) => {
  return (
    <main className="min-h-screen bg-slate-50">
      <CourseHubSidebar />

      <section className="pt-20 ml-80">
       
          {children}
        
      </section>
    </main>
  );
};

export default Layout;