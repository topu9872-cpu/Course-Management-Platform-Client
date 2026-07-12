"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  BookOpen,
  Star,
  Users,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EditCourseForm } from "./EditCourseModal";
import { deleteInstructorData } from "@/app/api/ServerAction";

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface Course {
  _id: string;
  title: string;
  shortDescription?: string;
  category?: string;
  level?: string;
  price?: string | number;
  studentsEnrolled?: number;
  rating?: number;
  lastUpdated?: string;
  status?: string;
  thumbnail?: string;
}

interface Props {
  coursesData: Course[];
  onDelete?: (id: string) => Promise<void>;
  onUpdate?: (formData: FormData) => Promise<void>;
}

// ─── Helper Components ──────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  Published: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Draft: "bg-amber-100 text-amber-700 border-amber-200",
  Archived: "bg-slate-100 text-slate-500 border-slate-200",
};

function StatusBadge({ status }: { status?: string }) {
  const s = status ?? "Draft";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wide ${STATUS_STYLES[s] ?? STATUS_STYLES.Draft}`}
    >
      {s}
    </span>
  );
}

function DeleteModal({
  course,
  onClose,
  onConfirm,
}: {
  course: Course;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl border border-slate-200 w-full max-w-md p-6 shadow-2xl"
      >
        <div className="flex gap-4 items-start mb-5">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 border border-red-100 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Delete this course?</h3>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              <strong className="text-slate-700">{course.title}</strong> will be
              permanently removed. This cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Course
          </button>
        </div>
      </motion.div>
    </div>
  );
}
// ─── Main Page Component ────────────────────────────────────────────────────

export default function ManageCourses({
  coursesData,
  onDelete,
  onUpdate,
}: Props) {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>(coursesData ?? []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal states
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Synchronize state if props modify from root containers
  React.useEffect(() => {
    setCourses(coursesData ?? []);
  }, [coursesData]);

  const filtered = useMemo(
    () =>
      courses.filter((c) => {
        const q = search.toLowerCase();
        const matchSearch =
          c.title?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q);
        const matchStatus = statusFilter === "All" || c.status === statusFilter;
        return matchSearch && matchStatus;
      }),
    [courses, search, statusFilter],
  );

 const handleDelete = async () => {
  if (!deletingCourse) return;
  try {
    // 1. Call your server action with the ID
    await deleteInstructorData(deletingCourse._id);
    
    // 2. Remove the course from the local state so it vanishes from the UI
    setCourses((prev) => prev.filter((c) => c._id !== deletingCourse._id));
    
    toast.success("Course deleted successfully.");
    router.refresh();
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete course.");
  } finally {
    setDeletingCourse(null);
  }
};

  const handleUpdateSubmit = async (formData: FormData) => {
    if (!editingCourse) return;
    try {
      await onUpdate?.(formData);
      
      const updatedTitle = formData.get("title") as string;
      const updatedCategory = formData.get("category") as string;
      const updatedPrice = formData.get("price") as string;
      const updatedStatus = formData.get("status") as string;

      setCourses((prev) =>
        prev.map((c) =>
          c._id === editingCourse._id
            ? {
                ...c,
                title: updatedTitle || c.title,
                category: updatedCategory || c.category,
                price: updatedPrice || c.price,
                status: updatedStatus || c.status,
              }
            : c
        )
      );

      toast.success("Course updated successfully.");
      setEditingCourse(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update course.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7FB] text-slate-800 antialiased pb-16">
      {/* Global Modals Context */}
      <AnimatePresence>
      {deletingCourse && (
  <DeleteModal
    course={deletingCourse}
    onClose={() => setDeletingCourse(null)}
    onConfirm={handleDelete} 
  />
)}

        {editingCourse && (
          <EditCourseForm
            course={editingCourse}
            isOpen={!!editingCourse}
            onOpenChange={(open) => !open && setEditingCourse(null)}
            onSave={handleUpdateSubmit}
            onCancel={() => setEditingCourse(null)}
          />
        )}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Course Library
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {courses.length} course{courses.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <Link
            href="/dashboard/instructor/create-course"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white text-xs font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" /> New Course
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              placeholder="Search by title or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["All", "Published", "Draft", "Archived"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                  statusFilter === s
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-slate-600 border-slate-200 hover:border-violet-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table/Empty State */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center shadow-sm mt-8">
            <div className="w-14 h-14 bg-violet-50 rounded-full flex items-center justify-center mb-4 text-violet-400 border border-violet-100">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">No courses found</h3>
            <p className="text-sm text-slate-400 mt-1">
              {search || statusFilter !== "All"
                ? "Try adjusting your filters."
                : "Create your first course to get started."}
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-5">Course</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Students</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((course) => (
                  <tr
                    key={course._id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                          {course.thumbnail ? (
                            <Image
                              src={course.thumbnail}
                              alt={course.title}
                              width={56}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <BookOpen className="w-4 h-4 text-slate-300" />
                          )}
                        </div>
                        <p className="font-semibold text-xs text-slate-900 line-clamp-1 max-w-50">
                          {course.title}
                        </p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      {course.category || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-900">
                      {course.price ? `${course.price}` : "Free"}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        {course.studentsEnrolled ?? 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      {course.rating ? (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          {course.rating.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={course.status} />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit Action Button */}
                        <button
                          onClick={() => setEditingCourse(course)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Delete Action Button */}
                        <button
                          onClick={() => setDeletingCourse(course)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.main>
    </div>
  );
}