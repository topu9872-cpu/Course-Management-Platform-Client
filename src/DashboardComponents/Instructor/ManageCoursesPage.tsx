"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  Search, Plus, Eye, Edit2, Trash2, X, ChevronRight,
  Layers, CheckCircle, Video, Image as ImageIcon,
  ChevronLeft, BookOpen, Star, Users, AlertTriangle
} from "lucide-react";

// --- TypeScript Interfaces ---
interface GalleryItem {
  url: any;
  title: string;
}

interface ModuleItem {
  id: string;
  title: string;
  lessons: string[];
}

interface Course {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  level: string;
  language: string;
  duration: string;
  price: string;
  discountPrice: string;
  maxStudents: string;
  studentsEnrolled: number;
  rating: number;
  lastUpdated: string;
  status: string;
  visibility: string;
  isFeatured: boolean;
  outcomes: string[];
  requirements: string[];
  gallery: GalleryItem[];
  modules: ModuleItem[];
}

// --- Mock Initial Data ---
const initialCoursesData: Course[] = [
  {
    id: "c-1",
    title: "Next.js 14 Production-Ready Masterclass",
    shortDescription: "Master the App Router, Server Components, advanced authentication, and scalable architecture.",
    fullDescription: "Dive deep into modern full-stack development. This course bridges the gap between basic tutorials and production-grade applications, focused completely on the Next.js App Router ecosystem.",
    category: "Development",
    level: "Advanced",
    language: "English",
    duration: "24 hours",
    price: "199",
    discountPrice: "149",
    maxStudents: "500",
    studentsEnrolled: 142,
    rating: 4.9,
    lastUpdated: "2026-06-15",
    status: "Published",
    visibility: "Public",
    isFeatured: true,
    outcomes: ["React Server Components (RSC)", "Next.js App Router", "Monorepo Architecture"],
    requirements: ["Basic JavaScript", "React Fundamentals"],
    gallery: [{ url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop", title: "Architecture Preview" }],
    modules: [{ id: "m-1", title: "Core Architecture", lessons: ["Server vs Client Components", "Streaming & Suspense"] }]
  },
  {
    id: "c-2",
    title: "UI/UX Design Systems with Figma",
    shortDescription: "Build scalable, token-driven design systems for elite product design applications.",
    fullDescription: "Learn how to establish typography grids, absolute color primitives, and production-ready component variants inside modern team workspaces.",
    category: "Design",
    level: "Intermediate",
    language: "English",
    duration: "16 hours",
    price: "129",
    discountPrice: "99",
    maxStudents: "300",
    studentsEnrolled: 89,
    rating: 4.7,
    lastUpdated: "2026-07-02",
    status: "Draft",
    visibility: "Public",
    isFeatured: false,
    outcomes: ["Figma Component Tokens", "Atomic Layout Foundations"],
    requirements: ["Figma Interface Basics"],
    gallery: [],
    modules: [{ id: "m-2", title: "Foundations", lessons: ["Design Tokens Setup", "Spacing & Layout Grids"] }]
  }
];

export default function ManageCoursesPage() {
  // --- Core React State ---
  const [courses, setCourses] = useState<Course[]>(initialCoursesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // --- Modal / Drawer Active Targets ---
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);

  // --- Derived Data ---
  const courseToDelete = courses.find(c => c.id === deletingCourseId);

  // --- Helpers for Edit Dynamic Arrays ---
  const updateEditField = (key: keyof Course, value: any) => 
    setEditingCourse((prev) => prev ? { ...prev, [key]: value } : null);

  const addArrayItem = (key: "outcomes" | "modules", template: any) => 
    setEditingCourse((prev) => prev ? { ...prev, [key]: [...prev[key], template] } : null);

  const removeArrayItem = (key: "outcomes" | "modules", idx: number) => 
    setEditingCourse((prev) => prev ? { ...prev, [key]: prev[key].filter((_, i) => i !== idx) } : null);

  // --- Filtering & Pagination Logic ---
  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const coursesPerPage = 5;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage) || 1;
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  // --- Operations / Actions ---
  const handleSaveChanges = () => {
    if (!editingCourse) return;
    setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...editingCourse, lastUpdated: new Date().toISOString().split('T')[0] } : c));
    setEditingCourse(null);
    toast.success("Course updated successfully.");
  };

  const handleDeleteConfirm = () => {
    if (!deletingCourseId) return;
    setCourses(prev => prev.filter(c => c.id !== deletingCourseId));
    setDeletingCourseId(null);
    toast.success("Course deleted successfully.");
  };

  const handleCreateNewPlaceholder = () => {
    const newId = `c-${Date.now()}`;
    const newCourse: Course = {
      id: newId,
      title: "Untitled New Curriculum Structure",
      shortDescription: "Short placeholder snapshot description frame.",
      fullDescription: "Extended program scope description workspace.",
      category: "Development",
      level: "Beginner",
      language: "English",
      duration: "10 hours",
      price: "99",
      discountPrice: "",
      maxStudents: "100",
      studentsEnrolled: 0,
      rating: 0.0,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: "Draft",
      visibility: "Public",
      isFeatured: false,
      outcomes: ["New Core Outcome Setup"],
      requirements: ["Basic Foundation Prerequisites"],
      gallery: [],
      modules: [{ id: `m-${Date.now()}`, title: "Module 1: Getting Started", lessons: ["First Initial Session Overview"] }]
    };
    setCourses([newCourse, ...courses]);
    toast.success("New shell course framework created.");
  };

