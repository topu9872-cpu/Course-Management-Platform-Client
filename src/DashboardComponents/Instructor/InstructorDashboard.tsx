"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast, Toaster } from 'sonner';
import { Search, Bell, BookOpen, Users, Star, CheckCircle, DollarSign, ArrowUpRight, Plus, Settings, GraduationCap, MessageSquare } from 'lucide-react';

const stats = [
  { label: 'Courses', value: '12', icon: BookOpen },
  { label: 'Students', value: '3,840', icon: Users },
  { label: 'Rating', value: '4.8', icon: Star },
  { label: 'Completion', value: '78%', icon: CheckCircle },
  { label: 'Revenue', value: '$8,450', icon: DollarSign },
];

const unifiedData = [
  { name: 'Feb', students: 420, completed: 250 },
  { name: 'Mar', students: 580, completed: 410 },
  { name: 'Apr', students: 510, completed: 390 },
  { name: 'May', students: 740, completed: 520 },
  { name: 'Jun', students: 890, completed: 680 },
  { name: 'Jul', students: 1100, completed: 850 },
];

const recentCourses = [
  { id: 1, title: 'Next.js 15 Core Architecture', students: '1,200', rating: 4.9, status: 'Published' },
  { id: 2, title: 'Advanced Type Level Design', students: '820', rating: 4.8, status: 'Published' },
  { id: 3, title: 'Interactive Web Animations', students: '240', rating: 4.7, status: 'Draft' },
];

const items = [
  { id: 1, text: 'Sarah Chen submitted Module 4', meta: '45m ago', type: 'activity' },
  { id: 2, text: 'Emma Watson: "Best explanation of partial prerendering found anywhere."', meta: 'Next.js Pro', type: 'review' },
  { id: 3, text: 'Review assignment submissions', meta: 'High Priority', type: 'task' },
];

export const InstructorDashboard: React.FC = () => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans p-4 md:p-6 max-w-6xl mx-auto selection:bg-blue-100">
      <Toaster position="top-right" richColors />
      
      {/* HEADER */}
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4 mb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Instructor Dashboard</h1>
          <p className="text-xs text-slate-500">Track and manage your running course lifecycle performance.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input type="text" placeholder="Jump to..." className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <button onClick={() => toast.info("No new alerts")} className="p-2 text-slate-400 hover:text-slate-900 bg-white border border-slate-200 rounded-lg"><Bell className="h-3.5 w-3.5" /></button>
        </div>
      </motion.header>

      {/* COMPACT SUMMARY CONSOLE */}
      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 rounded-xl shadow-sm grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-slate-100 p-1 mb-5">
        {stats.map((stat, i) => (
          <div key={i} className="p-3.5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              <stat.icon className="h-3 w-3 text-slate-400" />
              {stat.label}
            </div>
            <div className="text-lg font-bold text-slate-900 mt-0.5 tracking-tight">{stat.value}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* UNIFIED ENROLLMENT & PERFORMANCE CHARTS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 lg:col-span-2 flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Performance Funnel</h3>
            <p className="text-[11px] text-slate-400">Monthly breakdown of gross aggregate student signups and final graduations.</p>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={unifiedData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '11px' }} />
                <Area type="monotone" dataKey="students" stroke="#2563eb" strokeWidth={1.5} fillOpacity={1} fill="url(#areaColor)" />
                <Bar dataKey="completed" fill="#93c5fd" radius={[2, 2, 0, 0]} barSize={12} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* COMPACT FEEDBACK & TASKS DECK */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4">
          <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Feed & Focus</h3>
          <div className="space-y-3 divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="pt-2.5 first:pt-0 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2 min-w-0">
                  {item.type === 'task' && (
                    <input 
                      type="checkbox" 
                      checked={!!checked[item.id]} 
                      onChange={() => {
                        setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                        if(!checked[item.id]) toast.success("Marked task complete");
                      }} 
                      className="mt-0.5 rounded text-blue-600 focus:ring-0 cursor-pointer h-3.5 w-3.5" 
                    />
                  )}
                  <div className="min-w-0">
                    <p className={`text-slate-700 font-medium truncate ${checked[item.id] ? 'line-through text-slate-400' : ''}`}>{item.text}</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{item.meta}</span>
                  </div>
                </div>
                <button onClick={() => toast.info(`Reviewing stream component detail`)} className="text-[11px] text-blue-600 font-medium shrink-0 hover:underline">View</button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* PORTFOLIO MATRIX */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden lg:col-span-3">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Active Course Portfolio</h3>
              <p className="text-[11px] text-slate-400">Status mapping and roster tracking across active catalogs.</p>
            </div>
            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <button onClick={() => toast.success("Opening clean blueprint builder")} className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"><Plus className="h-3 w-3" /> New</button>
              <button onClick={() => toast.info("Syncing full portfolio context")} className="p-1.5 text-slate-400 hover:text-slate-900 bg-slate-50 border border-slate-200 rounded-lg"><Settings className="h-3.5 w-3.5" /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-4">Program Catalog</th>
                  <th className="py-2.5 px-4">Roster Size</th>
                  <th className="py-2.5 px-4">Rating</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900 truncate max-w-70">{course.title}</td>
                    <td className="py-3 px-4 font-medium text-slate-600">{course.students}</td>
                    <td className="py-3 px-4 text-slate-600">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {course.rating}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${course.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{course.status}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => toast.success(`Route configuration opened for ID ${course.id}`)} className="p-1 text-slate-400 hover:text-blue-600 transition-colors"><ArrowUpRight className="h-3.5 w-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InstructorDashboard;