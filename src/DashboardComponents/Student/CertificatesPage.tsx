"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  Search, SlidersHorizontal, Award, Calendar, CheckCircle2, 
  Download, Share2, Copy, Eye, ExternalLink, ChevronLeft, 
  ChevronRight, BookOpen, GraduationCap, Clock, ShieldCheck
} from "lucide-react";

// --- MOCK CERTIFICATES DATA ---
const MOCK_CERTIFICATES = [
  { id: "CERT-9081-X1", title: "Advanced Production Architecture & Next.js", instructor: "Sarah Jenkins", date: "2026-05-14", score: "96%", badge: "Verified", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80", timeline: ["Enrolled Jan 2026", "Completed Capstone Apr 2026", "Issued May 2026"] },
  { id: "CERT-4322-B5", title: "Node.js Distributed Microservices Core", instructor: "Alex Rivers", date: "2026-03-22", score: "98%", badge: "Verified", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80", timeline: ["Enrolled Nov 2025", "Passed Final Exam Feb 2026", "Issued Mar 2026"] },
  { id: "CERT-1109-M2", title: "Enterprise Design Systems & Tailwind", instructor: "Michael Chen", date: "2025-11-05", score: "92%", badge: "Verified", image: "https://images.unsplash.com/photo-1557426072-03122d05404b?auto=format&fit=crop&w=800&q=80", timeline: ["Enrolled Aug 2025", "System Refactor Oct 2025", "Issued Nov 2025"] },
  { id: "CERT-8841-A9", title: "Data Visualization & Canvas Masterclass", instructor: "Emma Watson", date: "2025-07-19", score: "94%", badge: "Verified", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80", timeline: ["Enrolled May 2025", "WebGL Lab Cleared Jun 2025", "Issued Jul 2025"] }
];

const Certificates = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedId, setSelectedId] = useState<string | null>("CERT-9081-X1");

  // Filter & Sort Pipeline
  const processedCertificates = useMemo(() => {
    return MOCK_CERTIFICATES.filter(cert => {
      const matchesSearch = cert.title.toLowerCase().includes(search.toLowerCase()) || cert.instructor.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || (filter === "This Year" && cert.date.startsWith("2026"));
      return matchesSearch && matchesFilter;
    }).sort((a, b) => {
      if (sortBy === "Newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "Oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      return a.title.localeCompare(b.title);
    });
  }, [search, filter, sortBy]);

  const activeCert = MOCK_CERTIFICATES.find(c => c.id === selectedId);

  // Notification Mechanics
  const triggerDownload = (title: string) => {
    toast.success("Download Initialized", { description: `Secure production PDF generation sequence started for ${title}.` });
  };

  const triggerCopyLink = (id: string) => {
    navigator.clipboard.writeText(`https://platform.edu/verify/${id}`);
    toast.success("Verification Link Copied", { description: "Cryptographic hash identifier assigned to local system clipboard." });
  };

  const triggerShare = (title: string) => {
    toast.info("Share Context Ready", { description: `Social network metadata frames configured for ${title}.` });
  };

  const handleSelectCert = (id: string, title: string) => {
    setSelectedId(id);
    toast.info("Certificate Focus Opened", { description: `Displaying high-fidelity telemetry parameters for ${title}.` });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PAGE HEADER */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <Award className="h-6 w-6 text-blue-600" /> My Certificates
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Access, verify, and broadcast professional milestone credentials.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 p-1 rounded-xl">
              {["All", "This Year"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg transition-all ${filter === f ? "bg-white text-blue-600 shadow-sm" : "hover:text-slate-900"}`}>{f}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center pt-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" placeholder="Search academic courses, specialized tracks or instructors..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 shadow-sm">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
              <span>Sort Array:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer">
                <option value="Newest">Newest First</option>
                <option value="Oldest">Oldest First</option>
                <option value="A-Z">Alphabetical</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* WORKSPACE LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT: GALLERY INDEX */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {processedCertificates.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
                    <GraduationCap className="h-10 w-10 text-slate-300 mx-auto" />
                    <h3 className="font-bold text-slate-700 text-sm">No Credentials Found</h3>
                    <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">No finalized verification matrix rows correspond with your active parameter values query state.</p>
                    <button onClick={() => { setSearch(""); setFilter("All"); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors">Browse Systems Matrix</button>
                  </motion.div>
                ) : (
                  processedCertificates.map((cert) => (
                    <motion.div 
                      key={cert.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} whileHover={{ y: -4 }}
                      onClick={() => handleSelectCert(cert.id, cert.title)}
                      className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all cursor-pointer flex flex-col justify-between ${selectedId === cert.id ? "border-blue-500 ring-2 ring-blue-500/10" : "border-slate-200/80"}`}
                    >
                      <div>
                        {/* Mock Image Node Frame */}
                        <div className="relative h-36 w-full bg-slate-900 overflow-hidden group">
                          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded-md text-[10px] font-bold text-blue-700 flex items-center gap-1 shadow-sm">
                            <ShieldCheck className="h-3 w-3" /> {cert.badge}
                          </div>
                          <div className="absolute bottom-3 right-3 bg-slate-900/70 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono text-white tracking-wider">
                            {cert.id}
                          </div>
                        </div>

                        {/* Text Metadata Body */}
                        <div className="p-4 space-y-2">
                          <div className="space-y-0.5">
                            <h3 className="font-bold text-slate-900 text-xs line-clamp-1 leading-tight">{cert.title}</h3>
                            <p className="text-[11px] text-slate-400 font-medium">Instructor: {cert.instructor}</p>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 pt-1 border-t border-slate-50">
                            <div className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-slate-400" /> {cert.date}</div>
                            <div className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Grade: {cert.score}</div>
                          </div>
                        </div>
                      </div>

                      {/* Explicit Action Array Bar */}
                      <div className="bg-slate-50/80 px-4 py-2.5 border-t border-slate-100 flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => handleSelectCert(cert.id, cert.title)} title="View Parameters" className="p-1.5 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 transition-all"><Eye className="h-3.5 w-3.5" /></button>
                        <button onClick={() => triggerCopyLink(cert.id)} title="Copy Validation Address" className="p-1.5 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-all"><Copy className="h-3.5 w-3.5" /></button>
                        <button onClick={() => triggerShare(cert.title)} title="Broadcast Link" className="p-1.5 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 transition-all"><Share2 className="h-3.5 w-3.5" /></button>
                        <button onClick={() => triggerDownload(cert.title)} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-200 rounded-lg text-[11px] font-bold text-slate-700 hover:text-blue-600 shadow-xs transition-all"><Download className="h-3 w-3" /> PDF</button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>

            {/* RESPONSIVE FOOTER BASE PAGINATION REGION */}
            <div className="border border-slate-200/80 rounded-2xl bg-white p-4 flex items-center justify-between text-xs font-semibold text-slate-400 shadow-sm">
              <p>Displaying verification instances {processedCertificates.length} units.</p>
              <div className="flex gap-1">
                <button className="p-1.5 border border-slate-200 rounded-lg bg-white disabled:opacity-40" disabled><ChevronLeft className="h-3.5 w-3.5" /></button>
                <button className="h-7 w-7 bg-blue-600 text-white rounded-lg font-bold text-xs shadow-sm">1</button>
                <button className="p-1.5 border border-slate-200 rounded-lg bg-white disabled:opacity-40" disabled><ChevronRight className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          </div>

          {/* RIGHT: MASTER INSPECTION AND TIMELINE */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {activeCert ? (
                <motion.div 
                  key={activeCert.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 space-y-4"
                >
                  <div className="pb-3 border-b border-slate-100 flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded inline-block">Active Inspector Focus</h4>
                      <h2 className="text-sm font-bold text-slate-900 leading-snug tracking-tight">{activeCert.title}</h2>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded shrink-0">{activeCert.id}</span>
                  </div>

                  {/* HIGH FIDELITY MOCK SPEC PREVIEW */}
                  <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 relative overflow-hidden aspect-video flex flex-col justify-between items-center text-center shadow-xs">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2563eb_1px,transparent_1px)] bg-size-[16px_16px]" />
                    <div className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mt-2">Verified Framework Certificate</div>
                    <div className="space-y-1 z-10">
                      <div className="text-xs font-serif italic text-slate-800">Honorable Verification Conferred To</div>
                      <div className="text-sm font-bold tracking-tight text-slate-900 border-b border-slate-300 pb-0.5 px-6 font-mono">STUDENT WORKSPACE MASTER</div>
                    </div>
                    <div className="text-[9px] font-medium text-slate-400 mb-2">Final Platform Metrics Score: <span className="text-slate-800 font-bold">{activeCert.score}</span></div>
                  </div>

                  {/* SPECIFICATION PARAMETERS TABLE */}
                  <div className="space-y-2 text-[11px] font-semibold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between py-1 border-b border-slate-200/60"><span className="text-slate-400 font-medium">Instructor Supervisor</span><span className="text-slate-800 font-bold">{activeCert.instructor}</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60"><span className="text-slate-400 font-medium">Registry Timestamp</span><span className="text-slate-800 font-bold">{activeCert.date}</span></div>
                    <div className="flex justify-between py-1"><span className="text-slate-400 font-medium">Validation Authority</span><span className="text-emerald-600 font-bold flex items-center gap-0.5"><CheckCircle2 className="h-3 w-3" /> Encrypted Baseline</span></div>
                  </div>

                  {/* TIMELINE ARCHITECTURE STREAM */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> Achievement Evolution Path
                    </h4>
                    <div className="relative pl-4 border-l border-slate-200 space-y-3.5 text-xs">
                      {activeCert.timeline.map((event, idx) => (
                        <div key={idx} className="relative group">
                          {/* Chronological Bullet Node */}
                          <div className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full bg-white border-2 border-blue-500 ring-4 ring-white group-hover:bg-blue-600 transition-colors" />
                          <p className="font-bold text-slate-700 leading-none">{event.split(" ").slice(0, 2).join(" ")}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{event}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* MASTER ACTIONS DEPLOYMENT ENGINE */}
                  <button 
                    onClick={() => triggerDownload(activeCert.title)}
                    className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
                  >
                    <Download className="h-3.5 w-3.5" /> Synchronize Cryptographic PDF Download
                  </button>
                </motion.div>
              ) : (
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 text-center text-xs font-medium text-slate-400">
                  Select a specific target certificate vector row to generate operational timeline schemas.
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Certificates;