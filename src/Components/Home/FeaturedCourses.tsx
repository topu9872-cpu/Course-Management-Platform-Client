"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AllCards from "../AllCards/AllCards";

interface Course {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  date: string;
  rating: number;
  location: string;
}

const COURSES: Course[] = [
  { id: 1, image: "bg-blue-100", title: "Full Stack Development", description: "Master modern web stacks.", price: "$199", date: "Jul 15", rating: 4.9, location: "Online" },
  { id: 2, image: "bg-indigo-100", title: "React Next.js Pro", description: "Deep dive into App Router.", price: "$179", date: "Aug 02", rating: 4.8, location: "Remote" },
  { id: 3, image: "bg-sky-100", title: "TypeScript Mastery", description: "Advanced type safety patterns.", price: "$149", date: "Aug 10", rating: 4.9, location: "Online" },
  { id: 4, image: "bg-slate-100", title: "UI/UX Architecture", description: "Design systems for scale.", price: "$159", date: "Aug 20", rating: 4.7, location: "Hybrid" },
];

const SkeletonCard = () => (
  <div className="h-80 rounded-2xl border border-gray-100 p-3 animate-pulse bg-white">
    <div className="h-32 bg-gray-200 rounded-xl mb-3" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-full mb-6" />
    <div className="h-9 bg-gray-200 rounded-full" />
  </div>
);

const FeaturedCourses: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-350 mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <AnimatePresence>
              {COURSES.map((course) => (
                <AllCards key={course.id} course={course} />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;