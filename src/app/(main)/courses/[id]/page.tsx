"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Users, Clock, Globe,  Share2, Heart, Check,
  ChevronDown, BookOpen, Award, Radio, Smartphone,
  Download, MessageSquare, Code, ArrowRight, ShieldCheck, ImageIcon
} from "lucide-react";

// --- Cleaned & Structured Data ---
const modulesData = [
  {
    id: "m1",
    title: "Module 1: Introduction & System Architecture",
    lessons: ["Welcome & Platform Tour", "Understanding Server-Driven UI", "Setting up Next.js", "TypeScript Core Principles"],
  },
  {
    id: "m2",
    title: "Module 2: Advanced Dynamic Components & State Management",
    lessons: ["Deep Dive into RSC", "State hydration boundaries", "Composition patterns", "Building layout engines"],
  },
];

const galleryImages = [
  { id: "i1", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80", title: "System Topology" },
  { id: "i2", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80", title: "Codebase Blueprint" },
];

const checklistItems = [
  "React Server Components (RSC)", "Next.js App Routing Engine",
  "TypeScript Advanced Structuring", "Edge-runtime Authentication Handshakes"
];

export default function CourseDetailsPage() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ m1: true });

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen pt-24 bg-[#fafafa] text-neutral-900 antialiased font-sansselection:bg-blue-500/10">
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-2 space-y-14">
          
          {/* Header & Meta Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-200/60 pb-4">
              <div className="flex gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-blue-600 border border-blue-100">Engineering</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-neutral-100 text-neutral-600 border border-neutral-200/40">Advanced</span>
              </div>
              <div className="flex gap-5 text-xs font-bold tracking-wider uppercase text-neutral-500">
                <button className="flex items-center gap-2 hover:text-neutral-900 transition-colors"><Share2 className="w-4 h-4" /> Share</button>
                <button onClick={() => setIsWishlisted(!isWishlisted)} className="flex items-center gap-2 hover:text-neutral-900 transition-colors">
                  <Heart className={`w-4 h-4 transition-all ${isWishlisted ? "fill-rose-500 text-rose-500 scale-110" : ""}`} />
                  {isWishlisted ? "Wishlisted" : "Save"}
                </button>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-[1.15]">
              Advanced Frontend Architecture: <span className="text-neutral-500">Production-Ready Scale</span>
            </h1>
            <p className="text-xl text-neutral-500/90 font-normal leading-relaxed max-w-3xl">
              Master Stripe-level design pipelines, robust data aggregation layers, and multi-tenant UI engineering ecosystems.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-600 font-medium pt-6 border-t border-neutral-200/60">
              <span className="flex items-center gap-2"><Star className="w-4 h-4 fill-amber-500 text-amber-500" /> <b className="text-neutral-900">4.96</b> (4,820 ratings)</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-neutral-400" /> 14,890 enrolled</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-neutral-400" /> 34 hours total</span>
              <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-neutral-400" /> English [CC]</span>
            </div>
          </div>

          {/* Interactive Workspace Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-2xl bg-neutral-900 border border-neutral-200/80 overflow-hidden shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImageIdx} 
                  src={galleryImages[activeImageIdx].url} 
                  initial={{ opacity: 0, scale: 1.02 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover" 
                />
              </AnimatePresence>
              <div className="absolute bottom-4 left-4 bg-neutral-950/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider flex items-center gap-2 border border-white/10">
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" /> {galleryImages[activeImageIdx].title.toUpperCase()}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((img, idx) => (
                <button 
                  key={img.id} 
                  onClick={() => setActiveImageIdx(idx)} 
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-20 ${
                    activeImageIdx === idx 
                      ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/10 shadow-sm" 
                      : "border-neutral-200 bg-white hover:bg-neutral-50"
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Preview 0{idx + 1}</span>
                  <span className={`text-sm font-bold truncate ${activeImageIdx === idx ? "text-blue-700" : "text-neutral-800"}`}>{img.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Matrix Checklist */}
          <div className="space-y-6 border-t border-neutral-200/80 pt-10">
            <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900">Core Competencies Strategy Matrix</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-4 rounded-xl border border-neutral-200/60 bg-white shadow-sm">
                  <div className="mt-0.5 p-0.5 bg-blue-50 rounded-md border border-blue-100">
                    <Check className="w-4 h-4 text-blue-600 stroke-3" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-700 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Syllabus Accordion */}
          <div className="space-y-6 border-t border-neutral-200/80 pt-10">
            <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900">Program Syllabus & Structure</h3>
            <div className="space-y-4">
              {modulesData.map((module) => {
                const isOpen = !!expandedModules[module.id];
                return (
                  <div key={module.id} className="border border-neutral-200 bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-200">
                    <button 
                      onClick={() => toggleModule(module.id)} 
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50/50 transition-colors"
                    >
                      <div className="space-y-1.5 pr-4">
                        <h4 className="font-bold text-base sm:text-lg text-neutral-900 tracking-tight">{module.title}</h4>
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> {module.lessons.length} Engineering Phases
                        </span>
                      </div>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-5 h-5 text-neutral-400 stroke-[2.5]" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="border-t border-neutral-100 bg-neutral-50/40 px-6 py-3 divide-y divide-neutral-100">
                            {module.lessons.map((lesson, idx) => (
                              <div key={idx} className="py-3.5 flex justify-between items-center text-sm group">
                                <span className="font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                                  <span className="text-neutral-400 font-mono mr-2">0{idx + 1}</span> {lesson}
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 bg-white px-2 py-1 rounded border shadow-2xs">Video</span>
                              </div>
                            ))}
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

        {/* RIGHT COLUMN: Premium Sticky Pricing Panel */}
        <div className="lg:col-span-1 lg:sticky lg:top-28 space-y-6 w-full">
          <div className="border border-neutral-200/80 bg-white rounded-2xl shadow-xl overflow-hidden ring-1 ring-black/5">
            <div className="p-8 border-b border-neutral-100 space-y-3 bg-[#fafafa]">
              <div className="flex items-baseline gap-2.5">
                <span className="text-5xl font-black tracking-tight text-neutral-900">$399</span>
                <span className="text-base text-neutral-400 line-through font-medium">$799</span>
                <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-black tracking-wider uppercase rounded ml-auto shadow-sm">50% OFF</span>
              </div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Limited architecture cohorts left</p>
            </div>

            <div className="p-8 space-y-6">
              <button className="w-full bg-neutral-900 text-white font-bold text-sm tracking-wide py-4 rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group shadow-md active:scale-[0.99]">
                Enroll In Program Now 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 stroke-[2.5]" /> <span>30-Day Money-Back Guarantee</span>
              </div>

              <div className="border-t border-neutral-100 pt-6 space-y-4">
                <h5 className="text-xs font-black uppercase tracking-widest text-neutral-400">Program Assets Included:</h5>
                <div className="grid grid-cols-1 gap-3.5 text-sm font-semibold text-neutral-700">
                  {[
                    { icon: <Award className="w-4 h-4 text-blue-500" />, text: "Architecture Certificate" },
                    { icon: <Code className="w-4 h-4 text-indigo-500" />, text: "GitHub Enterprise Repos" },
                    { icon: <Radio className="w-4 h-4 text-emerald-500" />, text: "Private Slack Access" },
                    { icon: <Download className="w-4 h-4 text-amber-500" />, text: "24 Resource Guides" },
                    { icon: <Smartphone className="w-4 h-4 text-purple-500" />, text: "Lifetime Sandbox Access" },
                    { icon: <MessageSquare className="w-4 h-4 text-rose-500" />, text: "Direct Review Q&A" }
                  ].map((perk, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-1 bg-neutral-50 rounded border">{perk.icon}</div>
                      <span>{perk.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}