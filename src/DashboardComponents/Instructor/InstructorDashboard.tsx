"use client";

import { motion } from "framer-motion";
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BookOpen, Users, Star, DollarSign } from "lucide-react";

type User =
  | {
      id: string;
      name: string;
      email: string;
      role?: string | null;
      image?: string | null;
    }
  | undefined;

interface Student {
  _id: string;
  studentName: string;
  studentEmail: string;
  title: string;
  paymentStatus: string;
  enrollDate: string;
  price: string;
  rating: string;
}

type Course = { _id: string; title: string; price: string };
type OverviewProps = { user: User; coursesData: Course[]; data: Student[] };

export const InstructorDashboard = ({
  coursesData,
  user,
  data,
}: OverviewProps) => {
  const total = data
    .reduce((sum, price) => sum + Number(price.price), 0)
    .toFixed(2);
  const ratings = data.map((item) => Number(item.rating) / 5);
  const stats = [
    { label: "Courses", value: coursesData.length || 0, icon: BookOpen },
    { label: "Students", value: data.length || 0, icon: Users },
    { label: "Rating", value: ratings, icon: Star },

    { label: "Revenue", value: `$${total}`, icon: DollarSign },
  ];

  const unifiedData = [
    { name: "Feb", students: 420, completed: 250 },
    { name: "Mar", students: 580, completed: 410 },
    { name: "Apr", students: 510, completed: 390 },
    { name: "May", students: 740, completed: 520 },
    { name: "Jun", students: 890, completed: 680 },
    { name: "Jul", students: 1100, completed: 850 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans p-4 md:p-6 max-w-6xl mx-auto selection:bg-blue-100">
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4 mb-5"
      >
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Wellcome, {user?.name}
          </h1>
          <p className="text-xs text-slate-500">
            Track and manage your running course lifecycle performance.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto"></div>
      </motion.header>

      {/* COMPACT SUMMARY CONSOLE */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-xl shadow-sm grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100 p-1 mb-5"
      >
        {stats.map((stat, i) => (
          <div key={i} className="p-3.5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              <stat.icon className="h-3 w-3 text-slate-400" />
              {stat.label}
            </div>
            <div className="text-lg font-bold text-slate-900 mt-0.5 tracking-tight">
              {stat.value}
            </div>
          </div>
        ))}
      </motion.div>

      <div className="gap-5">
        {/* UNIFIED ENROLLMENT & PERFORMANCE CHARTS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-slate-200 rounded-xl shadow-sm p-4"
        >
          <div className="mb-3">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Performance Funnel
            </h3>
            <p className="text-[11px] text-slate-400">
              Monthly breakdown of gross aggregate student signups and final
              graduations.
            </p>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={unifiedData}
                margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    fontSize: "11px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#2563eb"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#areaColor)"
                />
                <Bar
                  dataKey="completed"
                  fill="#93c5fd"
                  radius={[2, 2, 0, 0]}
                  barSize={12}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
