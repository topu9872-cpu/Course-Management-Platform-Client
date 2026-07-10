"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Layers,
  Database,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  {
    icon: Code2,
    title: "Web Development",
    count: "450+ Courses",
    description: "Master modern frameworks and backend architectures.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    count: "280+ Courses",
    description: "Build native and cross-platform mobile experiences.",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    count: "320+ Courses",
    description: "Design intuitive interfaces and user-centric products.",
  },
  {
    icon: Database,
    title: "Data Science",
    count: "500+ Courses",
    description: "Unlock insights with advanced analytics and statistics.",
  },
  {
    icon: BrainCircuit,
    title: "Artificial Intelligence",
    count: "390+ Courses",
    description: "Learn machine learning, NLP, and neural networks.",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    count: "210+ Courses",
    description: "Deploy scalable infrastructure with AWS, Azure, and GCP.",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    count: "150+ Courses",
    description: "Protect digital assets and master threat detection.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    count: "410+ Courses",
    description: "Drive growth through data-driven marketing strategies.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PopularCategories: React.FC = () => {
  return (
    <section className="relative  bg-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-blue-50/50 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-blue-50/50 rounded-full blur-[100px] translate-x-1/2" />

      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold tracking-widest uppercase text-[11px]"
          >
            Categories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6 tracking-tight"
          >
            Explore Learning Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-xl mx-auto"
          >
            Choose a learning path that matches your goals and interests.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group flex flex-col p-8 bg-white border border-gray-200 rounded-[24px] shadow-sm hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-900 mb-6 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <cat.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{cat.title}</h3>
              <p className="text-blue-600 font-medium text-[12px] mb-3">{cat.count}</p>
              <p className="text-gray-600 text-sm grow leading-relaxed">
                {cat.description}
              </p>
              
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200"
          >
            <Link href="/courses">Browse All Categories</Link>
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;