"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  ArrowRight, BookOpen, GraduationCap, Users, ShieldCheck, 
  Award, Globe, Zap, Compass, Heart, Code, Smartphone, 
  Briefcase, CheckCircle2, Target, Eye, Star, Check
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import Link from "next/link";
import HeroSection from "../Home/Hero";

// --- Framer Motion Variants with Strict Typing ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const hoverLift: Variants = {
  hover: { y: -4, transition: { duration: 0.2, ease: "easeInOut" } }
};

const buttonScale: Variants = {
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
};

// --- Sub-Components (Arrow Functions) ---
const SectionHeader = ({ label, title, description }: { label: string; title: string; description?: string }) => (
  <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={fadeInUp}
    className="space-y-4 max-w-3xl"
  >
    <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-600 border border-blue-100">
      {label}
    </span>
    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">
      {title}
    </h2>
    {description && (
      <p className="text-lg text-neutral-500 leading-relaxed font-normal">
        {description}
      </p>
    )}
  </motion.div>
);

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 pt-20 antialiased font-sans selection:bg-blue-600/10 selection:text-blue-600">
      
      {/* 1. HERO SECTION */}
     <HeroSection/>

      {/* 2. OUR STORY SECTION */}
      <section className="py-14 border-b border-neutral-100 bg-[#fafafa]/50">
        <div className=" mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Interactive Code Block Placeholder */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="w-full aspect-4/3 rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm flex flex-col justify-between font-mono text-xs text-neutral-400 overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-600" />
                  <span className="text-neutral-700 font-bold">CourseHubEngine.ts</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded border">v2.4.0</span>
              </div>
              <div className="space-y-2 text-neutral-600">
                <p className="text-blue-600 font-semibold">{"import { EducationalFramework } from '@coursehub/core';"}</p>
                <p><span className="text-purple-600">const</span> initPlatform = <span className="text-amber-600">()</span> =&gt; {"{"}</p>
                <p className="pl-4">return EducationalFramework.<span className="text-blue-600">deploy</span>({"{"}</p>
                <p className="pl-8">curriculum: <span className="text-emerald-600">"practical_career_oriented"</span>,</p>
                <p className="pl-8">mentorship: <span className="text-emerald-600">"expert_driven"</span>,</p>
                <p className="pl-8">accessibility: <span className="text-blue-600">true</span></p>
                <p className="pl-4">{"});"}</p>
                <p>{"};"}</p>
              </div>
            </div>
            <div className="border-t border-neutral-100 pt-4 flex items-center gap-4 text-[11px] text-neutral-500">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500 stroke-3]" /> Production Ready</div>
              <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-blue-500" /> Global Scaled</div>
            </div>
          </motion.div>

          {/* Right: Story Content */}
          <div className="space-y-6">
            <SectionHeader 
              label="OUR STORY" 
              title="Architecting the Future of Technical Knowledge Transfer" 
            />
            <div className="space-y-4 text-base text-neutral-500 leading-relaxed font-normal">
              <p>
                CourseHub started inside modular production rooms where the gap between academic theory and real-scale corporate engineering infrastructure became too wide to ignore. Conventional learning structures collapsed under the weight of outdated parameters.
              </p>
              <p>
                We envisioned an operational platform built with extreme structural transparency—combining rigorous engineering methodologies with streamlined, intuitive course tracking interfaces inspired by the modern software stacks of Linear and Stripe.
              </p>
              <p className="font-semibold text-neutral-800 border-l-2 border-blue-600 pl-4 py-1 bg-blue-50/30 rounded-r-lg">
                Our focus remains absolute: building dynamic, high-fidelity engineering tracks that reliably convert baseline comprehension into highly technical, career-defining autonomy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION SECTION */}
      <section className="py-24 border-b border-neutral-100">
        <div className="mx-auto px-6 space-y-12">
          <div className="text-center mx-auto flex flex-col items-center">
            <SectionHeader label="GOALS" title="The Blueprint of our Foundations" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="p-8 border border-neutral-200/80 rounded-2xl bg-white shadow-sm space-y-4 hover:border-neutral-300 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-neutral-900">Our Mission</h3>
              <p className="text-neutral-500 leading-relaxed text-sm sm:text-base font-normal">
                To engineer an optimized infrastructure that delivers accessible, modular, and exceptionally high-quality technical education globally. We convert abstract syllabus maps into deployable, practical skill metrics that learners instantly control.
              </p>
              <ul className="space-y-2 pt-2 text-sm font-semibold text-neutral-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Granular skill telemetry verification</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Production-grade sandbox playgrounds</li>
              </ul>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="p-8 border border-neutral-200/80 rounded-2xl bg-white shadow-sm space-y-4 hover:border-neutral-300 transition-colors"
            >
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-neutral-900">Our Vision</h3>
              <p className="text-neutral-500 leading-relaxed text-sm sm:text-base font-normal">
                To foster a globally synchronized, high-trust engineering and design ecosystem. We believe that top-tier expertise must scale democratically, rendering classical geographical limits obsolete through systemic platform integration.
              </p>
              <ul className="space-y-2 pt-2 text-sm font-semibold text-neutral-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Decentralized knowledge-sharing nodes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Native community alignment strategies</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM STATISTICS */}
      <section className="py-24 bg-neutral-50/50 border-b border-neutral-100">
        <div className=" mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: <Users className="text-blue-600" />, value: "5,000+", label: "Active Students" },
              { icon: <BookOpen className="text-indigo-600" />, value: "200+", label: "Premium Courses" },
              { icon: <GraduationCap className="text-emerald-600" />, value: "50+", label: "Expert Instructors" },
              { icon: <Star className="text-amber-500 fill-amber-500" />, value: "98%", label: "Student Satisfaction" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover="hover"
                className="p-6 bg-white border border-neutral-200/60 rounded-xl shadow-2xs text-center flex flex-col items-center space-y-2 transition-colors hover:border-neutral-300"
              >
                <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-100">
                  {stat.icon}
                </div>
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900">{stat.value}</span>
                <span className="text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. CORE VALUES SECTION */}
      <section className="py-24 border-b border-neutral-100">
        <div className=" mx-auto px-6 space-y-16">
          <SectionHeader 
            label="HOW WE OPERATE" 
            title="Core Principles Dictating Our Architecture" 
            description="Our workflows reject decorative filler. We evaluate every decision using clear utility paradigms."
          />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: <Heart className="w-5 h-5 text-rose-600" />, title: "Student First", desc: "Every metric we track, every interface optimization we deploy is calibrated to accelerate down-stream comprehensive retention parameters." },
              { icon: <Zap className="w-5 h-5 text-amber-600" />, title: "Innovation", desc: "We continually iterate over our delivery infrastructure, deprecating legacy models the precise moment a cleaner vector presents itself." },
              { icon: <Award className="w-5 h-5 text-blue-600" />, title: "Quality Education", desc: "No content fragmentation. We host strictly vetted curriculums authored exclusively by production-verified engineering architects." },
              { icon: <Globe className="w-5 h-5 text-emerald-600" />, title: "Community", desc: "We support peer-to-peer alignment tools, transforming isolated educational progress tracks into robust communal code ecosystems." },
              { icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />, title: "Integrity", desc: "Honest metrics. Clear tracking milestones. We guarantee transparent validation steps without synthetic score inflations." },
              { icon: <Compass className="w-5 h-5 text-purple-600" />, title: "Lifelong Learning", desc: "Education is iterative. We build infrastructure meant to serve as an evergreen source-of-truth across your decade-long trajectory." },
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover="hover"
                className="p-6 bg-white border border-neutral-200/60 rounded-xl shadow-2xs space-y-3 transition-colors hover:border-neutral-300"
              >
                <div className="w-9 h-9 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center shadow-3xs">
                  {value.icon}
                </div>
                <h3 className="text-base font-bold tracking-tight text-neutral-900">{value.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-normal">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. MEET OUR TEAM SECTION */}
      <section className="py-24 border-b border-neutral-100 bg-[#fafafa]/40">
        <div className=" mx-auto px-6 space-y-16">
          <SectionHeader 
            label="THE BUILDERS" 
            title="Backed by Engineers & Product Designers" 
            description="Our management vector originates from core teams across modern technical environments."
          />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { name: "Alex Rivers", role: "Head of Infrastructure", bio: "Ex-Vercel Network Architect. Specializes in multi-tenant layout execution pipelines.", initial: "AR" },
              { name: "Elena Rostova", role: "Principal Product Designer", bio: "Ex-Stripe Core UI Specialist. Obsessed with clean interface hierarchies and white space rules.", initial: "ER" },
              { name: "Marcus Chen", role: "Director of Curriculum", bio: "Ex-Coursera Platforms lead. Dedicated to streamlining modular student telemetry trackers.", initial: "MC" },
              { name: "Sarah Jenkins", role: "Systems Operations", bio: "Ex-Linear Core Developer. Keeps database structures optimized and latency-free.", initial: "SJ" }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 bg-white border border-neutral-200/70 rounded-2xl shadow-sm space-y-4 text-left group transition-all hover:border-neutral-300 hover:shadow-md"
              >
                {/* Vector Avatar Component */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm tracking-wider">
                  {member.initial}
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-neutral-900 text-base tracking-tight">{member.name}</h4>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{member.role}</p>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed font-normal">{member.bio}</p>
                <div className="flex gap-3 text-neutral-400 pt-2 border-t border-neutral-100 group-hover:text-neutral-500 transition-colors">
                  <button className="hover:text-neutral-900 transition-colors"><FaTwitter className="w-4 h-4" /></button>
                  <button className="hover:text-neutral-900 transition-colors"><FaLinkedin className="w-4 h-4" /></button>
                  <button className="hover:text-neutral-900 transition-colors"><FaGithub className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. WHY STUDENTS CHOOSE US */}
      <section className="py-24 border-b border-neutral-100">
        <div className=" mx-auto px-6 space-y-16">
          <SectionHeader 
            label="THE PLATFORM ADVANTAGE" 
            title="Engineered to Outperform Traditional Models" 
            description="A premium feature grid designed to maximize structural operational alignment."
          />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: <GraduationCap className="w-5 h-5 text-blue-600" />, title: "Expert Mentors", desc: "Interact directly with verified senior developers holding massive production footprints across major entities." },
              { icon: <Smartphone className="w-5 h-5 text-indigo-600" />, title: "Flexible Learning", desc: "Our layout syncs effortlessly across mobile sandboxes and desktop IDE windows, allowing zero-friction access rules." },
              { icon: <Code className="w-5 h-5 text-emerald-600" />, title: "Practical Projects", desc: "Skip traditional theoretical abstracts. Build actual enterprise configurations, complex layout systems, and secure systems." },
              { icon: <Award className="w-5 h-5 text-amber-500" />, title: "Verified Certificates", desc: "Secure cryptographic completion verification protocols integrated natively to showcase your talent markers." },
              { icon: <Users className="w-5 h-5 text-purple-600" />, title: "Community Support", desc: "Native cohort communication architecture allows instantaneous data exchanges and code reviews directly with peers." },
              { icon: <Briefcase className="w-5 h-5 text-rose-600" />, title: "Career-Focused Curriculum", desc: "No extraneous fluff modules. Curriculums align with structural engineering frameworks requested by top tech teams." },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                whileHover="hover"
                className="p-6 bg-white border border-neutral-200/60 rounded-xl shadow-2xs space-y-3 flex flex-col justify-between transition-colors hover:border-neutral-300"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center shadow-3xs">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-bold tracking-tight text-neutral-900">{feature.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-normal">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="p-12 border border-neutral-200/80 rounded-2xl bg-[#fafafa]/60 text-center space-y-6 shadow-sm relative overflow-hidden"
          >
            {/* Subtle Design Grid Accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />
            
            <h2 className="text-4xl font-black tracking-tight text-neutral-900">
              Start Your Learning Journey Today
            </h2>
            <p className="text-lg text-neutral-500 font-normal  mx-auto leading-relaxed">
              Unlock instant authorization keys to our premium course stacks. Accelerate design-to-production pipelines now.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <motion.button variants={buttonScale} whileHover="hover" whileTap="tap" className="bg-blue-600 text-white font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
               <Link className='flex items-center gap-2 group' href="/courses">Browse Courses <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
                
              </motion.button>
              <motion.button variants={buttonScale} whileHover="hover" whileTap="tap" className="bg-white text-neutral-800 font-semibold text-sm px-6 py-3.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-all shadow-2xs">
                Become an Instructor
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;