"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { Search, Mail, Trash2, Eye, X } from "lucide-react";
import { deleteStudent, getInstructorsStudents } from "@/app/api/ServerAction";

interface Student {
  _id: string;
  studentName: string;
  studentEmail: string;
  title: string;
  paymentStatus: string;
  enrollDate: string;
  price: string;
}

export default function Students({ userId }: { userId: string }) {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [viewing, setViewing] = useState<Student | null>(null);
  const [messageTarget, setMessageTarget] = useState<Student | null>(null);
  const [removeId, setRemoveId] = useState<string | null>(null);

  // Helper to extract ID string safely regardless of format

  const handleDelete = async () => {
    if (!removeId) return;
    const deleteStu = await deleteStudent(removeId);
    if (deleteStu.deletedCount > 0) {
      toast.success("Student removed successfully.");
    }
    setRemoveId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getInstructorsStudents(userId, search);
      setStudents(data || []);
      setIsLoading(false);
    };

    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [search, userId]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <Toaster position="top-right" richColors />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Students</h1>
            <p className="text-sm text-slate-500">
              Manage students enrolled in your courses.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none w-full md:w-64"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm min-h-75">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                {["Student", "Course", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="p-4 text-left font-semibold text-slate-600"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    Loading data...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <motion.tr
                    key={s._id}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                        {s.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{s.studentName}</p>
                        <p className="text-slate-400 text-xs">
                          {s.studentEmail}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 truncate max-w-50">
                      {s.title}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-medium ${s.paymentStatus === "paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                      >
                        {s.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => setViewing(s)}
                        className="p-2 hover:bg-slate-100 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setMessageTarget(s)}
                        className="p-2 hover:bg-slate-100 rounded-lg"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setRemoveId(s._id)}
                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.main>

      {/* --- ALL MODALS CONSOLIDATED HERE --- */}
      <AnimatePresence>
        {/* Profile Drawer */}
        {viewing && (
          <motion.div
            className="fixed inset-0 bg-slate-900/20 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm bg-white h-full p-6 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold">Student Profile</h2>
                <X
                  onClick={() => setViewing(null)}
                  className="cursor-pointer"
                />
              </div>
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-600 mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                  {viewing.studentName.charAt(0)}
                </div>
                <h3 className="font-bold text-lg">{viewing.studentName}</h3>
                <p className="text-slate-500 text-sm">{viewing.studentEmail}</p>
              </div>
              <div className="space-y-4 text-sm text-slate-600 border-t pt-4">
                <p>
                  <strong>Course:</strong> {viewing.title}
                </p>
                <p>
                  <strong>Enrolled:</strong> {viewing.enrollDate}
                </p>
                <p>
                  <strong>Price:</strong> ${viewing.price}
                </p>
                <p>
                  <strong>Payment:</strong> {viewing.paymentStatus}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Message Modal */}
        {messageTarget && (
          <div className="fixed inset-0 bg-slate-900/20 flex items-center justify-center z-50">
            <motion.div
              className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h2 className="font-bold mb-4">
                Message {messageTarget.studentName}
              </h2>
              <input
                className="w-full p-2 border rounded-lg mb-3"
                placeholder="Subject"
              />
              <textarea
                className="w-full p-2 border rounded-lg h-24 mb-4"
                placeholder="Your message..."
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setMessageTarget(null)}
                  className="px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success("Sent");
                    setMessageTarget(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Modal */}
        {removeId && (
          <div className="fixed inset-0 bg-slate-900/20 flex items-center justify-center z-20">
            <motion.div
              className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h2 className="font-bold mb-2">Remove Student?</h2>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setRemoveId(null)}
                  className="px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
