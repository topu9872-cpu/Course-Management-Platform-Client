"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import { 
  Search, Bell, Users, GraduationCap, Briefcase, BookOpen, Layers, 
  CheckCircle, XCircle, ChevronRight, Activity, ShieldAlert, FileText,
  MessageSquare, Star, Settings, ExternalLink, ArrowUpRight
} from "lucide-react";

// --- MOCK DATA STRUCTURES ---
const OVERVIEW_SUMMARY = [
  { label: "Total Platform Users", value: "24,892", delta: "+12%", icon: Users },
  { label: "Active Students", value: "18,420", delta: "+8%", icon: GraduationCap },
  { label: "Active Instructors", value: "1,240", delta: "+4%", icon: Briefcase },
  { label: "Published Courses", value: "3,850", delta: "+15%", icon: BookOpen },
  { label: "Active Enrollments", value: "45,210", delta: "+22%", icon: Layers }
];

const ENROLLMENT_DATA = [
  { month: "Feb", enrollments: 4200, students: 2100 },
  { month: "Mar", enrollments: 5800, students: 3400 },
  { month: "Apr", enrollments: 7100, students: 4100 },
  { month: "May", enrollments: 6900, students: 3900 },
  { month: "Jun", enrollments: 8400, students: 5200 },
  { month: "Jul", enrollments: 9800, students: 6100 }
];

const RECENT_ENROLLMENTS = [
  { id: "E-991", student: "Topu Ahmed", course: "Advanced Production Architecture & Next.js", instructor: "Sarah Jenkins", date: "2026-07-10", status: "Paid", progress: "84%" },
  { id: "E-992", student: "Jane Doe", course: "Node.js Distributed Microservices Core", instructor: "Alex Rivers", date: "2026-07-10", status: "Paid", progress: "12%" },
  { id: "E-993", student: "Carlos Estévez", course: "Enterprise Design Systems & Tailwind", instructor: "Michael Chen", date: "2026-07-09", status: "Free", progress: "100%" }
];

const RECENT_USERS = [
  { name: "Sajib Hossain", email: "sajib@example.com", role: "Student", date: "2026-07-11", status: "Active" },
  { name: "Dr. Elena Rostova", email: "e.rostova@platform.edu", role: "Instructor", date: "2026-07-10", status: "Pending" },
  { name: "Miraz Rahman", email: "miraz@example.com", role: "Student", date: "2026-07-10", status: "Active" }
];

