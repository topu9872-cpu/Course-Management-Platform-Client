"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  Search, Filter, SlidersHorizontal, Calendar, Clock, 
  FileText, Link as LinkIcon, CheckCircle2, AlertCircle, 
  HelpCircle, ChevronLeft, ChevronRight, UploadCloud, ExternalLink 
} from "lucide-react";

// --- MOCK ASSIGNMENTS DATA ---
const MOCK_ASSIGNMENTS = [
  { id: "a1", title: "Build an E-Commerce Backend API", course: "Node.js Microservices Core", instructor: "Alex Rivers", dueDate: "2026-07-18", daysLeft: 8, status: "Pending", marks: "100 Points", description: "Design and implement a highly scalable RESTful API with automated database indexing, Redis token validation caching, and robust distributed event-driven order processing streams using Node.js, Express, and MongoDB architectures.", allowedFiles: "ZIP, TAR (Max 50MB)", resources: ["API-Spec-v2.pdf", "Database-Schema-Baseline.json"] },
  { id: "a2", title: "Optimizing Next.js Dynamic Edge Hydration", course: "Advanced Production Architecture", instructor: "Sarah Jenkins", dueDate: "2026-07-12", daysLeft: 2, status: "Pending", marks: "50 Points", description: "Profile production server-side hydration metrics. Isolate bottlenecks in heavy client-side sub-trees, implement optimized Next.js partial pre-rendering (PPR), and configure custom Edge middleware caching layouts.", allowedFiles: "PDF, TXT, GitHub URL", resources: ["Edge-Hydration-Traces.json"] },
  { id: "a3", title: "Design System Tokens & Variable Composition", course: "Enterprise Design Systems", instructor: "Michael Chen", dueDate: "2026-07-05", daysLeft: -5, status: "Overdue", marks: "100 Points", description: "Refactor a legacy monolithic CSS architecture into a cleanly structured, scalable Tailwind configuration. Organize cross-platform component variables using robust JSON-structured Figma Design Tokens.", allowedFiles: "JSON, ZIP", resources: ["Legacy-Style-Guide.pdf"] },
  { id: "a4", title: "Interactive Interactive Chart Engine Mechanics", course: "Data Visualization Masterclass", instructor: "Emma Watson", dueDate: "2026-06-28", daysLeft: -12, status: "Submitted", marks: "88/100 Graded", description: "Develop complex interactive multi-line charts leveraging optimized D3.js path computations integrated natively with hardware-accelerated WebGL canvas buffer pipelines.", allowedFiles: "ZIP, HTML", resources: ["Mock-Telemetry-Dataset.csv", "WebGL-Boilerplate.ts"] },
];

