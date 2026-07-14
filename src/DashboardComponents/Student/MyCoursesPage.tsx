"use client";

import React, { useState, useMemo } from "react";
import { Search, Flame, Star, Play, Download, Bookmark } from "lucide-react";
import { Toaster, toast } from "sonner";

type Courses = {
  _id: string;
  title: string;
  instructor: string;
  category: string;
  rating: string;
  duration: string;
  status?: string;
  progress?: string;
};

type MyCoursesProps = {
  studentCourses: Courses[];
};
const MyCourses = ({ studentCourses }: MyCoursesProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCourses = useMemo(
    () =>
      studentCourses.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) &&
          (statusFilter === "All" || c.status === statusFilter),
      ),
    [search, statusFilter],
  );

  const notify = (msg: string, desc: string) =>
    toast.success(msg, { description: desc });

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased font-sans p-6">
      <Toaster position="top-right" richColors closeButton />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">My Courses</h1>
          <p className="text-xs text-slate-500">
            Track, and resume your active learning modules.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
          <Flame className="h-4 w-4 text-orange-500 fill-current" />
          <span>7 Day Streak Active</span>
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
                <th className="p-4">Rating</th>
                <th className="p-4">duration</th>

                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCourses.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-12 text-slate-400 font-medium"
                  >
                    No courses match your search criteria.
                  </td>
                </tr>
              ) : (
                studentCourses?.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Course Title + Thumb */}
                    <td className="p-4 flex items-center gap-3 max-w-sm">
                      <div className="truncate">
                        <p className="font-bold text-slate-900 truncate hover:text-blue-600 cursor-pointer">
                          {c.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {c.instructor}
                        </p>
                      </div>
                    </td>

                    {/* Category badge */}
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {c.category}
                      </span>
                    </td>

                    {/* Stats */}
                    <td className="p-4  ">
                      <div className="flex items-center gap-1 text-amber-500 font-bold mb-0.5">
                        <Star className="h-3 w-3 fill-current" />{" "}
                        <span>{c.rating}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-400 text-[11px]">{c.duration}</p>
                    </td>

                    {/* Actions Panel */}
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => notify("Workspace Loaded", c.title)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          <Play className="h-2.5 w-2.5 fill-current" /> Resume
                        </button>
                        <button
                          onClick={() => notify("Bookmark Added", c.title)}
                          className="p-1 border border-slate-200 text-slate-400 hover:text-slate-700 bg-white rounded-md transition-colors"
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() =>
                            notify(
                              "Asset Packaged",
                              "Ready for local download.",
                            )
                          }
                          className="p-1 border border-slate-200 text-slate-400 hover:text-slate-700 bg-white rounded-md transition-colors"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
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

export default MyCourses;