const PENDING_APPROVALS = [
  { id: "C-401", title: "Next.js App Router Cache Tuning", instructor: "Sarah Jenkins", date: "2026-07-08", thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80" },
  { id: "C-402", title: "PostgreSQL Advanced Sharding Matrices", instructor: "Alex Rivers", date: "2026-07-07", thumb: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&q=80" }
];

const RECENT_ACTIVITY = [
  { text: "New student node 'Sajib Hossain' verified via LinkedIn auth", time: "12 mins ago", category: "user" },
  { text: "Instructor 'Sarah Jenkins' dispatched course payload 'C-401'", time: "2 hours ago", category: "course" },
  { text: "Cryptographic certificate index assigned to 'Carlos Estévez'", time: "5 hours ago", category: "system" },
  { text: "Platform database replication handshake verified successfully", time: "1 day ago", category: "security" }
];

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [approvals, setApprovals] = useState(PENDING_APPROVALS);

  const handleApproveCourse = (id: string, title: string) => {
    setApprovals(prev => prev.filter(item => item.id !== id));
    toast.success("Course Payload Authorized", { description: `'${title}' successfully written to production catalog.` });
  };

  const handleRejectCourse = (id: string, title: string) => {
    setApprovals(prev => prev.filter(item => item.id !== id));
    toast.error("Course Payload Rejected", { description: `'${title}' metadata was flagged and dropped from staging.` });
  };

  const filteredSummary = useMemo(() => {
    return OVERVIEW_SUMMARY.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans px-4 py-6 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PAGE HEADER */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              Admin Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Monitor platform activity, manage telemetry pipelines, and orchestrate learning ecosystems.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input 
                type="text" placeholder="Search parameters..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <button onClick={() => toast.info("Active Streams Nominal", { description: "All real-time telemetry pipelines are operating within bounds." })} className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-600 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs border border-slate-200" title="Admin Active Context">
              A
            </div>
          </div>
        </motion.div>

        {/* SUMMARY LAYER ROW */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y-0 md:divide-x divide-slate-100">
            {filteredSummary.map((item, idx) => (
              <div key={idx} className="p-2 md:px-4 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <item.icon className="h-3.5 w-3.5 text-slate-300" /> <span>{item.label.split(" ").slice(1).join(" ")}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-slate-900 tracking-tight">{item.value}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1 rounded">{item.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS DOCK */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 border border-slate-200/40 p-2 rounded-xl">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Ecosystem Tasks:</span>
          {["Users", "Courses", "Categories", "Reviews", "Enrollments"].map((action) => (
            <button 
              key={action} onClick={() => toast.success(`Route Synced`, { description: `Admin pointer redirecting to full ${action} control arrays.` })}
              className="px-3 py-1 bg-white border border-slate-200/60 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all shadow-2xs"
            >
              Manage {action}
            </button>
          ))}
        </div>

        {/* CHARTS GRAPHICS VIEWPORT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs space-y-3">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Platform Traffic Metrics</h3>
              <p className="text-sm font-bold text-slate-800">Monthly Enrollment Registrations</p>
            </div>
            <div className="h-56 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ENROLLMENT_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tickLine={false} stroke="#94a3b8" />
                  <YAxis tickLine={false} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="enrollments" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorEnroll)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs space-y-3">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Demographic Scaling</h3>
              <p className="text-sm font-bold text-slate-800">User Identity Cohort Delta</p>
            </div>
            <div className="h-56 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ENROLLMENT_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tickLine={false} stroke="#94a3b8" />
                  <YAxis tickLine={false} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '11px' }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} name="New Student Matrix" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* LOWER DATA MATRIX SEGMENTATION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* RECENT ENROLLMENTS DATA TABLE */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Transaction Interceptions</h3>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-500">Real-time Stream</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="p-3">Student Node</th>
                      <th className="p-3">Course Target</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3 text-right">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {RECENT_ENROLLMENTS.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-all group">
                        <td className="p-3">
                          <p className="font-bold text-slate-900">{row.student}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{row.id}</p>
                        </td>
                        <td className="p-3">
                          <p className="text-slate-800 line-clamp-1">{row.course}</p>
                          <p className="text-[10px] text-slate-400">Supervisor: {row.instructor}</p>
                        </td>
                        <td className="p-3 text-slate-400 font-mono">{row.date}</td>
                        <td className="p-3 text-right">
                          <span className="font-mono font-bold bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 text-slate-600 px-2 py-0.5 rounded transition-all">{row.progress}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* LIVE USER ROSTER CONTEXTS */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Account Registrations</h3>
              <div className="space-y-2.5">
                {RECENT_USERS.map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-mono text-[11px] font-bold uppercase">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg">{user.role}</span>
                      <button onClick={() => toast.info(`Accessing Directory Node`, { description: `Opening secure administrative view for ${user.name}.` })} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all"><ArrowUpRight className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: PENDING ARCHITECTURAL APPROVALS & LOG CHRONOLOGY */}
          <div className="space-y-6">
            
            {/* PENDING APPROVAL QUEUE STAGING AREA */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert className="h-3.5 w-3.5 text-amber-500" /> Staging Deployment Approvals
              </h3>
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {approvals.length === 0 ? (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-400 py-4 text-center">Staging queue clear. No payloads pending analysis.</motion.p>
                  ) : (
                    approvals.map((course) => (
                      <motion.div key={course.id} layout exit={{ opacity: 0, x: 20 }} className="p-2.5 border border-slate-100 rounded-xl bg-slate-50/50 space-y-2 flex flex-col justify-between">
                        <div className="flex items-start gap-3">
                          <img src={course.thumb} alt="" className="w-10 h-10 object-cover rounded-lg bg-slate-200 shrink-0 border border-slate-200" />
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{course.title}</h4>
                            <p className="text-[10px] text-slate-400 font-medium">Instructor: {course.instructor}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-slate-100/60">
                          <span className="text-[9px] font-mono font-medium text-slate-400">Received {course.date}</span>
                          <div className="flex gap-1.5">
                            <button onClick={() => handleRejectCourse(course.id, course.title)} className="p-1 text-rose-600 hover:bg-rose-50 rounded border border-transparent hover:border-rose-200 transition-all" title="Drop Payload"><XCircle className="h-3.5 w-3.5" /></button>
                            <button onClick={() => handleApproveCourse(course.id, course.title)} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] rounded transition-all"><CheckCircle className="h-3 w-3" /> Deploy</button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* PLATFORM AUDIT TIMELINE EVENT LOGS */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-blue-600" /> Global Ecosystem Activity Log
              </h3>
              <div className="relative pl-3 border-l border-slate-100 space-y-3.5 text-xs">
                {RECENT_ACTIVITY.map((log, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute left-[-17.5px] top-1 w-2 h-2 rounded-full bg-white border-2 border-blue-500" />
                    <div className="flex justify-between items-start gap-2 text-[11px]">
                      <p className="font-semibold text-slate-700 leading-normal">{log.text}</p>
                      <span className="text-[9px] font-mono text-slate-400 shrink-0 pt-0.5">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;