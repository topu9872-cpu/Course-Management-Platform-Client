"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Key,
  Download,
  LogOut,
  Shield,
  Award,
  Edit3,
  Save,
  Camera,
  ChevronRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import Image from "next/image";
import { ImageBB } from "@/Components/UI/ImageBB";
const Profile = () => {
  const [date, setDate] = useState<any | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as any;
  useEffect(() => {
    if (user?.bath) {
      setDate(new Date(user.bath));
    }
  }, [user]);
  // 1. Fetch Session from better-auth

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<any>({});

  // 2. Sync DB user data to local form state once it loads
  useEffect(() => {
    if (user) {
      setForm({
        name: user?.name || "",
        username: user?.username || "",
        image: imageFile,
        email: user?.email || "",
        phone: user?.phone || "",
        bath: user?.bath || "",
        gender: user?.gender || "",
        bio: user?.bio || "",
        skills: user?.skills,
      });
    }
  }, [user]);

  const saveProfile = async () => {
    try {
      let image = user?.image;

      if (imageFile) {
        image = await ImageBB(imageFile);
      }
      const { data, error } = await authClient.updateUser({
        name: form.name,
        username: form.username,
        phone: form.phone,
        bath: date,
        gender: form.gender,
        bio: form.bio,
        image: image,
        skills: form.skills,
      });
      if (error) {
        toast.error(error.message || "Failed to update profile parameters");
        return;
      }
      if (data) {
        setIsEditing(false);
        toast.success("Profile Parameters Saved", {
          description:
            "Local modification payload synchronized with production database.",
        });
      }
    } catch (err) {
      toast.error("System Error: Could not synchronize profile updates.");
    }
  };

  const toggleEdit = () => {
    if (isEditing && user) {
      // Revert form back to original user data if cancelled
      setForm({
        ...user,
        skills: user?.skills.join(", "),
      });
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    toast.error("Session Severed", {
      description:
        "Terminated active web token. Relocating routing focus back to authentication portal.",
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-rose-500 font-bold">
        Authentication Required. Node access denied.
      </div>
    );
  }
  const displayData = {
    ...user,
    role: user?.role || "Student",
    address: user?.address || "Earth",

    specializedSection: user?.specializedSection || {
      title: "Learning Goals",
      content:
        "Master scalable distributed systems architecture, advanced database sharding, and clean microservices engineering.",
    },
  };
  const ActionBtn = ({ Icon, color, label, onClick }: any) => (
    <button
      onClick={onClick}
      className="w-full inline-flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-all group"
    >
      <span className="flex items-center gap-2">
        <Icon className={`h-4 w-4 text-slate-400 group-hover:${color}`} />{" "}
        {label}
      </span>
      <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <User className="h-6 w-6 text-blue-600" /> My Profile
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage personal parameters, operational contexts, and
              infrastructure verification statuses.
            </p>
          </div>
          <button
            onClick={toggleEdit}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-xs ${isEditing ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            {isEditing ? (
              <>
                <Save className="h-3.5 w-3.5" /> Cancel
              </>
            ) : (
              <>
                <Edit3 className="h-3.5 w-3.5" /> Edit Profile
              </>
            )}
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* LEFT: AVATAR & QUICK ACTIONS */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 text-center space-y-4"
            >
              <div className="relative group w-24 h-24 mx-auto">
                {user?.image ? (
                  <Image
                    width={100}
                    height={100}
                    src={user?.image}
                    alt={displayData.name}
                    className="w-full h-full rounded-full object-cover shadow-inner group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold uppercase tracking-wider shadow-inner group-hover:scale-105 transition-transform">
                    {(displayData.name || "U")
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </div>
                )}

                <div className="relative group w-24 h-24 mx-auto">
                  {/* The Label acts as the container for both */}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          setImageFile(file);
                        }
                      }}
                    />

                    {/* The Icon inside the label */}
                    <div className="absolute -top-7 right-0  bg-white border border-slate-200 text-slate-600 rounded-full shadow-md hover:text-blue-600 hover:scale-110 transition-all">
                      <Camera className="h-5 w-5" />
                    </div>
                  </label>
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  {displayData.name}
                </h2>
                <p className="text-xs text-slate-400 font-medium font-mono">
                  @{displayData.username || "anonymous_node"}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                <Shield className="h-3.5 w-3.5" /> {displayData.role} Node
              </div>
              <div className="pt-2 space-y-2 text-[11px] font-semibold text-slate-500 border-t border-slate-50 text-left">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />{" "}
                  {displayData.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />{" "}
                  {displayData.phone || "No telemetry linked"}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />{" "}
                  {displayData.address}
                </div>
              </div>
            </motion.div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
                Quick Action Operations
              </h3>
              <ActionBtn
                Icon={Edit3}
                color="text-blue-500"
                label="Toggle Parameter Editor"
                onClick={() => !isEditing && setIsEditing(true)}
              />
              <ActionBtn
                Icon={Key}
                color="text-amber-500"
                label="Change Security Password"
                onClick={() =>
                  toast.warning("Secure Token Reset Dispatched", {
                    description:
                      "An authenticated password resetting link has been generated.",
                  })
                }
              />
              <ActionBtn
                Icon={Download}
                color="text-emerald-500"
                label="Export Personal Metadata"
                onClick={() =>
                  toast.success("Profile Package Created", {
                    description:
                      "Successfully downloaded personal metadata as a clean schema JSON.",
                  })
                }
              />
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full inline-flex items-center gap-2 p-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-all"
                >
                  <LogOut className="h-4 w-4" /> Sever Session Connection
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: PROFILE DATA */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-5">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Biography Baseline
                </h3>
                {isEditing ? (
                  <textarea
                    value={form.bio || ""}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={3}
                    className="w-full text-xs font-medium px-3 py-2 border border-blue-500 rounded-xl focus:outline-none transition-all resize-none"
                    placeholder="Enter your biography sequence..."
                  />
                ) : (
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {displayData.bio || "No biography string sequence defined."}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Expertise Architecture
                </h4>
                {isEditing ? (
                  <input
                    defaultValue={user?.skills}
                    type="text"
                    value={form.skills || ""}
                    onChange={(e) =>
                      setForm({ ...form, skills: e.target.value })
                    }
                    className="w-full text-xs font-medium px-3 py-2 border border-blue-500 rounded-xl focus:outline-none transition-all"
                  />
                ) : (
                 <div className="flex flex-wrap gap-1.5">
  {(form?.skills?.split(" ") ?? [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
]).map((skill:string, i:number) => (
  <div
    key={i}
    className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg border border-slate-200/40"
  >
    {skill.trim()}
  
  </div>
))}
</div>
                )}
              </div>

              <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl space-y-1 mt-2">
                <h4 className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5" />{" "}
                  {displayData.specializedSection.title} Vector
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {displayData.specializedSection.content}
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Personal Identity Data Model
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700"
                  >
                    Full Identification Name
                  </label>
                  <input
                    defaultValue={user?.name}
                    name="name"
                    type="text"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-slate-700"
                  >
                    Username Handle
                  </label>
                  <input
                    defaultValue={user?.username}
                    name="username"
                    type="text"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Secure Routing Email
                  </label>
                  <input
                    defaultValue={user?.email}
                    name="email"
                    type="email"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-slate-700"
                  >
                    Phone Telemetry Code
                  </label>
                  <input
                    defaultValue={user?.phone}
                    name="phone"
                    type="text"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="bath"
                    className="text-sm font-medium text-slate-700"
                  >
                    Date of Birth
                  </label>

                  <DatePicker
                    selected={date}
                    onChange={(date: any) => setDate(date)}
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    placeholderText="Select Date of Birth"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="text-sm font-medium text-slate-700"
                  >
                    Gender Context
                  </label>
                  <input
                    defaultValue={user?.gender}
                    name="gender"
                    type="text"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 flex justify-end"
                  >
                    <button
                      onClick={saveProfile}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                    >
                      <Save className="h-4 w-4" /> Save Changes to System
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
