"use client";

import React, { useState, useMemo } from "react";
import { Search, Flame, Star, Play, Download, Bookmark } from "lucide-react";
import { Toaster, toast } from "sonner";

const MOCK_COURSES = [
  { id: "c1", title: "Advanced Next.js App Router & Production Architecture", instructor: "Sarah Jenkins", category: "Web Development", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&auto=format&fit=crop&q=80", rating: 4.9, completed: 32, total: 40, duration: "24h 15m", status: "Ongoing", progress: 80 },
  { id: "c2", title: "Enterprise UI/UX Design Systems with Figma", instructor: "Michael Chen", category: "UI/UX Design", thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80", rating: 4.8, completed: 18, total: 42, duration: "18h 30m", status: "Ongoing", progress: 42 },
  { id: "c3", title: "Node.js Microservices & Event-Driven Architecture", instructor: "Alex Rivers", category: "Backend Systems", thumbnail: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=100&auto=format&fit=crop&q=80", rating: 4.7, completed: 36, total: 40, duration: "30h 10m", status: "Ongoing", progress: 90 },
  { id: "c4", title: "Data Visualization Masterclass with D3.js & WebGL", instructor: "Emma Watson", category: "Data Science", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80", rating: 4.9, completed: 25, total: 25, duration: "14h 20m", status: "Completed", progress: 100 }
];

const MyCourses= () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCourses = useMemo(() => 
    MOCK_COURSES.filter(c => 
      c.title.toLowerCase().includes(search.toLowerCase()) && 
      (statusFilter === "All" || c.status === statusFilter)
    ), [search, statusFilter]
  );

  const notify = (msg: string, desc: string) => toast.success(msg, { description: desc });

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased font-sans p-6">
      <Toaster position="top-right" richColors closeButton />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">My Courses</h1>
          <p className="text-xs text-slate-500">Track, filter, and resume your active learning modules.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
          <Flame className="h-4 w-4 text-orange-500 fill-current" />
          <span>7 Day Streak Active</span>
        </div>
      </div>

      {/* SEARCH & FILTER CONTROLS */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center bg-white border border-slate-200 p-3 rounded-xl shadow-sm mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input 
            type="text" placeholder="Search courses by title..." value={search} onChange={(e) => setSearch(e.target.value)} 
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 focus:outline-none transition-all" 
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-bold text-slate-600 self-start md:self-auto">
          {["All", "Ongoing", "Completed"].map((st) => (
            <button key={st} onClick={() => setStatusFilter(st)} className={`px-3 py-1 rounded-md transition-all ${statusFilter === st ? "bg-white text-blue-600 shadow-sm" : "hover:text-slate-900"}`}>{st}</button>
          ))}
        </div>
      </div>

      {/* DATA TABLE AREA */}
      <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-4">Course Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Rating & Time</th>
                <th className="p-4">Progress Tracker</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-400 font-medium">No courses match your search criteria.</td>
                </tr>
              ) : (
                filteredCourses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Course Title + Thumb */}
                    <td className="p-4 flex items-center gap-3 max-w-sm">
                      <img src={c.thumbnail} alt="" className="h-10 w-16 object-cover rounded bg-slate-100 shrink-0" />
                      <div className="truncate">
                        <p className="font-bold text-slate-900 truncate hover:text-blue-600 cursor-pointer">{c.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{c.instructor}</p>
                      </div>
                    </td>
                    
                    {/* Category badge */}
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{c.category}</span>
                    </td>

                    {/* Stats */}
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-amber-500 font-bold mb-0.5">
                        <Star className="h-3 w-3 fill-current" /> <span>{c.rating}</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">{c.duration}</p>
                    </td>

                    {/* Progress Bar & Steps */}
                    <td className="p-4 min-w-35">
                      <div className="flex justify-between font-bold mb-1 text-[11px]">
                        <span className="text-slate-400">{c.completed}/{c.total} Units</span>
                        <span className="text-blue-600">{c.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                        <div className={`h-full ${c.status === "Completed" ? "bg-emerald-500" : "bg-blue-600"}`} style={{ width: `${c.progress}%` }} />
                      </div>
                    </td>

                    {/* Actions Panel */}
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button onClick={() => notify("Workspace Loaded", c.title)} className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"><Play className="h-2.5 w-2.5 fill-current" /> Resume</button>
                        <button onClick={() => notify("Bookmark Added", c.title)} className="p-1 border border-slate-200 text-slate-400 hover:text-slate-700 bg-white rounded-md transition-colors"><Bookmark className="h-3.5 w-3.5" /></button>
                        <button onClick={() => notify("Asset Packaged", "Ready for local download.")} className="p-1 border border-slate-200 text-slate-400 hover:text-slate-700 bg-white rounded-md transition-colors"><Download className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyCourses