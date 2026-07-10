"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";
import { ArrowUpRight, Users, DollarSign, Activity } from "lucide-react";

// 1. Mock Data
const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 6000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 8000 },
  { name: "Jun", revenue: 7000 },
];

// 2. Custom Tooltip for Premium Feel
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg">
        <p className="text-sm font-semibold text-slate-900">${payload[0].value}</p>
        <p className="text-xs text-slate-500">{payload[0].payload.name} 2026</p>
      </div>
    );
  }
  return null;
};

export default function PremiumAnalytics() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Metric Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Total Revenue", val: "$54,230", icon: DollarSign },
          { title: "Active Users", val: "2,420", icon: Users },
          { title: "Avg. Session", val: "4m 12s", icon: Activity },
        ].map((m, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -2 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500 font-medium">{m.title}</span>
              <m.icon className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{m.val}</div>
            <div className="mt-2 flex items-center text-xs text-emerald-600 font-medium">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5%
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chart Area */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Revenue Over Time</h3>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorRev)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}