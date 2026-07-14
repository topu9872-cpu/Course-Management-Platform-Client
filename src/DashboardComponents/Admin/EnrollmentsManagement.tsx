"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  X,
  Calendar,
  BookOpen,
  CreditCard,
  Award,
  Activity,
  User,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { deleteEnrollmentAdmin } from "@/app/api/ServerAction";

interface Enrollment {
  _id: string;
  studentName: string;
  studentEmail: string;
  students: string;
  title: string;
  instructor: string;
  enrollmentDate: string;
  paymentStatus: string;
  rating: string;
  enrollDate: string;
  courseId: string;
  studentId: string;
  price: string;
}

const EnrollmentsManagement = ({
  getEnrollment,
}: {
  getEnrollment: Enrollment[];
}) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(getEnrollment);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");

  const [selectedEnr, setSelectedEnr] = useState<Enrollment | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const uniqueCourses = useMemo(
    () => ["All", ...Array.from(new Set(enrollments.map((e) => e.title)))],
    [enrollments],
  );

  const filteredAndSorted = useMemo(() => {
    return enrollments.filter((e) => {
      const matchesSearch =
        (e.studentName ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (e.studentEmail ?? "").toLowerCase().includes(search.toLowerCase());
      const matchesCourse = courseFilter === "All" || e.title === courseFilter;

      return matchesSearch && matchesCourse;
    });
  }, [enrollments, search, courseFilter]);

  const handleMarkCompleted = (id: string) => {
    setEnrollments((prev) =>
      prev.map((e) =>
        e._id === id ? { ...e, status: "Completed", progress: 100 } : e,
      ),
    );
    toast.success("Enrollment marked as completed.");
    setActiveMenuId(null);
  };

  const confirmRemove = async () => {
    if (!deleteTargetId) return;

    await deleteEnrollmentAdmin(deleteTargetId);

    setEnrollments((prev) => prev.filter((e) => e._id !== deleteTargetId));

    toast.success("Enrollment removed from dashboard view.");

    setDeleteTargetId(null);
    setActiveMenuId(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* PAGE HEADER & CONTROLS */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Enrollments
            </h1>
            <p className="text-sm text-slate-500">
              Manage student enrollments across all courses.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search student name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-slate-50/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white text-xs">
                <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="focus:outline-none bg-transparent font-medium text-slate-700"
                >
                  {uniqueCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
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
                  <th className="p-4">Finance</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <AnimatePresence mode="popLayout">
                  {filteredAndSorted.map((e) => (
                    <motion.tr
                      key={e._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/40 transition-colors group"
                    >
                      <td className="p-4  gap-3">
                        <p className="font-semibold text-slate-900">
                          {e.studentName}
                        </p>
                        <p className="text-[11px] text-slate-400 font-normal">
                          {e.studentEmail}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-800">
                          {e.title}
                        </p>
                        <p className="text-[11px] text-slate-400 font-normal">
                          Instructor: {e.instructor}
                        </p>
                      </td>
                      <td className="p-4 font-mono text-slate-500">
                        {e.enrollDate}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${e.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}
                        >
                          {e.paymentStatus}
                        </span>
                      </td>

                      <td
                        className="p-4 text-right"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {/* Wrapper div to reliably handle the absolute positioning of the dropdown */}
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() =>
                              setActiveMenuId(
                                activeMenuId === e._id ? null : e._id,
                              )
                            }
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {activeMenuId === e._id && (
                            <>
                              {/* Backdrop overlay to close when clicking outside */}
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveMenuId(null)}
                              />

                              {/* Floating Dropdown Menu aligned to the right of the button */}
                              <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-20 text-left font-medium">
                                <button
                                  onClick={() => {
                                    setSelectedEnr(e);
                                    toast.info("Mounted details view.");
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                                >
                                  <Eye className="h-3.5 w-3.5" /> View Details
                                </button>

                                {e.paymentStatus !== "paid" &&
                                  e.paymentStatus !== "completed" && (
                                    <button
                                      onClick={() => handleMarkCompleted(e._id)}
                                      className="w-full px-3 py-1.5 hover:bg-slate-50 text-emerald-600 flex items-center gap-2"
                                    >
                                      <CheckCircle className="h-3.5 w-3.5" />{" "}
                                      Mark Completed
                                    </button>
                                  )}

                                <button
                                  onClick={() => setDeleteTargetId(e._id)}
                                  className="w-full px-3 py-1.5 hover:bg-slate-50 text-rose-600 flex items-center gap-2 border-t border-slate-100 mt-1"
                                >
                                  <Trash2 className="h-3.5 w-3.5" /> Remove Row
                                </button>
                              </div>
                            </>
                          )}
                        </div>
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
                <motion.div
                  key={e._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <h4 className="text-xs font-semibold text-slate-900">
                        {e.studentName}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {e.studentName}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold ${e.paymentStatus}text-emerald-600"}`}
                    >
                      {e.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      {e.title}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Enrolled: {e.enrollmentDate}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${e.paymentStatus === "paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {e.paymentStatus}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedEnr(e);
                          toast.info("Mounted details view.");
                        }}
                        className="px-2 py-1 text-[10px] font-semibold border border-slate-200 rounded-lg text-slate-600 bg-white"
                      >
                        View
                      </button>

                      <button
                        onClick={() => setDeleteTargetId(e._id)}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
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
              <h3 className="text-sm font-semibold text-slate-800">
                No Enrollments Found
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                No matching parameter mappings correspond to your active queries
                or database state values.
              </p>
            </div>
          )}

          {/* PAGINATION FOOTER */}
          {filteredAndSorted.length > 0 && (
            <div className="p-3.5 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between text-xs font-medium text-slate-500">
              <p className="text-[11px]">
                Showing subset{" "}
                <span className="font-semibold text-slate-800">
                  {filteredAndSorted.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-800">
                  {enrollments.length}
                </span>{" "}
                matrices
              </p>
              <div className="flex items-center gap-1.5">
                <button className="p-1 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-2.5 py-0.5 bg-white border border-slate-200 rounded-md font-semibold text-slate-800 text-[11px]">
                  1
                </span>
                <button className="p-1 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VIEW DETAILS SIDE DRAWER PANEL */}
      <AnimatePresence>
        {selectedEnr && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEnr(null)}
              className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="bg-white border-l border-slate-200 max-w-md w-full h-full z-10 p-6 flex flex-col justify-between shadow-2xl relative text-xs"
            >
              <div className="space-y-5 overflow-y-auto pb-4">
                <div className=" justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      Enrollment Context
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {selectedEnr._id}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEnr(null)}
                    className="p-1.5 hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className=" gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <h4 className="font-semibold text-slate-900 text-xs flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />{" "}
                    {selectedEnr.studentName}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {selectedEnr.studentEmail}
                  </p>
                </div>

                <div className="space-y-3 bg-white p-3 border border-slate-100 rounded-xl shadow-2xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Curriculum Parameters
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-800 flex items-center gap-2">
                      <BookOpen className="h-3.5 w-3.5 text-slate-400" />{" "}
                      {selectedEnr.title}
                    </p>
                    <p className="text-slate-500 font-normal">
                      Instructor Master Node: {selectedEnr.instructor}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100/60 text-[11px]">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wide">
                        Financial Settlement
                      </span>
                      <span className="font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                        <CreditCard className="h-3 w-3" />{" "}
                        {selectedEnr.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* TIMELINE METRIC */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Telemetry State Sequence
                  </p>
                  <div className="relative border-l-2 border-slate-100 pl-4 space-y-4 font-normal text-slate-600">
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative"
                    >
                      <span className="absolute -left-5.25 top-0.5 bg-blue-600 h-2 w-2 rounded-full ring-4 ring-white" />
                      <p className="font-semibold text-slate-800">
                        Enrolled & Confirmed
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {selectedEnr.enrollDate}
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <span
                        className={`absolute -left-5.25 top-0.5 h-2 w-2 rounded-full ring-4 ring-white ${selectedEnr.paymentStatus} bg-emerald-500`}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedEnr(null)}
                className="w-full py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-2xs"
              >
                Close Inspection
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REMOVE ROW CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTargetId(null)}
              className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              className="bg-white border border-slate-200 max-w-sm w-full rounded-2xl shadow-xl z-10 p-5 space-y-4 text-xs text-center flex flex-col items-center"
            >
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
                <Trash2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-900 text-sm">
                  Purge Record Object?
                </h4>
                <p className="text-slate-400 max-w-xs leading-relaxed font-normal">
                  This action drops the layout tracking reference node from the
                  client state matrix buffer.
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 w-full pt-1">
                <button
                  onClick={() => setDeleteTargetId(null)}
                  className="flex-1 py-2 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Abort
                </button>
                <button
                  onClick={confirmRemove}
                  className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-2xs"
                >
                  Confirm Purge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnrollmentsManagement;
