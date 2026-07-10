"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Calendar,
  Award,
  Code,
  MessageSquare,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from industry leaders with decades of real-world experience.",
  },
  {
    icon: BookOpen,
    title: "Industry-Focused",
    description: "Curriculum designed to meet the demands of modern tech companies.",
  },
  {
    icon: Calendar,
    title: "Flexible Learning",
    description: "Access content anytime, anywhere, at your own comfortable pace.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description: "Earn industry-recognized credentials to boost your professional profile.",
  },
  {
    icon: Code,
    title: "Hands-on Projects",
    description: "Build a portfolio with real-world applications and coding challenges.",
  },
  {
    icon: MessageSquare,
    title: "Community & Support",
    description: "Get personalized guidance from mentors and connect with peers.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-indigo-50/50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />

      <div className="relative container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-xs">
            Why Choose CourseHub
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">
            Designed for your success
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We combine expert knowledge with a flexible, project-based approach 
            to help you master the skills that matter.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group p-8 bg-white border border-gray-200 rounded-3xl shadow-sm hover:border-blue-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-900 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {feature.description}
              </p>
              <div className=" text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
               <Link className="flex items-center" href="/about"> Learn more <ArrowRight size={16} className="ml-2" /></Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-4 bg-white border border-gray-200 rounded-full font-semibold text-gray-900 hover:border-gray-900 transition-colors"
          >
           <Link href="/courses"> Explore Courses </Link>
            <ChevronRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;