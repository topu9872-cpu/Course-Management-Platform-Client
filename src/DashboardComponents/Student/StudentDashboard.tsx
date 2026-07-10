"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";
import { 
  BookOpen, CheckCircle, Clock, Award, Search, Bell, 
  Play, Download, User, BookMarked, ShieldCheck, Calendar, AlertCircle
} from "lucide-react";
import { Toaster, toast } from "sonner";

// --- SYSTEM CONSTANTS & CONFIGS ---
const VARIANT_CONTAINER = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const VARIANT_ITEM = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 110, damping: 16 } } };

const STATS = [
  { title: "Enrolled Courses", value: 6, icon: BookOpen, change: "+2 this month", bg: "bg-blue-50" },
  { title: "Completed Courses", value: 12, icon: CheckCircle, change: "85% completion rate", bg: "bg-emerald-50" },
  { title: "Pending Assignments", value: 3, icon: Clock, change: "2 due this week", bg: "bg-amber-50" },
  { title: "Certificates Earned", value: 8, icon: Award, change: "+1 new certificate", bg: "bg-purple-50" }
];

const ANALYTICS_DATA = [
  { name: "Jan", hours: 24 }, { name: "Feb", hours: 32 }, { name: "Mar", hours: 28 },
  { name: "Apr", hours: 45 }, { name: "May", hours: 38 }, { name: "Jun", hours: 52 }
];

const DOMAINS = [
  { name: "Web Development", value: 45, color: "#2563eb" },
  { name: "UI/UX", value: 25, color: "#9333ea" },
  { name: "Backend", value: 20, color: "#10b981" },
  { name: "Database", value: 10, color: "#f59e0b" }
];

const WEEKLY_DATA = [
  { day: "Mon", hours: 2.5 }, { day: "Tue", hours: 4.0 }, { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 5.2 }, { day: "Fri", hours: 3.0 }, { day: "Sat", hours: 6.5 }, { day: "Sun", hours: 2.0 }
];

const TIMELINE = [
  { title: "Build a Custom State Management Library", course: "Advanced React", dueDate: "Tomorrow, 11:59 PM", priority: "High", overdue: false },
  { title: "Figma High-Fidelity Prototype E-Commerce", course: "UI/UX Design Systems", dueDate: "Jul 15, 2026", priority: "Medium", overdue: false },
  { title: "Database Schema Migration Strategy", course: "Node.js Architecture", dueDate: "Jul 08, 2026", priority: "High", overdue: true }
];

const PLATFORM_SHORTCUTS = [
  { label: "Explore Catalog", icon: BookMarked },
  { label: "Schedules", icon: Calendar },
  { label: "Certificates", icon: ShieldCheck },
  { label: "My Profile", icon: User }
];

