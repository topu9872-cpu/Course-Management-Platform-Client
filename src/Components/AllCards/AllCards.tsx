'use client'
import { motion } from "framer-motion";
import { Star, MapPin, CalendarDays } from "lucide-react";
import Link from "next/link";

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

const AllCards = ({course}:{course:Course}) => {
  return (
    <div>
        <motion.div
                  
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group flex flex-col h-80 bg-white rounded-2xl border border-gray-200 p-3 transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className={`h-32 ${course.image} rounded-xl mb-3`} />
                  
                  <div className="px-1 flex flex-col grow">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{course.title}</h3>
                    <p className="text-[11px] text-gray-500 mb-3 line-clamp-1">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-y-1.5 text-[10px] text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><CalendarDays size={10}/>{course.date}</span>
                      <span className="flex items-center gap-1 justify-end font-bold text-blue-600">{course.price}</span>
                      <span className="flex items-center gap-1"><MapPin size={10}/>{course.location}</span>
                      <span className="flex items-center gap-1 justify-end font-bold text-gray-800"><Star size={10} className="fill-yellow-400 text-yellow-400"/>{course.rating}</span>
                    </div>

                    <Link href={`/courses/${course.id}`} className="mt-auto text-center w-full py-2 rounded-lg bg-gray-50 text-[11px] font-bold text-gray-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      View Details
                    </Link>
                  </div>
                </motion.div>
    </div>
  );
};

export default AllCards;