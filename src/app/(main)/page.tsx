import FeaturedCourses from "@/Components/Home/FeaturedCourses";
import HeroSection from "@/Components/Home/Hero";
import WhyChooseUs from "@/Components/Home/WhyChooseUs";
import HowItWorks from "@/Components/Home/HowItWorks";
import PopularCategories from "@/Components/Home/PopularCategories";
import Testimonials from "@/Components/Home/Testimonials";





export default function Home() {


  return (
   <main className="pt-16">
<HeroSection/>
<FeaturedCourses/>
<WhyChooseUs/>
<PopularCategories/>
<HowItWorks/>
<Testimonials/>

   </main>
  );
}
