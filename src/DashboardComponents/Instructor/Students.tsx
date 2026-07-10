"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  Search, Users, Mail, Trash2, Eye, X, ChevronLeft, ChevronRight, 
  MoreVertical, BookOpen, CheckCircle, Clock, Award, Filter
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrolled: string;
  progress: number;
  lessons: string;
  status: "Active" | "Completed" | "Inactive";
}

const initialStudents: Student[] = [
  { id: "1", name: "Alex Rivera", email: "alex@example.com", course: "Next.js 14 Masterclass", enrolled: "2026-05-12", progress: 75, lessons: "12/16", status: "Active" },
  { id: "2", name: "Sarah Chen", email: "sarah@example.com", course: "UI/UX Design Systems", enrolled: "2026-06-01", progress: 100, lessons: "20/20", status: "Completed" },
];

export default function Students() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [viewing, setViewing] = useState<Student | null>(null);
  const [messageTarget, setMessageTarget] = useState<Student | null>(null);
  const [removeId, setRemoveId] = useState<string | null>(null);

  const handleDelete = () => {
    setStudents(prev => prev.filter(s => s.id !== removeId));
    setRemoveId(null);
    toast.success("Student removed successfully.");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <Toaster position="top-right" richColors />
      <motion.main initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Students</h1>
            <p className="text-sm text-slate-500">Manage students enrolled in your courses.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input placeholder="Search students..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none w-full md:w-64" />
            </div>
            <button className="p-2 border border-slate-200 bg-white rounded-xl hover:bg-slate-50"><Filter className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>{['Student', 'Course', 'Progress', 'Status', 'Actions'].map(h => <th key={h} className="p-4 text-left font-semibold text-slate-600">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map(s => (
                <motion.tr key={s.id} whileHover={{ backgroundColor: "#f8fafc" }}>
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">{s.name.charAt(0)}</div>
                    <div><p className="font-medium">{s.name}</p><p className="text-slate-400 text-xs">{s.email}</p></div>
                  </td>
                  <td className="p-4 text-slate-600">{s.course}</td>
                  <td className="p-4"><div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600" style={{ width: `${s.progress}%` }} /></div></td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-[10px] font-medium ${s.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{s.status}</span></td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => setViewing(s)} className="p-2 hover:bg-slate-100 rounded-lg"><Eye className="w-4 h-4" /></button>
                    <button onClick={() => setMessageTarget(s)} className="p-2 hover:bg-slate-100 rounded-lg"><Mail className="w-4 h-4" /></button>
                    <button onClick={() => setRemoveId(s.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.main>

      {/* Modals/Drawers Logic */}
      <AnimatePresence>
        {viewing && (
          <motion.div className="fixed inset-0 bg-slate-900/20 z-50 flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="w-full max-w-sm bg-white h-full p-6 shadow-xl" initial={{ x: "100%" }} animate={{ x: 0 }}>
              <div className="flex justify-between items-center mb-6"><h2 className="font-bold">Student Profile</h2><X onClick={() => setViewing(null)} className="cursor-pointer" /></div>
              <div className="text-center mb-6"><div className="w-20 h-20 rounded-full bg-blue-600 mx-auto mb-4" /> <h3 className="font-bold text-lg">{viewing.name}</h3><p className="text-slate-500 text-sm">{viewing.email}</p></div>
              <div className="space-y-4 text-sm text-slate-600">
                <p><strong>Course:</strong> {viewing.course}</p>
                <p><strong>Progress:</strong> {viewing.progress}%</p>
                <p><strong>Lessons:</strong> {viewing.lessons}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {messageTarget && (
          <div className="fixed inset-0 bg-slate-900/20 flex items-center justify-center z-50">
            <motion.div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
              <h2 className="font-bold mb-4">Message {messageTarget.name}</h2>
              <input className="w-full p-2 border rounded-lg mb-3" placeholder="Subject" />
              <textarea className="w-full p-2 border rounded-lg h-24 mb-4" placeholder="Your message..." />
              <div className="flex justify-end gap-3"><button onClick={() => setMessageTarget(null)} className="px-4 py-2 text-sm">Cancel</button><button onClick={() => {toast.success("Message sent successfully."); setMessageTarget(null)}} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Send</button></div>
            </motion.div>
          </div>
        )}

        {removeId && (
          <div className="fixed inset-0 bg-slate-900/20 flex items-center justify-center z-50">
            <motion.div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
              <h2 className="font-bold mb-2">Remove Student?</h2>
              <p className="text-sm text-slate-500 mb-6">Are you sure you want to remove this student? This action cannot be undone.</p>
              <div className="flex justify-end gap-3"><button onClick={() => setRemoveId(null)} className="px-4 py-2 text-sm">Cancel</button><button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Remove</button></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}