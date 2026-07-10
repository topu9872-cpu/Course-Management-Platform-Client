"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Frontend Developer",
    course: "Full Stack Web Development",
    text: "The curriculum is incredibly practical. I went from knowing basic HTML to building production-ready apps in three months.",
    avatar: "https://i.pravatar.cc/100?u=1",
  },
  {
    name: "Sarah Chen",
    role: "UX Researcher",
    course: "UI/UX Design Systems",
    text: "CourseHub completely changed how I approach design. The emphasis on systems-thinking is exactly what top teams are looking for.",
    avatar: "https://i.pravatar.cc/100?u=2",
  },
  {
    name: "Marcus Thorne",
    role: "Data Analyst",
    course: "Data Science Bootcamp",
    text: "The mentorship provided during the capstone project was invaluable. It gave me the confidence to switch into a new career field.",
    avatar: "https://i.pravatar.cc/100?u=3",
  },
  {
    name: "Elena Rossi",
    role: "Product Manager",
    course: "Product Management Pro",
    text: "I loved the flexible learning schedule. I could balance my full-time job while learning advanced PM frameworks at my own pace.",
    avatar: "https://i.pravatar.cc/100?u=4",
  },
  {
    name: "James Wilson",
    role: "Backend Engineer",
    course: "Node.js API Development",
    text: "Clear, concise, and technically rigorous. This is by far the best platform I've used for mastering backend infrastructure.",
    avatar: "https://i.pravatar.cc/100?u=5",
  },
  {
    name: "Linda Park",
    role: "Marketing Lead",
    course: "Digital Marketing Strategy",
    text: "The hands-on projects allowed me to apply what I learned to my actual company marketing campaigns immediately. Incredible value.",
    avatar: "https://i.pravatar.cc/100?u=6",
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

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-[11px]">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-6 tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from learners who have successfully achieved their goals through our platform.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="p-8 bg-white border border-gray-200 rounded-[24px] shadow-sm hover:border-blue-500 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-2 border-gray-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400 mr-1" />
                ))}
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              
              <div className="pt-6 border-t border-gray-100 text-xs font-bold text-blue-600 uppercase tracking-wider">
                {testimonial.course}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors shadow-lg shadow-gray-200"
          >
            Read More Success Stories
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;