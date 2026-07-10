"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, BookOpen, MonitorPlay, Award, ArrowRight } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up in seconds using your email or Google account.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Choose a Course",
    description: "Browse categories and enroll in the course that matches your goals.",
  },
  {
    number: "03",
    icon: MonitorPlay,
    title: "Learn at Your Own Pace",
    description: "Watch lessons, complete assignments, and track your progress anytime.",
  },
  {
    number: "04",
    icon: Award,
    title: "Earn Your Certificate",
    description: "Complete the course successfully and receive a verified certificate.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-[11px]">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">
            Start Learning in Four Simple Steps
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of learners and begin your learning journey with an easy and seamless process.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="relative p-8 bg-white border border-gray-200 rounded-[24px] shadow-sm hover:border-blue-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">
                  {step.number}
                </span>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-900">
                  <step.icon size={20} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200"
          >
            Start Learning Today
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;