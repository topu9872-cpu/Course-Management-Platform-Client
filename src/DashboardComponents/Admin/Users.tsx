"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Search,
  Eye,
  Ban,
  Trash2,
  X,
  ArrowUpDown,
  AlertTriangle,
} from "lucide-react";
import { deleteUser, getUserBlock } from "@/app/api/ServerAction";
import { useRouter } from "next/navigation";

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

const UsersManagement = ({ allUsers }: { allUsers: User[] }) => {
  const [users, setUsers] = useState<User[]>(allUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null); // New state for delete modal
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });
const router=useRouter()
  // --- FILTER & SORT LOGIC ---
  const filteredUsers = useMemo(() => {
    let processed = [...users].filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });

    if (sortConfig.key) {
      processed.sort((a, b) => {
        const aValue = (a[sortConfig.key!]?.toString() || "").toLowerCase();
        const bValue = (b[sortConfig.key!]?.toString() || "").toLowerCase();
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return processed;
  }, [users, search, roleFilter, sortConfig]);

  const requestSort = (key: keyof User) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  // --- ACTIONS ---
  const handleToggleBlock = async (user: User) => {
    try {
      await getUserBlock(user._id, !user.isBlock);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isBlock: !u.isBlock } : u,
        ),
      );
      if (selectedUser?._id === user._id) {
        setSelectedUser({ ...user, isBlock: !user.isBlock });
      }
      toast.success(
        `User ${!user.isBlock ? "blocked" : "unblocked"} successfully`,
      );
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const confirmDelete = async () => {
    if (!userToDelete) 
      return
   
    if (userToDelete.role === "admin") {
      toast.warning('can`t delete admin !')
      return
    };;

    await deleteUser(userToDelete._id);

    setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
    setUserToDelete(null);

    toast.success("User deleted");
  };
  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      {/* SEARCH AND FILTER */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-50">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            className="w-full pl-10 py-2 border border-zinc-200 rounded-xl"
            placeholder="Search users..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-zinc-200 p-2 rounded-xl"
        >
          <option value="All">All Roles</option>
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-400 uppercase">
              <th
                className="p-4 cursor-pointer hover:text-slate-900"
                onClick={() => requestSort("name")}
              >
                Name <ArrowUpDown className="inline h-3 w-3" />
              </th>
              <th
                className="p-4 cursor-pointer hover:text-slate-900"
                onClick={() => requestSort("role")}
              >
                Role <ArrowUpDown className="inline h-3 w-3" />
              </th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4 font-bold">{user.name}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full ${!user.isBlock ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
                  >
                    {user.isBlock ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => setSelectedUser(user)}>
                    <Eye className="h-4 w-4 text-blue-500" />
                  </button>
                  <button onClick={() => handleToggleBlock(user)}>
                    <Ban className="h-4 w-4 text-amber-500" />
                  </button>
                  <button onClick={() => setUserToDelete(user)}>
                    <Trash2 className="h-4 w-4 text-rose-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {userToDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4 text-rose-600">
                  <AlertTriangle className="h-6 w-6" />
                  <h2 className="text-lg font-bold">Delete User</h2>
                </div>
                <p className="text-slate-600 mb-6">
                  Are you sure you want to delete{" "}
                  <strong>{userToDelete.name}</strong>? This action cannot be
                  undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setUserToDelete(null)}
                    className="flex-1 px-4 py-2 active:scale-102 bg-slate-100 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2 active:scale-102 bg-rose-600 text-white rounded-xl font-medium"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* USER DETAILS DRAWER */}
      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setSelectedUser(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-96 bg-white z-50 p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg">User Details</h2>
                <button onClick={() => setSelectedUser(null)}>
                  <X />
                </button>
              </div>
              <p className="font-bold text-xl">{selectedUser.name}</p>
              <h1 className="bg-slate-50">Email: {selectedUser.email}</h1>
              <div className="mt-6 p-4 bg-slate-50 rounded-xl space-y-2">
                <p>Role: {selectedUser.role}</p>
                <p>Status: {selectedUser.isBlock ? "Blocked" : "Active"}</p>
                <p>Joined: {selectedUser.createdAt}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersManagement;
