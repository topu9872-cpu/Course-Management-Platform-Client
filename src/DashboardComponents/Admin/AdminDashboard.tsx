"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Search,
  Bell,
  Users,
  GraduationCap,
  Briefcase,
  BookOpen,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const ENROLLMENT_DATA = [
  { month: "Feb", enrollments: 4200, students: 2100 },
  { month: "Mar", enrollments: 5800, students: 3400 },
  { month: "Apr", enrollments: 7100, students: 4100 },
  { month: "May", enrollments: 6900, students: 3900 },
  { month: "Jun", enrollments: 8400, students: 5200 },
  { month: "Jul", enrollments: 9800, students: 6100 },
];
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  lastLogin: string;
  courses: number;
  isBlock: boolean;
  bio: string;
}

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
type Admin =
  | {
      id: string;
      name: string;
      email: string;
      role?: string | null;
      image?: string | null;
    }
  | undefined;

interface protectType {
  getEnrollment: Enrollment[];
  allUsers: User[];
  admin: Admin;
  getAllCourses: string;
}

const AdminDashboard = ({
  getEnrollment,
  allUsers,
  admin,
  getAllCourses,
}: protectType) => {
  console.log(getEnrollment, allUsers);

  const allStudents = allUsers.filter((user) => user.role === "student").length;
  const allInstructors = allUsers.filter(
    (user) => user.role === "instructor",
  ).length;

  const OVERVIEW_SUMMARY = [
    {
      label: "Total Platform Users",
      value: allUsers.length | 0,

      icon: Users,
    },
    {
      label: "Active Students",
      value: allStudents | 0,

      icon: GraduationCap,
    },
    {
      label: "Active Instructors",
      value: allInstructors | 0,

      icon: Briefcase,
    },
    {
      label: "Published Courses",
      value: getAllCourses.length | 0,
      icon: BookOpen,
    },
    {
      label: "Active Enrollments",
      value: getEnrollment?.length | 0,
      icon: Layers,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const filteredSummary = useMemo(() => {
    return OVERVIEW_SUMMARY.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans px-4 py-6 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200/80 p-4 sm:p-5 rounded-2xl shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              Wellcome, {admin?.name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitor platform activity, manage telemetry pipelines, and
              orchestrate learning ecosystems.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search parameters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div
              className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs border border-slate-200"
              title="Admin Active Context"
            >
              {admin?.name[0]}
            </div>
          </div>
        </motion.div>

        {/* SUMMARY LAYER ROW */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y-0 md:divide-x divide-slate-100">
            {filteredSummary.map((item, idx) => (
              <div key={idx} className="p-2  md:px-4 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <item.icon className="h-3.5 w-3.5 text-slate-300" />{" "}
                  <span>{item.label.split(" ").slice(1).join(" ")}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-slate-900 tracking-tight">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs space-y-3"
          >
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Demographic Scaling
              </h3>
              <p className="text-sm font-bold text-slate-800">
                User Identity Cohort Delta
              </p>
            </div>
            <div className="h-56 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ENROLLMENT_DATA}
                  margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis dataKey="month" tickLine={false} stroke="#94a3b8" />
                  <YAxis tickLine={false} stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "11px",
                    }}
                  />
                  <Legend
                    iconSize={8}
                    wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                  />
                  <Bar
                    dataKey="students"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="New Student Matrix"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* LOWER DATA MATRIX SEGMENTATION */}

        {/* LIVE USER ROSTER CONTEXTS */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Recent Account Registrations
          </h3>
          <div className="space-y-2.5">
            {allUsers.slice(0, 3).map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-mono text-[11px] font-bold uppercase">
                    {user.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg">
                    {user.role}
                  </span>
                  <Link
                    href={"/dashboard/admin/users"}
                    onClick={() =>
                      toast.info(`Accessing Directory Node`, {
                        description: `Opening secure administrative view for ${user.name}.`,
                      })
                    }
                    className="p-1 text-slate-400 hover:text-blue-600 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
