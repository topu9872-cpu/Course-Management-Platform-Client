"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BookOpen, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { BiMoney } from "react-icons/bi";

// --- SYSTEM CONSTANTS & CONFIGS ---
const VARIANT_CONTAINER = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const VARIANT_ITEM = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 110, damping: 16 },
  },
};

const ANALYTICS_DATA = [
  { name: "Jan", hours: 24 },
  { name: "Feb", hours: 32 },
  { name: "Mar", hours: 28 },
  { name: "Apr", hours: 45 },
  { name: "May", hours: 38 },
  { name: "Jun", hours: 52 },
];

type User =
  | {
      id: string;
      name: string;
      email: string;
      role?: string | null;
      image?: string | null;
    }
  | undefined;
type Course = { _id: string; title: string;price:string };
type OverviewProps = { user: User; studentCourses: Course[] };

const StudentDashboard = ({ user, studentCourses }: OverviewProps) => {
  useEffect(() => {
    toast.success(`Welcome back, ${user?.name}! 👋`, {
      description: `You have ${studentCourses.length} pending assignments due this week.`,
    });
  }, [user]);

const total = studentCourses
  .reduce((sum, course) => sum + Number(course.price), 0)
  .toFixed(2);
  const STATS = [
    {
      title: "Enrolled Courses",
      value: studentCourses.length,
      icon: BookOpen,
      change: "+2 this month",
      bg: "bg-blue-50",
    },
    {
      title: "Completed Courses",
      value: 0,
      icon: CheckCircle,
      change: "85% completion rate",
      bg: "bg-emerald-50",
    },
    {
      title: "Purchase History",
      value: total,
      icon: BiMoney,
      change: "View transaction details",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 antialiased font-sans pb-12 selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight text-slate-900">
            Welcome back, {user?.name} 👋
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STATS.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{
                  y: -3,
                  boxShadow: "0 10px 20px -10px rgba(0,0,0,0.04)",
                }}
                className="bg-white border border-slate-200 p-5 rounded-2xl transition-shadow duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-extrabold text-slate-900 mt-2">
                      {stat.value}
                    </h3>
                  </div>
                  <div className={`p-2.5 rounded-xl ${stat.bg} text-slate-700`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500 bg-slate-50 inline-block px-2 py-0.5 rounded-md">
                  {stat.change}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Analytics Chart */}
        <motion.div
          variants={VARIANT_CONTAINER}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div
            variants={VARIANT_ITEM}
            className="bg-white border border-slate-200 p-5 rounded-2xl"
          >
            <h3 className="text-sm font-bold text-slate-900 mb-4">
              Learning Analytics
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={ANALYTICS_DATA}
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#2563eb"
                        stopOpacity={0.15}
                      />
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
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fill="url(#blueGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default StudentDashboard;