// --- MICRO ENGINE COMPONENTS ---
const StatCard = ({ stat }: { stat: typeof STATS[0] }) => {
  const Icon = stat.icon;
  return (
    <motion.div whileHover={{ y: -3, boxShadow: "0 10px 20px -10px rgba(0,0,0,0.04)" }} className="bg-white border border-slate-200 p-5 rounded-2xl relative transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">{stat.title}</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{stat.value}</h3>
        </div>
        <div className={`p-2.5 rounded-xl ${stat.bg} text-slate-700`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-500 bg-slate-50 inline-block px-2 py-0.5 rounded-md">{stat.change}</p>
    </motion.div>
  );
};

const CourseRow = ({ title, instructor, progress, category, img, onResume }: any) => (
  <motion.div whileHover={{ x: 3 }} className="flex flex-col sm:flex-row justify-between p-4 border border-slate-100 bg-slate-50/30 hover:bg-white rounded-xl transition-all gap-4">
    <div className="flex items-center gap-3.5">
      <img src={img} alt="" className="h-11 w-11 rounded-xl object-cover bg-slate-100 shrink-0" />
      <div>
        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md">{category}</span>
        <h4 className="text-sm font-bold text-slate-800 mt-1">{title}</h4>
        <p className="text-xs text-slate-400 font-medium">{instructor}</p>
      </div>
    </div>
    <div className="flex items-center gap-5 justify-between sm:justify-end flex-1 sm:flex-initial">
      <div className="w-24 sm:w-32">
        <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <button onClick={onResume} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        <Play className="h-3 w-3 fill-current" /> Continue
      </button>
    </div>
  </motion.div>
);

// --- MAIN RUNTIME CONTAINER ---
const StudentDashboard = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    toast.success("Welcome back, Topu! 👋", { description: "You have 2 pending assignments due this week." });
  }, []);

  const alertMsg = (msg: string) => toast.info(msg);

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 antialiased font-sans pb-12 selection:bg-blue-500 selection:text-white">
      <Toaster position="top-right" richColors closeButton />

      {/* COMPACT GLOBAL NAVIGATION BAR */}
      <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">Welcome back, Topu 👋</h1>
            <p className="text-[11px] text-blue-600 font-semibold hidden sm:block">You rank in the top 5% of global learners this active week.</p>
          </div>
          <div className="flex items-center gap-3 justify-end flex-1 max-w-md">
            <div className="relative w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input type="text" placeholder="Search parameters..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:outline-none transition-all" />
            </div>
            <button onClick={() => alertMsg("Notifications active tray opened.")} className="relative p-2 text-slate-500 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors">
              <Bell className="h-4 w-4" /><span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-blue-600 rounded-full" />
            </button>
            <div onClick={() => alertMsg("Redirecting to active core profile config...")} className="h-8 w-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center cursor-pointer">T</div>
          </div>
        </div>
      </motion.header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div variants={VARIANT_CONTAINER} initial="hidden" animate="show" className="space-y-6">
          
          {/* STATS DECK */}
          <motion.div variants={VARIANT_ITEM} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, i) => <StatCard key={i} stat={s} />)}
          </motion.div>

          {/* INTEGRATED GRAPHICAL GRAPHICS PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={VARIANT_ITEM} className="lg:col-span-2 bg-white border border-slate-200 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <div><h3 className="text-sm font-bold text-slate-900">Learning Analytics</h3><p className="text-[11px] text-slate-400">Hours monitored over last 6 months</p></div>
              </div>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ANALYTICS_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                    <Area type="monotone" dataKey="hours" stroke="#2563eb" strokeWidth={2} fill="url(#blueGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={VARIANT_ITEM} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between">
              <div><h3 className="text-sm font-bold text-slate-900">Topic Focus</h3><p className="text-[11px] text-slate-400">Total operational domain distribution</p></div>
              <div className="h-40 relative flex items-center justify-center my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={DOMAINS} innerRadius={50} outerRadius={65} paddingAngle={4} dataKey="value">{DOMAINS.map((d, i) => <Cell key={i} fill={d.color} />)}</Pie><Tooltip /></PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center pointer-events-none"><span className="text-xl font-black text-slate-800">4</span><p className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Fields</p></div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-slate-600">
                {DOMAINS.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 truncate">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="truncate">{d.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* LOWER ANALYSIS MATRIX CORES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={VARIANT_ITEM} className="lg:col-span-2 bg-white border border-slate-200 p-5 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-slate-900 mb-1">In-Progress Courses</h3>
              <CourseRow title="Advanced React & Next.js App Router" instructor="Sarah Jenkins" progress={78} category="Web Development" img="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=80&auto=format&fit=crop&q=60" onResume={() => alertMsg("Resuming Modern React Bundle Framework...")} />
              <CourseRow title="UI/UX Design Systems with Figma" instructor="Michael Chen" progress={42} category="UI/UX" img="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=60" onResume={() => alertMsg("Opening UX Prototyping Workshop Module...")} />
            </motion.div>

            <motion.div variants={VARIANT_ITEM} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between">
              <div><h3 className="text-sm font-bold text-slate-900">Weekly Target Tracker</h3><p className="text-[11px] text-slate-400">Hours active on core infrastructure</p></div>
              <div className="h-36 w-full my-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WEEKLY_DATA} margin={{ top: 0, right: 0, left: -35, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <Bar dataKey="hours" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-slate-50 p-2 rounded-xl flex justify-between items-center text-xs font-semibold text-slate-600">
                <span>Total Accumulated:</span><span className="text-slate-900 font-bold">24.7 Hours</span>
              </div>
            </motion.div>
          </div>

          {/* DEADLINES AND UTILITY ROUTERS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={VARIANT_ITEM} className="lg:col-span-2 bg-white border border-slate-200 p-5 rounded-2xl">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Critical Deadlines</h3>
              <div className="border-l border-slate-100 ml-2 space-y-4">
                {TIMELINE.map((item, index) => (
                  <div key={index} className="relative pl-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className={`absolute left-[-4.5px] top-1 h-2 w-2 rounded-full ring-4 ring-white ${item.overdue ? "bg-rose-500" : "bg-amber-500"}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{item.title}</span>
                        {item.overdue && <span className="text-[9px] bg-rose-50 text-rose-600 font-bold px-1.5 py-0.2 rounded">Overdue</span>}
                      </div>
                      <p className="text-slate-400 font-medium mt-0.5">{item.course} • Due <span className="text-slate-600">{item.dueDate}</span></p>
                    </div>
                    <button onClick={() => alertMsg(`Opening submission link: ${item.title}`)} className="self-start sm:self-center font-bold px-2.5 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-lg shadow-sm text-slate-700">Submit</button>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={VARIANT_ITEM} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between">
              <div><h3 className="text-sm font-bold text-slate-900">Workspace Routing</h3><p className="text-[11px] text-slate-400">Quick terminal context actions</p></div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {PLATFORM_SHORTCUTS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button key={index} onClick={() => alertMsg(`Routing to module component: ${item.label}`)} className="p-2.5 border border-slate-100 hover:border-blue-500 hover:bg-blue-50/10 text-left rounded-xl transition-all h-16 flex flex-col justify-between group">
                      <Icon className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      <span className="text-[11px] font-bold text-slate-700">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* CREDENTIALS METADATA BAR */}
          <motion.div variants={VARIANT_ITEM} className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Award className="h-5 w-5" /></div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Full-Stack Production Web Developer Certification</h4>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Verified Ledger SHA-256 Identity Asset Key • Passed May 2026</p>
              </div>
            </div>
            <button onClick={() => alertMsg("Downloading cryptographically signed certificate archive payload.")} className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs rounded-xl shadow-sm transition-colors whitespace-nowrap self-start sm:self-center">
              <Download className="h-3 w-3" /> Download PDF
            </button>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
};

export default StudentDashboard;