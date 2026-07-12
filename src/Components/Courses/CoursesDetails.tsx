"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Users,
  Clock,
  Globe,
  Share2,
  Heart,
  Check,
  ChevronDown,
  ShieldCheck,
  ImageIcon,
} from "lucide-react";
import EnrollButton from "@/Components/Courses/EnrollModal";

export default function CourseDetails({ detailsData }: any) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [expandedModules, setExpandedModules] = useState<
    Record<string, boolean>
  >({ m0: true });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen pt-24 bg-[#fafafa] text-neutral-900 antialiased font-sans selection:bg-blue-500/10">
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-2 space-y-14">
          {/* Header & Meta Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-200/60 pb-4">
              <div className="flex gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-blue-600 border border-blue-100">
                  {detailsData.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-neutral-100 text-neutral-600 border border-neutral-200/40">
                  {detailsData.level}
                </span>
              </div>
              <div className="flex gap-5 text-xs font-bold tracking-wider uppercase text-neutral-500">
                <button className="flex items-center gap-2 hover:text-neutral-900 transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex items-center gap-2 hover:text-neutral-900 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 transition-all ${isWishlisted ? "fill-rose-500 text-rose-500 scale-110" : ""}`}
                  />
                  {isWishlisted ? "Wishlisted" : "Save"}
                </button>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-[1.15]">
              {detailsData.title}
            </h1>
            <p className="text-xl text-neutral-500/90 font-normal leading-relaxed max-w-3xl">
              {detailsData.shortDescription}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-600 font-medium pt-6 border-t border-neutral-200/60">
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />{" "}
                <b className="text-neutral-900">{detailsData.rating|| '4.5'}</b>
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-neutral-400" />{" "}
                {detailsData.students} enrolled
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-400" />{" "}
                {detailsData.duration}
              </span>
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-neutral-400" />{" "}
                {detailsData.language}
              </span>
            </div>
          </div>

          {/* Interactive Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-2xl bg-neutral-900 border border-neutral-200/80 overflow-hidden shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIdx}
                  src={
                    detailsData.gallery[activeImageIdx]?.url ||
                    detailsData.url ||
                    detailsData.gallery.thumbnail
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute bottom-4 left-4 bg-neutral-950/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider flex items-center gap-2 border border-white/10">
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" />{" "}
                {detailsData.gallery[activeImageIdx]?.title ||
                  "COURSE THUMBNAIL"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {detailsData?.gallery?.map((img: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`p-4 rounded-xl border text-left transition-all ${activeImageIdx === idx ? "border-blue-600 bg-blue-50/50" : "border-neutral-200 bg-white"}`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                    Preview 0{idx + 1}
                  </span>
                  <span className="text-sm font-bold block text-neutral-800">
                    {img.title || img.alt}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-6 border-t border-neutral-200/80 pt-10">
            <h3 className="text-2xl font-extrabold text-neutral-900">
              Learning Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {detailsData?.learningOutcomes?.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl border border-neutral-200/60 bg-white shadow-sm"
                >
                  <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span className="text-sm font-semibold text-neutral-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus */}
          <div className="space-y-6 border-t border-neutral-200/80 pt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-neutral-900">
                Program Syllabus
              </h3>
              <span className="text-sm font-medium text-neutral-500">
                {detailsData.modules.length} Modules
              </span>
            </div>

            <div className="space-y-3">
              {detailsData?.modules?.map((module: any, idx: number) => {
                const id = `m${idx}`;
                const isOpen = !!expandedModules[id];

                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl transition-all duration-300 ease-in-out ${isOpen ? "border-blue-200 bg-blue-50/30" : "border-neutral-200 bg-white hover:border-neutral-300"}`}
                  >
                    <button
                      onClick={() => toggleModule(id)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${isOpen ? "bg-blue-600 text-white" : "bg-neutral-100 text-neutral-600"}`}
                        >
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-neutral-900">
                          {detailsData?.modules.join(',')}
                        </h4>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0 pl-17">
                            {" "}
                            {/* Padding aligned with text */}
                            <ul className="space-y-3 border-l-2 border-neutral-200 pl-6">
                              {module?.lessons?.map(
                                (lesson: string, i: number) => (
                                  <li
                                    key={i}
                                    className="text-sm font-medium text-neutral-600 flex items-center gap-3"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    {lesson}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Pricing */}
        <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-6">
          <div className="border border-neutral-200 rounded-2xl shadow-xl bg-white overflow-hidden">
            <div className="p-8 border-b bg-[#fafafa] space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">
                  ${detailsData.discountPrice}
                </span>
                <span className="text-lg text-neutral-400 line-through">
                  ${detailsData.price}
                </span>
              </div>
              <p className="text-xs font-bold text-blue-600 uppercase pt-2">
                Instructor: {detailsData.instructor}
              </p>
            </div>
            <div className="p-8 space-y-6">
              <EnrollButton detailsData={detailsData} />
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />{" "}
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <div className="pt-4 border-t text-xs text-neutral-500 space-y-2">
                <p>Location: {detailsData.location}</p>
                <p>Starts: {detailsData.startDate}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