const Assignments = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");
  const [selectedId, setSelectedId] = useState<string | null>("a1");
  const [page, setPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter & Sort Logic
  const filteredAndSorted = useMemo(() => {
    return MOCK_ASSIGNMENTS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.course.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === "dueDate") return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return a.title.localeCompare(b.title);
    });
  }, [search, statusFilter, sortBy]);

  const selectedAssignment = MOCK_ASSIGNMENTS.find(a => a.id === selectedId);

  // Toast Action Wrappers
  const handleSelect = (id: string, title: string) => {
    setSelectedId(id);
    toast.info("Assignment Selected", { description: `Previewing spec parameters for ${title}.` });
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast.success("File Staged Successfully", { 
        description: `"${files[0].name}" loaded to temporary browser submission buffer.` 
      });
    }
  };

  const handleSubmit = (title: string) => {
    toast.success("Assignment Submitted", { description: `Successfully compiled and dispatched entry for: ${title}.` });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased font-sans px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PAGE HEADER */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Assignments</h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage, track, and upload baseline technical course requirements.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 p-1 rounded-xl">
              {["All", "Pending", "Submitted", "Overdue"].map((st) => (
                <button key={st} onClick={() => { setStatusFilter(st); setPage(1); }} className={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === st ? "bg-white text-blue-600 shadow-sm" : "hover:text-slate-900"}`}>{st}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" placeholder="Filter by assignment title or platform course..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 shadow-sm">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              <span>Sort By:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer">
                <option value="dueDate">Due Date</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* WORKSPACE CONTENT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          
          {/* ASSIGNMENTS CORE CONTAINER */}
          <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-130">
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Assignment & Course</th>
                    <th className="p-4">Deadline Schedule</th>
                    <th className="p-4">Status & Grade</th>
                    <th className="p-4 text-right">Preview Spec</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <AnimatePresence mode="wait">
                    {filteredAndSorted.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-12 text-center">
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xs mx-auto space-y-3">
                            <HelpCircle className="h-8 w-8 text-slate-300 mx-auto" />
                            <h3 className="font-bold text-slate-700">No Assignments Available</h3>
                            <p className="text-slate-400 text-[11px] leading-relaxed">No tracking vectors match your active criteria query filters. Reconfigure parameters to resume.</p>
                            <button onClick={() => { setSearch(""); setStatusFilter("All"); }} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">Browse All Structures</button>
                          </motion.div>
                        </td>
                      </tr>
                    ) : (
                      filteredAndSorted.map((item) => (
                        <motion.tr 
                          key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          onClick={() => handleSelect(item.id, item.title)}
                          className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedId === item.id ? "bg-blue-50/20" : ""}`}
                        >
                          {/* Title & metadata info */}
                          <td className="p-4 max-w-55">
                            <p className="font-bold text-slate-900 truncate">{item.title}</p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.course} • {item.instructor}</p>
                          </td>

                          {/* Chrono timeline parameters */}
                          <td className="p-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Calendar className="h-3.5 w-3.5 text-slate-400" />
                              <span>{item.dueDate}</span>
                            </div>
                            <p className={`text-[10px] font-bold mt-1 uppercase ${item.daysLeft < 0 ? "text-rose-500" : item.daysLeft <= 3 ? "text-amber-500" : "text-slate-400"}`}>
                              {item.daysLeft < 0 ? `Overdue by ${Math.abs(item.daysLeft)}d` : `${item.daysLeft} days remaining`}
                            </p>
                          </td>

                          {/* Badges system state */}
                          <td className="p-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              item.status === "Submitted" ? "bg-emerald-50 text-emerald-700" :
                              item.status === "Overdue" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
                            }`}>
                              {item.status === "Submitted" ? <CheckCircle2 className="h-2.5 w-2.5" /> : <AlertCircle className="h-2.5 w-2.5" />}
                              {item.status}
                            </span>
                            <p className="text-[11px] text-slate-500 font-bold mt-1">{item.marks}</p>
                          </td>

                          {/* Quick interface access action */}
                          <td className="p-4 text-right">
                            <button className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                              selectedId === item.id ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}>
                              Inspect
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* RESPONSE FOOTER PAGINATION BASE CONTROL */}
            <div className="border-t border-slate-100 p-4 flex items-center justify-between text-xs font-semibold text-slate-400 bg-slate-50/40">
              <p>Displaying tracking indices {filteredAndSorted.length} units.</p>
              <div className="flex gap-1">
                <button className="p-1.5 border border-slate-200 rounded-lg bg-white disabled:opacity-40" disabled><ChevronLeft className="h-3.5 w-3.5" /></button>
                <button className="h-7 w-7 bg-blue-600 text-white rounded-lg shadow-sm font-bold text-xs">1</button>
                <button className="p-1.5 border border-slate-200 rounded-lg bg-white disabled:opacity-40" disabled><ChevronRight className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>

          {/* INSPECTOR DETAILS PREVIEW DECK */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedAssignment ? (
                <motion.div 
                  key={selectedAssignment.id} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}
                  className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 space-y-5"
                >
                  <div className="space-y-1.5 pb-3 border-b border-slate-100">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">{selectedAssignment.course}</span>
                    <h2 className="text-base font-bold text-slate-900 tracking-tight pt-1">{selectedAssignment.title}</h2>
                    <p className="text-xs text-slate-400 font-medium">Lecturer supervisor: {selectedAssignment.instructor}</p>
                  </div>

                  {/* DESC BLOCK */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project Scope Framework</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{selectedAssignment.description}</p>
                  </div>

                  {/* METRIC SPECS CRITERIA */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] font-semibold text-slate-500">
                    <div>
                      <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Evaluation Max</span>
                      <span className="text-slate-800 font-bold text-xs mt-0.5 block">{selectedAssignment.marks}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Asset Validation Matrix</span>
                      <span className="text-slate-800 font-bold text-xs mt-0.5 block truncate">{selectedAssignment.allowedFiles}</span>
                    </div>
                  </div>

                  {/* ATTACHED SCHEMATICS CORES */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Source Material Compendiums</h4>
                    <div className="space-y-1.5">
                      {selectedAssignment.resources.map((res, index) => (
                        <div key={index} onClick={() => toast.info("Asset Target Triggered", { description: `Downloading reference index dependency file: ${res}` })} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50/10 cursor-pointer transition-all text-xs font-medium">
                          <div className="flex items-center gap-2 text-slate-700 truncate">
                            <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{res}</span>
                          </div>
                          <ExternalLink className="h-3 w-3 text-slate-400 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* INTERACTIVE FILE SUBMISSION UPLOAD AREA ZONE */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Package Submission Engine</h4>
                    
                    {/* Native Hidden File Input */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />

                    <div 
                      onClick={triggerFileSelect}
                      className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-6 text-center cursor-pointer bg-slate-50/40 hover:bg-blue-50/5 transition-all space-y-1.5 group"
                    >
                      <UploadCloud className="h-6 w-6 text-slate-300 group-hover:text-blue-500 mx-auto transition-colors" />
                      <p className="text-xs font-bold text-slate-700">Drop package archive or click to browse files</p>
                      <p className="text-[10px] text-slate-400 font-medium">Adhere strictly to supported validation file arrays ({selectedAssignment.allowedFiles})</p>
                    </div>
                    
                    <button 
                      onClick={() => handleSubmit(selectedAssignment.title)}
                      disabled={selectedAssignment.status === "Submitted"}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 shadow-sm transition-all"
                    >
                      <Clock className="h-3.5 w-3.5" /> 
                      {selectedAssignment.status === "Submitted" ? "Resubmit Compilation Entry" : "Commit Production Stream Dispatch"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-8 text-center text-xs font-medium text-slate-400">
                  Select an target array item node workspace row parameter to verify metadata specs.
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Assignments;