const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // upload or preview
};

const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // upload or preview
};

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 antialiased selection:bg-blue-500/10 text-sm pb-12">
      <Toaster position="top-right" richColors />

      <motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Courses</h1>
            <p className="text-xs text-slate-500 mt-0.5">View, edit, configure, and orchestrate your academic course portfolio.</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCreateNewPlaceholder} className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-xs shadow-blue-500/10 self-start md:self-auto">
            <Plus className="w-4 h-4" /> Create Course
          </motion.button>
        </div>

        {/* Filters Top Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs mb-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search course titles or categories..." className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-blue-500 transition-colors" value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
              <option value="All">All Statuses</option>
              <option value="Published">Published Only</option>
              <option value="Draft">Draft Status</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500" value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}>
              <option value="All">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
            </select>
          </div>
        </div>

        {/* Desktop Table & Mobile List Layout Component */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto mt-8 shadow-2xs">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-slate-900 text-base">No Courses Found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">Adjust filters or create a new curriculum footprint layout scheme.</p>
            <button onClick={handleCreateNewPlaceholder} className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-50 text-blue-600 font-medium rounded-lg text-xs hover:bg-blue-100 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Initialize First Template
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table Architecture */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 text-[11px] uppercase font-bold tracking-wider">
                    <th className="py-3 px-4">Course Info</th>
                    <th className="py-3 px-4">Category / Level</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Metrics</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {paginatedCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/40 transition-colors group">
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-9 bg-slate-100 rounded-md border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                            {course.gallery[0]?.url ? <img src={course.gallery[0].url} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="w-4 h-4" />}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block line-clamp-1 text-xs">{course.title}</span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">Updated {course.lastUpdated}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <span className="text-slate-700 block font-medium">{course.category}</span>
                        <span className="text-[10px] text-slate-400 block">{course.level}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">${course.price}</td>
                      <td className="py-3.5 px-4 text-xs space-y-0.5">
                        <span className="flex items-center gap-1 text-slate-600"><Users className="w-3 h-3 text-slate-400" /> {course.studentsEnrolled}</span>
                        <span className="flex items-center gap-1 text-slate-600"><Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {course.rating || "0.0"}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${course.status === "Published" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => setViewingCourse(course)} className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="View Shell"><Eye className="w-4 h-4" /></button>
                          <button onClick={() => setEditingCourse(JSON.parse(JSON.stringify(course)))} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Properties"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => setDeletingCourseId(course.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Course"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards Stack */}
            <div className="block md:hidden space-y-3">
              {paginatedCourses.map((course) => (
                <div key={course.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                  <div className="flex gap-3">
                    <div className="w-16 h-10 bg-slate-100 rounded border overflow-hidden flex items-center justify-center text-slate-400 shrink-0">
                      {course.gallery[0]?.url ? <img src={course.gallery[0].url} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-xs line-clamp-2">{course.title}</h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{course.category} • {course.level}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-2.5">
                    <div className="flex gap-3">
                      <span className="font-bold text-slate-900">${course.price}</span>
                      <span className="text-slate-500 flex items-center gap-0.5"><Users className="w-3 h-3" /> {course.studentsEnrolled}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setViewingCourse(course)} className="p-1.5 text-slate-600 hover:bg-slate-50 rounded-md border border-slate-200"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setEditingCourse(JSON.parse(JSON.stringify(course)))} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md border border-blue-100"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setDeletingCourseId(course.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md border border-red-100"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shared Pagination Infrastructure */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-4 text-xs">
              <span className="text-slate-500">Page <strong className="text-slate-700">{currentPage}</strong> of {totalPages}</span>
              <div className="flex items-center gap-1">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </>
        )}
      </motion.main>

      {/* --- View Right Side Drawer Component --- */}
      <AnimatePresence>
        {viewingCourse && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end">
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.35 }} className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">Course Visualizer</h2>
                  <p className="text-[11px] text-slate-400">Read-only program validation model shell.</p>
                </div>
                <button onClick={() => setViewingCourse(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-600">
                <div className="aspect-video w-full bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400">
                  {viewingCourse.gallery[0]?.url ? <img src={viewingCourse.gallery[0].url} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="w-10 h-10" />}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{viewingCourse.category}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{viewingCourse.title}</h3>
                  <p className="text-slate-500 mt-1 font-medium">{viewingCourse.shortDescription}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px]">
                  <div><span className="text-slate-400">Target Level:</span> <strong className="text-slate-700">{viewingCourse.level}</strong></div>
                  <div><span className="text-slate-400">System Pricing:</span> <strong className="text-slate-700">${viewingCourse.price}</strong></div>
                  <div><span className="text-slate-400">Duration Scope:</span> <strong className="text-slate-700">{viewingCourse.duration}</strong></div>
                  <div><span className="text-slate-400">Enrolled Core:</span> <strong className="text-slate-700">{viewingCourse.studentsEnrolled} Learners</strong></div>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-slate-900 uppercase tracking-wide text-[10px]">Full Operational Scope</h4>
                  <p className="leading-relaxed bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">{viewingCourse.fullDescription}</p>
                </div>
                {/* Outcomes Checklist Preview */}
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-slate-900 uppercase tracking-wide text-[10px]">Expected Learning Milestones</h4>
                  <ul className="space-y-1 pl-1">
                    {viewingCourse.outcomes.map((o: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1.5 text-slate-700"><CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {o}</li>
                    ))}
                  </ul>
                </div>
                {/* Curriculum Framework */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900 uppercase tracking-wide text-[10px]">Curriculum Schema</h4>
                  {viewingCourse.modules.map((m: any, idx: number) => (
                    <div key={m.id} className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/40">
                      <span className="font-bold text-slate-800 block text-xs mb-1.5">M{idx + 1}: {m.title}</span>
                      <div className="space-y-1 pl-2 border-l border-slate-200">
                        {m.lessons.map((l: string, li: number) => (
                          <span key={li} className="block text-slate-500 text-[11px] font-medium">• {l}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Large Edit Course Modal Window --- */}
      <AnimatePresence>
        {editingCourse && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="bg-white rounded-xl border border-slate-200 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">Modify Curriculum Footprint</h2>
                  <p className="text-[10px] text-slate-400">Orchestrate internal data properties without real-time database write mutations.</p>
                </div>
                <button onClick={() => setEditingCourse(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200"><X className="w-4 h-4" /></button>
              </div>

              <div className="p-5 space-y-6 overflow-y-auto text-xs flex-1">
                {/* Basic Section Form */}
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-900 flex items-center gap-1.5 pb-1 border-b border-slate-100"><Layers className="w-4 h-4 text-blue-600" /> Basic Configurations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* NEW: Cover Image URL Field */}
                    <div className="sm:col-span-2 flex gap-3">
                      <div className="w-16 h-12 bg-slate-100 rounded-md border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                         {editingCourse.gallery[0]?.url ? <img src={editingCourse.gallery[0].url} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="w-5 h-5" />}
                      </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Course Thumbnail */}
  <div className="space-y-2">
    <label className="text-sm font-medium">Course Thumbnail</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleThumbnailChange}
      className="w-full rounded-lg border p-2"
    />
  </div>

  {/* Course Banner */}
  <div className="space-y-2">
    <label className="text-sm font-medium">Course Banner</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleBannerChange}
      className="w-full rounded-lg border p-2"
    />
  </div>
</div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-500 font-medium mb-1">Course Primary Title</label>
                      <input type="text" className="w-full rounded-md border border-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500" value={editingCourse.title} onChange={e => updateEditField("title", e.target.value)} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-500 font-medium mb-1">Short Description Hook</label>
                      <input type="text" className="w-full rounded-md border border-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500" value={editingCourse.shortDescription} onChange={e => updateEditField("shortDescription", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-medium mb-1">Category Select</label>
                      <select className="w-full rounded-md border border-slate-200 px-3 py-1.5 bg-white focus:outline-none focus:border-blue-500" value={editingCourse.category} onChange={e => updateEditField("category", e.target.value)}>
                        <option>Development</option>
                        <option>Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 font-medium mb-1">Target Skill Bracket</label>
                      <select className="w-full rounded-md border border-slate-200 px-3 py-1.5 bg-white focus:outline-none focus:border-blue-500" value={editingCourse.level} onChange={e => updateEditField("level", e.target.value)}>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 font-medium mb-1">Base Cost ($)</label>
                      <input type="number" className="w-full rounded-md border border-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500" value={editingCourse.price} onChange={e => updateEditField("price", e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-medium mb-1">Allocation Caps (Max Students)</label>
                      <input type="number" className="w-full rounded-md border border-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500" value={editingCourse.maxStudents} onChange={e => updateEditField("maxStudents", e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* Outcomes Core Management */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                    <h3 className="font-bold text-slate-900 flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-blue-600" /> Outlined Outcomes</h3>
                    <button onClick={() => addArrayItem("outcomes", "")} className="text-[11px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100">+ Add Outcome</button>
                  </div>
                  <div className="space-y-1.5">
                    {editingCourse.outcomes.map((out: string, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <input type="text" className="w-full rounded-md border border-slate-200 px-3 py-1 focus:outline-none" value={out} onChange={e => {
                          const cloned = [...editingCourse.outcomes]; cloned[idx] = e.target.value; updateEditField("outcomes", cloned);
                        }} />
                        <button onClick={() => removeArrayItem("outcomes", idx)} className="text-slate-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Modular Curriculum Matrix Builder */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                    <h3 className="font-bold text-slate-900 flex items-center gap-1.5"><Video className="w-4 h-4 text-blue-600" /> Structure Syllabus Modules</h3>
                    <button onClick={() => addArrayItem("modules", { id: `m-${Date.now()}`, title: "New Dynamic Module", lessons: ["First Template Lesson"] })} className="text-[11px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100">+ Add Module</button>
                  </div>
                  <div className="space-y-3">
                    {editingCourse.modules.map((mod: any, mIdx: number) => (
                      <div key={mod.id} className="border border-slate-200 bg-slate-50/50 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <input type="text" className="bg-transparent border-none font-bold text-slate-800 focus:outline-none text-xs w-4/5" value={mod.title} onChange={e => {
                            const updatedMods = editingCourse.modules.map((m: any) => m.id === mod.id ? { ...m, title: e.target.value } : m);
                            updateEditField("modules", updatedMods);
                          }} />
                          <button onClick={() => removeArrayItem("modules", mIdx)} className="text-slate-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                        <div className="space-y-1.5 pl-3 border-l-2 border-slate-200">
                          {mod.lessons.map((les: string, lIdx: number) => (
                            <div key={lIdx} className="flex gap-2 items-center bg-white border border-slate-150 rounded px-2 py-0.5">
                              <input type="text" className="w-full border-none p-0 text-[11px] focus:outline-none" value={les} onChange={e => {
                                const updatedLessons = mod.lessons.map((l: string, li: number) => li === lIdx ? e.target.value : l);
                                const updatedMods = editingCourse.modules.map((m: any) => m.id === mod.id ? { ...m, lessons: updatedLessons } : m);
                                updateEditField("modules", updatedMods);
                              }} />
                              <button onClick={() => {
                                const updatedLessons = mod.lessons.filter((_: any, li: number) => li !== lIdx);
                                const updatedMods = editingCourse.modules.map((m: any) => m.id === mod.id ? { ...m, lessons: updatedLessons } : m);
                                updateEditField("modules", updatedMods);
                              }} className="text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                            </div>
                          ))}
                          <button onClick={() => {
                            const updatedLessons = [...mod.lessons, "New Track Session Placeholder"];
                            const updatedMods = editingCourse.modules.map((m: any) => m.id === mod.id ? { ...m, lessons: updatedLessons } : m);
                            updateEditField("modules", updatedMods);
                          }} className="text-[10px] text-slate-500 hover:text-blue-600 font-medium block mt-1">+ Append Track Session</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Toggle Configuration Controls */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-500 mb-1 font-medium">Lifecycle Status</label>
                    <div className="flex gap-1.5">
                      {["Draft", "Published"].map(st => (
                        <button key={st} onClick={() => updateEditField("status", st)} className={`flex-1 py-1 text-[11px] font-semibold border rounded-md transition-colors ${editingCourse.status === st ? "border-blue-600 bg-blue-100/40 text-blue-700" : "bg-white text-slate-600 hover:bg-slate-100"}`}>{st}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-l border-slate-200 pl-4">
                    <div>
                      <span className="font-semibold text-slate-800 block">Featured Placement</span>
                      <span className="text-[10px] text-slate-400 block">Elevate layout within showcase zones.</span>
                    </div>
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" checked={editingCourse.isFeatured} onChange={e => updateEditField("isFeatured", e.target.checked)} />
                  </div>
                </div>
              </div>

              {/* Action Buttons for Edit Modal */}
              <div className="p-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50">
                <button onClick={() => setEditingCourse(null)} className="px-4 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 font-medium text-slate-700 transition-colors">Cancel</button>
                <button onClick={handleSaveChanges} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-xs shadow-blue-500/10 transition-colors">Save Changes</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Upgraded Delete Confirmation Modal --- */}
      <AnimatePresence>
        {deletingCourseId && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-xl border border-slate-200 w-full max-w-md p-6 shadow-2xl space-y-5">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 shrink-0 border border-red-100">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Delete Course?</h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    Are you sure you want to delete <strong className="text-slate-800 font-semibold">"{courseToDelete?.title}"</strong>? 
                    This action is permanent and cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setDeletingCourseId(null)} className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-100 font-medium text-slate-700 transition-colors">
                  Cancel
                </button>
                <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-xs shadow-red-500/20">
                  Yes, Delete Course
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}