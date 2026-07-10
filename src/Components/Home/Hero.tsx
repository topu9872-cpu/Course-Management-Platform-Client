"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Award, 
  ChevronDown, 
  PlayCircle, 
  TrendingUp, 
  Star 
} from "lucide-react";
import Link from "next/link";

const HeroSection= () => {
  return (
    <section className="relative flex w-full  items-center overflow-hidden bg-slate-50 px-6 lg:px-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] h-150 w-150 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] h-125 w-125 rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="container relative mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left Side: Content */}
        <div className="z-10 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 md:text-7xl">
              Learn Without <span className="text-blue-600">Limits</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600 leading-relaxed">
              Empower your future with our industry-leading online learning platform. 
              Access expert-led courses, real-time analytics, and a global community 
              designed to accelerate your professional growth.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
            >
            <Link href="/courses">Browse Courses</Link>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl border-2 border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              Become an Instructor
            </motion.button>
          </motion.div>

          <div className="flex gap-8 pt-4">
            {[
              { label: "Students", count: "5,000+", icon: Users },
              { label: "Courses", count: "200+", icon: BookOpen },
              { label: "Expert Instructors", count: "50+", icon: Award },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex flex-col gap-1"
              >
                <div className="flex items-center gap-2 text-blue-600">
                  <stat.icon size={20} />
                  <span className="text-xl font-bold text-slate-900">{stat.count}</span>
                </div>
                <span className="text-sm text-slate-500 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Dashboard Illustration */}
        <motion.div 
          className="relative hidden lg:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Dashboard Card */}
          <div className="relative h-105 w-130 rounded-3xl border border-white/50 bg-white/60 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-800">Learning Overview</h3>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-blue-200" />
                ))}
              </div>
            </div>

            {/* Course Card */}
            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-100 mb-4">
              <div className="h-16 w-16 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <PlayCircle size={32} />
              </div>
              <div className="flex-1">
                <div className="h-2 w-32 rounded-full bg-slate-100 mb-2">
                  <div className="h-full w-2/3 rounded-full bg-blue-500" />
                </div>
                <p className="text-sm font-semibold text-slate-800">Advanced React Patterns</p>
              </div>
            </div>

            {/* Analytics Card */}
            <div className="rounded-2xl bg-slate-900 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm opacity-70">Monthly Growth</span>
                <TrendingUp size={20} className="text-green-400" />
              </div>
              <div className="h-24 w-full flex items-end gap-2">
                {[40, 70, 45, 90, 60].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-lg bg-blue-500/30" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Floating UI Element */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-8 top-20 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl"
          >
            <div className="rounded-full bg-yellow-100 p-2 text-yellow-600">
              <Star size={20} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Top Rated</p>
              <p className="text-sm font-bold text-slate-900">4.9 Instructor Score</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-400"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
};

export default HeroSection;