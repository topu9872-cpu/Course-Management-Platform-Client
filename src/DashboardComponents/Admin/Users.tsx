"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  Search, Filter, Shield, MoreVertical, Eye, Edit2, Ban, CheckCircle2, 
  Trash2, X, ChevronLeft, ChevronRight, UserX, ArrowUpDown
} from "lucide-react";

// --- MOCK USER INTERFACE & DATA ---
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Student" | "Instructor" | "Admin";
  joinedDate: string;
  courses: number;
  status: "Active" | "Blocked";
  lastLogin: string;
  bio: string;
}

const INITIAL_USERS: User[] = [
  { id: "USR-001", name: "Topu Ahmed", email: "topu.ahmed@dev.io", phone: "+1 (555) 019-2834", role: "Student", joinedDate: "2026-02-15", courses: 6, status: "Active", lastLogin: "2 hours ago", bio: "Full-stack enthusiast engineering modern reactive web systems with Next.js and Tailwind." },
  { id: "USR-002", name: "Dr. Elena Rostova", email: "e.rostova@platform.edu", phone: "+1 (555) 043-9912", role: "Instructor", joinedDate: "2025-11-01", courses: 14, status: "Active", lastLogin: "1 day ago", bio: "Professor of Distributed Computing systems and Advanced Database Architecture optimization paradigms." },
  { id: "USR-003", name: "Sajib Hossain", email: "sajib@example.com", phone: "+1 (555) 088-1122", role: "Student", joinedDate: "2026-05-20", courses: 2, status: "Blocked", lastLogin: "3 weeks ago", bio: "Exploring asynchronous patterns, runtime telemetry data layers, and component state mechanics." },
  { id: "USR-004", name: "Sarah Jenkins", email: "sarah.j@cloud.net", phone: "+1 (555) 012-7741", role: "Instructor", joinedDate: "2024-08-19", courses: 28, status: "Active", lastLogin: "34 mins ago", bio: "Lead UX strategist specializing in Design Systems design tokens engineering, Pixso workflows, and web semantics." },
  { id: "USR-005", name: "Miraz Rahman", email: "miraz@admin.platform.com", phone: "+1 (555) 099-0011", role: "Admin", joinedDate: "2024-01-10", courses: 0, status: "Active", lastLogin: "Just now", bio: "Platform Infrastructure systems orchestrator managing authentication layers and cluster scaling policies." }
];

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // --- FILTERING LOGIC ---
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                            user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  // --- ACTIONS ---
  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === id) {
        const nextStatus = user.status === "Active" ? "Blocked" : "Active";
        toast.dismiss();
        if (nextStatus === "Blocked") {
          toast.error(`User identity suspended`, { description: `${user.name} access tokens revoked.` });
        } else {
          toast.success(`User identity restored`, { description: `${user.name} credentials authorized.` });
        }
        if (selectedUser?.id === id) setSelectedUser({ ...user, status: nextStatus });
        return { ...user, status: nextStatus };
      }
      return user;
    }));
    setActiveMenuId(null);
  };

  const deleteUserUi = (id: string, name: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    toast.warning("User node deleted", { description: `${name} has been erased from current state cache.` });
    if (selectedUser?.id === id) setSelectedUser(null);
    setActiveMenuId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased font-sans px-4 py-6 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PAGE HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -8 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Users Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">Administer accounts, toggle infrastructure context access permissions, and parse node rosters.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 min-w-25">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input 
                type="text" placeholder="Filter names, emails..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
            
            <select 
              value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium text-slate-700"
            >
              <option value="All">All Roles</option>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Admin">Admin</option>
            </select>

            <select 
              value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium text-slate-700"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </motion.div>

        {/* DATA CONTAINER */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden relative">
          
          {/* DESKTOP TABLE VIEWPORT */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Identity Matrix Node</th>
                  <th className="p-4">Authorization</th>
                  <th className="p-4">Joined Date</th>
                  <th className="p-4">Load Allocation</th>
                  <th className="p-4">Status Token</th>
                  <th className="p-4">Telemetry Anchor</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <AnimatePresence mode="popLayout">
                  {filteredUsers.map((user) => (
                    <motion.tr 
                      key={user.id} layout
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs tracking-wider uppercase border border-slate-200 ${user.status === 'Blocked' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'}`}>
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 flex items-center gap-1.5">
                              {user.name}
                              {user.role === 'Admin' && <Shield className="h-3 w-3 text-blue-600 fill-blue-50" />}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border border-purple-100' : user.role === 'Instructor' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-slate-100 text-slate-700'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 font-mono">{user.joinedDate}</td>
                      <td className="p-4 font-mono text-slate-600">{user.role === 'Admin' ? '—' : `${user.courses} modules`}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          <span className={`w-1 h-1 rounded-full ${user.status === 'Active' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 font-mono text-[11px]">{user.lastLogin}</td>
                      <td className="p-4 text-right relative">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => setSelectedUser(user)} className="p-1 text-slate-400 hover:text-blue-600 rounded transition-all" title="Inspect Node"><Eye className="h-3.5 w-3.5" /></button>
                          <button onClick={() => toggleStatus(user.id)} className={`p-1 rounded transition-all ${user.status === 'Active' ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50/50' : 'text-emerald-600 hover:bg-emerald-50/50'}`} title={user.status === 'Active' ? 'Revoke System Access' : 'Restore System Access'}>
                            <Ban className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => deleteUserUi(user.id, user.name)} className="p-1 text-slate-400 hover:text-rose-700 rounded transition-all" title="Purge Record"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* MOBILE STACKED INTERFACE VIEWPORT */}
          <div className="block md:hidden divide-y divide-slate-100">
            <AnimatePresence mode="popLayout">
              {filteredUsers.map((user) => (
                <motion.div 
                  key={user.id} layout
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-[10px] uppercase ${user.status === 'Blocked' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'}`}>
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 flex items-center gap-1">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{user.email}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${user.role === 'Admin' ? 'bg-purple-50 text-purple-700' : user.role === 'Instructor' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
                      {user.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Status Check</p>
                      <p className={`font-bold ${user.status === 'Active' ? 'text-emerald-700' : 'text-rose-700'}`}>{user.status}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Allocation</p>
                      <p className="font-semibold text-slate-700">{user.role === 'Admin' ? 'System Root' : `${user.courses} Modules`}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button onClick={() => setSelectedUser(user)} className="px-2 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-semibold flex items-center gap-1"><Eye className="h-3 w-3" /> Inspect</button>
                    <button 
                      onClick={() => toggleStatus(user.id)} 
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all ${user.status === 'Active' ? 'bg-white border-rose-200 text-rose-600 hover:bg-rose-50' : 'bg-white border-emerald-200 text-emerald-600 hover:bg-emerald-50'}`}
                    >
                      {user.status === "Active" ? "Restrict Node" : "Authorize Node"}
                    </button>
                    <button onClick={() => deleteUserUi(user.id, user.name)} className="p-1.5 bg-rose-50/50 border border-rose-100 text-rose-600 rounded-lg"><Trash2 className="h-3 w-3" /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* EMPTY STATE CONTEXT CONTAINER */}
          {filteredUsers.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center flex flex-col items-center justify-center space-y-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400">
                <UserX className="h-6 w-6" />
              </div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-2">Zero Matching Identity Dimensions</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">No telemetry data matrices align with your filter bounds. Reset search inputs or mutation toggles.</p>
              <button onClick={() => { setSearch(""); setRoleFilter("All"); setStatusFilter("All"); }} className="mt-2 text-[11px] font-bold text-blue-600 hover:underline">Flush Telemetry Filters</button>
            </motion.div>
          )}

          {/* TABLE PAGINATION DOCK */}
          {filteredUsers.length > 0 && (
            <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
              <p className="text-[11px]">Displaying allocation subset <span className="font-bold text-slate-800">{filteredUsers.length}</span> of <span className="font-bold text-slate-800">{users.length}</span> context maps</p>
              <div className="flex items-center gap-1.5">
                <button className="p-1 bg-white border border-slate-200/60 rounded-lg text-slate-400 cursor-not-allowed"><ChevronLeft className="h-3.5 w-3.5" /></button>
                <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md font-bold text-slate-800 text-[11px]">1</span>
                <button className="p-1 bg-white border border-slate-200/60 rounded-lg text-slate-400 cursor-not-allowed"><ChevronRight className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* USER SECURE DETAILS ANCHOR DRAWER OVERLAY */}
      <AnimatePresence>
        {selectedUser && (
          <>
            {/* Backdrop Layer */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-40"
            />
            {/* Drawer Sliding Context */}
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-slate-200/80 z-50 p-6 overflow-y-auto space-y-6 text-xs flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Identity Inspection</h3>
                    <p className="text-[10px] text-slate-400 font-mono">{selectedUser.id}</p>
                  </div>
                  <button onClick={() => setSelectedUser(null)} className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Main Node Card Profile Details */}
                <div className="flex items-center gap-4 bg-slate-50/80 p-4 border border-slate-100 rounded-2xl">
                  <div className={`w-12 h-12 rounded-full font-bold flex items-center justify-center text-sm tracking-wider uppercase border-2 ${selectedUser.status === 'Blocked' ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                    {selectedUser.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">{selectedUser.name}</h4>
                    <span className={`inline-flex items-center text-[9px] font-bold px-1.5 py-0.5 rounded ${selectedUser.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                {/* Telemetry Vectors Metadata */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Telemetry Properties</h5>
                  <div className="grid grid-cols-1 gap-2.5 font-medium text-slate-700">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Communication Axis</span>
                      <span className="font-mono text-slate-900">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Mobile Hash Vector</span>
                      <span className="font-mono text-slate-900">{selectedUser.phone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">System Role Token</span>
                      <span className="font-bold text-blue-600">{selectedUser.role}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Instantiation Anchor</span>
                      <span className="font-mono text-slate-900">{selectedUser.joinedDate}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Cluster Modules Allocation</span>
                      <span className="font-mono text-slate-900">{selectedUser.courses} loaded</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Last Stream Handshake</span>
                      <span className="text-slate-900">{selectedUser.lastLogin}</span>
                    </div>
                  </div>
                </div>

                {/* Account Bio Context */}
                <div className="space-y-1.5">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Node Signature Profile</h5>
                  <p className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium text-slate-600 leading-relaxed">
                    {selectedUser.bio}
                  </p>
                </div>
              </div>

              {/* Drawer Mutation Interaction Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <button 
                  onClick={() => toggleStatus(selectedUser.id)}
                  className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all border ${selectedUser.status === 'Active' ? 'bg-rose-50/50 border-rose-200 text-rose-700 hover:bg-rose-50' : 'bg-emerald-50/50 border-emerald-200 text-emerald-700 hover:bg-emerald-50'}`}
                >
                  {selectedUser.status === "Active" ? "Suspend Security Access" : "Reinstate Security Access"}
                </button>
                <button 
                  onClick={() => deleteUserUi(selectedUser.id, selectedUser.name)}
                  className="p-2 bg-slate-50 border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all"
                  title="Purge Node From Infrastructure"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersManagement;