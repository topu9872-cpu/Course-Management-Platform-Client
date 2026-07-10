"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  Search, Filter, ArrowUpDown, MoreVertical, CheckCircle, XCircle, 
  Trash2, Eye, X, Calendar, BookOpen, CreditCard, Award, Activity, User, ChevronLeft, ChevronRight, GraduationCap
} from "lucide-react";

interface Enrollment {
  id: string;
  studentName: string;
  email: string;
  avatar: string;
  courseTitle: string;
  instructor: string;
  enrollmentDate: string;
  progress: number;
  paymentStatus: "Paid" | "Pending";
  status: "Active" | "Completed" | "Cancelled";
  lastActivity: string;
}

const INITIAL_ENROLLMENTS: Enrollment[] = [
  { id: "ENR-901", studentName: "Sarah Jenkins", email: "sarah.j@gmail.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces", courseTitle: "Next.js 14 Advanced Architecture", instructor: "Alex River", enrollmentDate: "2026-05-10", progress: 78, paymentStatus: "Paid", status: "Active", lastActivity: "2026-07-10" },
  { id: "ENR-902", studentName: "David Chen", email: "d.chen@tech.io", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces", courseTitle: "TypeScript Type-Level Magic", instructor: "Elena Rostova", enrollmentDate: "2026-04-12", progress: 100, paymentStatus: "Paid", status: "Completed", lastActivity: "2026-05-20" },
  { id: "ENR-903", studentName: "Amara Okafor", email: "amara@designspace.com", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces", courseTitle: "Design Systems with Tailwind CSS", instructor: "Marcus Vance", enrollmentDate: "2026-06-01", progress: 34, paymentStatus: "Pending", status: "Active", lastActivity: "2026-07-09" },
  { id: "ENR-904", studentName: "Liam Fowler", email: "liam.fowler@dev.net", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces", courseTitle: "Framer Motion Masterclass", instructor: "Alex River", enrollmentDate: "2026-02-15", progress: 12, paymentStatus: "Paid", status: "Cancelled", lastActivity: "2026-02-28" }
];

const EnrollmentsManagement = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(INITIAL_ENROLLMENTS);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<"studentName" | "progress" | "enrollmentDate">("enrollmentDate");
  
  const [selectedEnr, setSelectedEnr] = useState<Enrollment | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const uniqueCourses = useMemo(() => ["All", ...Array.from(new Set(enrollments.map(e => e.courseTitle)))], [enrollments]);

  const filteredAndSorted = useMemo(() => {
    return enrollments
      .filter(e => {
        const matchesSearch = e.studentName.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase());
        const matchesCourse = courseFilter === "All" || e.courseTitle === courseFilter;
        const matchesStatus = statusFilter === "All" || e.status === statusFilter;
        return matchesSearch && matchesCourse && matchesStatus;
      })
      .sort((a, b) => {
        if (sortField === "progress") return b.progress - a.progress;
        return a[sortField].localeCompare(b[sortField]);
      });
  }, [enrollments, search, courseFilter, statusFilter, sortField]);

  const handleMarkCompleted = (id: string) => {
    setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status: "Completed", progress: 100 } : e));
    toast.success("Enrollment marked as completed.");
    setActiveMenuId(null);
  };

  const confirmCancel = () => {
    if (cancelTargetId) {
      setEnrollments(prev => prev.map(e => e.id === cancelTargetId ? { ...e, status: "Cancelled" } : e));
      toast.warning("Enrollment cancelled successfully.");
      setCancelTargetId(null);
      setActiveMenuId(null);
    }
  };

  const confirmRemove = () => {
    if (deleteTargetId) {
      setEnrollments(prev => prev.filter(e => e.id !== deleteTargetId));
      toast.error("Enrollment removed from dashboard view.");
      setDeleteTargetId(null);
      setActiveMenuId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PAGE HEADER & CONTROLS */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Enrollments</h1>
            <p className="text-sm text-slate-500">Manage student enrollments across all courses.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search student name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-slate-50/50" />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-xs">
                <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} className="focus:outline-none bg-transparent font-medium text-slate-700">
                  {uniqueCourses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-xs">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="focus:outline-none bg-transparent font-medium text-slate-700">
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-xs">
                <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                <select value={sortField} onChange={(e) => setSortField(e.target.value as any)} className="focus:outline-none bg-transparent font-medium text-slate-700">
                  <option value="enrollmentDate">Sort by Date</option>
                  <option value="studentName">Sort by Name</option>
                  <option value="progress">Sort by Progress</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* DATA CONTAINER */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-medium">
                  <th className="p-4">Student</th>
                  <th className="p-4">Course Hierarchy</th>
                  <th className="p-4">Enrollment Date</th>
                  <th className="p-4">Progress Vector</th>
                  <th className="p-4">Finance</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <AnimatePresence mode="popLayout">
                  {filteredAndSorted.map((e) => (
                    <motion.tr key={e.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hover:bg-slate-50/40 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={e.avatar} alt={e.studentName} className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200/60 object-cover" />
                          <div>
                            <p className="font-semibold text-slate-900">{e.studentName}</p>
                            <p className="text-[11px] text-slate-400 font-normal">{e.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-800">{e.courseTitle}</p>
                        <p className="text-[11px] text-slate-400 font-normal">Instructor: {e.instructor}</p>
                      </td>
                      <td className="p-4 font-mono text-slate-500">{e.enrollmentDate}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 max-w-25">
                          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${e.progress}%` }} />
                          </div>
                          <span className="font-mono text-slate-600 text-[11px]">{e.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${e.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>{e.paymentStatus}</span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${e.status === 'Active' ? 'text-blue-600' : e.status === 'Completed' ? 'text-emerald-600' : 'text-slate-400'}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${e.status === 'Active' ? 'bg-blue-600' : e.status === 'Completed' ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                          {e.status}
                        </span>
                      </td>
                      <td className="p-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setActiveMenuId(activeMenuId === e.id ? null : e.id)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"><MoreVertical className="h-4 w-4" /></button>
                        {activeMenuId === e.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                            <div className="absolute right-4 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 text-left font-medium">
                              <button onClick={() => { setSelectedEnr(e); toast.info("Mounted details view."); setActiveMenuId(null); }} className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"><Eye className="h-3.5 w-3.5" /> View Details</button>
                              {e.status !== "Completed" && <button onClick={() => handleMarkCompleted(e.id)} className="w-full px-3 py-1.5 hover:bg-slate-50 text-emerald-600 flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5" /> Mark Completed</button>}
                              {e.status !== "Cancelled" && <button onClick={() => setCancelTargetId(e.id)} className="w-full px-3 py-1.5 hover:bg-slate-50 text-amber-600 flex items-center gap-2"><XCircle className="h-3.5 w-3.5" /> Cancel Contract</button>}
                              <button onClick={() => setDeleteTargetId(e.id)} className="w-full px-3 py-1.5 hover:bg-slate-50 text-rose-600 flex items-center gap-2 border-t border-slate-100 mt-1"><Trash2 className="h-3.5 w-3.5" /> Remove Row</button>
                            </div>
                          </>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* MOBILE LIST */}
          <div className="block md:hidden divide-y divide-slate-100">
            <AnimatePresence mode="popLayout">
              {filteredAndSorted.map((e) => (
                <motion.div key={e.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={e.avatar} alt={e.studentName} className="h-8 w-8 rounded-full bg-slate-100 object-cover" />
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900">{e.studentName}</h4>
                        <p className="text-[10px] text-slate-400">{e.email}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold ${e.status === 'Active' ? 'text-blue-600' : e.status === 'Completed' ? 'text-emerald-600' : 'text-slate-400'}`}>{e.status}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{e.courseTitle}</p>
                    <p className="text-[10px] text-slate-400">Enrolled: {e.enrollmentDate} · Progress: {e.progress}%</p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${e.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{e.paymentStatus}</span>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedEnr(e); toast.info("Mounted details view."); }} className="px-2 py-1 text-[10px] font-semibold border border-slate-200 rounded-lg text-slate-600 bg-white">View</button>
                      {e.status !== "Completed" && <button onClick={() => handleMarkCompleted(e.id)} className="px-2 py-1 text-[10px] font-semibold bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700">Complete</button>}
                      <button onClick={() => setDeleteTargetId(e.id)} className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* EMPTY STATE */}
          {filteredAndSorted.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">No Enrollments Found</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">No matching parameter mappings correspond to your active queries or database state values.</p>
            </div>
          )}

          {/* PAGINATION FOOTER */}
          {filteredAndSorted.length > 0 && (
            <div className="p-3.5 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between text-xs font-medium text-slate-500">
              <p className="text-[11px]">Showing subset <span className="font-semibold text-slate-800">{filteredAndSorted.length}</span> of <span className="font-semibold text-slate-800">{enrollments.length}</span> matrices</p>
              <div className="flex items-center gap-1.5">
                <button className="p-1 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed"><ChevronLeft className="h-4 w-4" /></button>
                <span className="px-2.5 py-0.5 bg-white border border-slate-200 rounded-md font-semibold text-slate-800 text-[11px]">1</span>
                <button className="p-1 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VIEW DETAILS SIDE DRAWER PANEL */}
      <AnimatePresence>
        {selectedEnr && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEnr(null)} className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 220 }} className="bg-white border-l border-slate-200 max-w-md w-full h-full z-10 p-6 flex flex-col justify-between shadow-2xl relative text-xs">
              <div className="space-y-5 overflow-y-auto pb-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Enrollment Context</h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{selectedEnr.id}</p>
                  </div>
                  <button onClick={() => setSelectedEnr(null)} className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"><X className="h-4 w-4" /></button>
                </div>

                <div className="flex items-center gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <img src={selectedEnr.avatar} alt={selectedEnr.studentName} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-slate-400" /> {selectedEnr.studentName}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{selectedEnr.email}</p>
                  </div>
                </div>

                <div className="space-y-3 bg-white p-3 border border-slate-100 rounded-xl shadow-2xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Curriculum Parameters</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-800 flex items-center gap-2"><BookOpen className="h-3.5 w-3.5 text-slate-400" /> {selectedEnr.courseTitle}</p>
                    <p className="text-slate-500 font-normal">Instructor Master Node: {selectedEnr.instructor}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100/60 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wide">Initialization Vector</span>
                      <span className="font-mono text-slate-700 flex items-center gap-1 mt-0.5"><Calendar className="h-3 w-3" /> {selectedEnr.enrollmentDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wide">Financial Settlement</span>
                      <span className="font-semibold text-slate-700 flex items-center gap-1 mt-0.5"><CreditCard className="h-3 w-3" /> {selectedEnr.paymentStatus}</span>
                    </div>
                  </div>
                </div>

                {/* TIMELINE METRIC */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Telemetry State Sequence</p>
                  <div className="relative border-l-2 border-slate-100 pl-4 space-y-4 font-normal text-slate-600">
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="relative">
                      <span className="absolute -left-5.25 top-0.5 bg-blue-600 h-2 w-2 rounded-full ring-4 ring-white" />
                      <p className="font-semibold text-slate-800">Enrolled & Confirmed</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{selectedEnr.enrollmentDate}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="relative">
                      <span className="absolute -left-5.25 top-0.5 bg-blue-600 h-2 w-2 rounded-full ring-4 ring-white" />
                      <p className="font-semibold text-slate-800">Started Course Execution</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{selectedEnr.enrollmentDate}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative">
                      <span className={`absolute -left-5.25 top-0.5 h-2 w-2 rounded-full ring-4 ring-white ${selectedEnr.progress > 0 ? "bg-blue-600" : "bg-slate-300"}`} />
                      <p className="font-semibold text-slate-800 flex items-center gap-1.5"><Activity className="h-3 w-3 text-slate-400" /> Last Activity Pulse</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{selectedEnr.lastActivity} · Processed {selectedEnr.progress}%</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative">
                      <span className={`absolute -left-5.25 top-0.5 h-2 w-2 rounded-full ring-4 ring-white ${selectedEnr.status === 'Completed' ? "bg-emerald-500" : "bg-slate-300"}`} />
                      <p className="font-semibold text-slate-800 flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-slate-400" /> Certificate Validation</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{selectedEnr.status === 'Completed' ? "Issued and cryptographically signed." : "Pending fulfillment vector."}</p>
                    </motion.div>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedEnr(null)} className="w-full py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-2xs">Close Inspection</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CANCEL CONFIRMATION DIALOG MODAL */}
      <AnimatePresence>
        {cancelTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCancelTargetId(null)} className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }} className="bg-white border border-slate-200 max-w-sm w-full rounded-2xl shadow-xl z-10 p-5 space-y-4 text-xs text-center flex flex-col items-center">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><XCircle className="h-5 w-5" /></div>
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-900 text-sm">Cancel Enrollment Contract?</h4>
                <p className="text-slate-400 max-w-xs leading-relaxed font-normal">This will invalidate active tracking metrics for this entity node. Access privileges will be suspended.</p>
              </div>
              <div className="flex items-center justify-center gap-2 w-full pt-1">
                <button onClick={() => setCancelTargetId(null)} className="flex-1 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors">Retain Access</button>
                <button onClick={confirmCancel} className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors shadow-2xs">Confirm Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REMOVE ROW CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTargetId(null)} className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }} className="bg-white border border-slate-200 max-w-sm w-full rounded-2xl shadow-xl z-10 p-5 space-y-4 text-xs text-center flex flex-col items-center">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><Trash2 className="h-5 w-5" /></div>
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-900 text-sm">Purge Record Object?</h4>
                <p className="text-slate-400 max-w-xs leading-relaxed font-normal">This action drops the layout tracking reference node from the client state matrix buffer.</p>
              </div>
              <div className="flex items-center justify-center gap-2 w-full pt-1">
                <button onClick={() => setDeleteTargetId(null)} className="flex-1 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors">Abort</button>
                <button onClick={confirmRemove} className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-2xs">Confirm Purge</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnrollmentsManagement;