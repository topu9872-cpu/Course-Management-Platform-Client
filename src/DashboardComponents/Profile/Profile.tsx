"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  User, Mail, Phone, MapPin, Calendar, Clock, Key, Download, 
  LogOut, Shield, Award, Edit3, Save, Camera, CheckCircle, 
  Activity, BookOpen, Briefcase, Command, ChevronRight 
} from "lucide-react";

// --- MOCK USER DATA OBJECT ---
const MOCK_USER_DATA = {
  student: {
    role: "Student",
    image:'ifja',
    name: "Topu Ahmed",
    username: "topu_dev",
    email: "topu@example.com",
    phone: "+880 1712-345678",
    dob: "2002-05-14",
    gender: "Male",
    address: "Dhaka, Bangladesh",
    joined: "2025-09-12",
    lastLogin: "2026-07-10 23:45",
    id: "USR-9901-ST",
    bio: "Passionate full-stack developer focusing on the MERN stack and Next.js. Constantly building and exploring interactive UI web dynamics.",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js"],
    specializedSection: { title: "Learning Goals", content: "Master scalable distributed systems architecture, advanced database sharding, and clean microservices engineering." },
    timeline: [
      { action: "Completed Course", text: "Advanced Production Architecture & Next.js", time: "2 hours ago" },
      { action: "Updated Profile", text: "Modified biographical baseline data frameworks", time: "1 day ago" },
      { action: "Logged In", text: "Secure auth handshake established via Windows Client", time: "Yesterday" }
    ]
  },
  instructor: {
    role: "Instructor",
    name: "Dr. Sarah Jenkins",
    image:'jfao,',
    username: "s_jenkins",
    email: "s.jenkins@platform.edu",
    phone: "+1 (555) 234-5678",
    dob: "1988-11-23",
    gender: "Female",
    address: "San Francisco, CA",
    joined: "2024-02-10",
    lastLogin: "2026-07-10 22:15",
    id: "USR-4432-INS",
    bio: "Senior Software Architect and computer science educator. Dedicated to breaking down complex infrastructure concepts into modular visual journeys.",
    skills: ["Microservices", "System Design", "Cloud Native", "Kubernetes", "GraphQL"],
    specializedSection: { title: "Teaching Expertise", content: "Enterprise Application Paradigms, State Synchronizations, and Scalable Database Mechanics." },
    timeline: [
      { action: "Created Course", text: "Node.js Distributed Microservices Core", time: "3 days ago" },
      { action: "Graded Assessments", text: "Reviewed 42 engineering capstone submissions", time: "4 days ago" },
      { action: "Logged In", text: "Established production cluster dashboard connection", time: "Weekly Refresh" }
    ]
  },
  admin: {
    role: "Admin",
    name: "Alex Rivera",
    image:'fjafak',
    username: "alex_sysadmin",
    email: "alex.admin@platform.edu",
    phone: "+1 (555) 987-6543",
    dob: "1984-03-09",
    gender: "Non-binary",
    address: "Austin, TX",
    joined: "2023-01-15",
    lastLogin: "2026-07-10 23:51",
    id: "USR-0012-ADM",
    bio: "Principal Systems Administrator and security manager. Maintaining structural stability, cluster performance parameters, and cryptographic access tokens.",
    skills: ["Security Architecture", "CI/CD Pipelines", "IAM Policies", "Serverless Infrastructure", "Compliance"],
    specializedSection: { title: "Management Role", content: "Global identity access control orchestration, database migration monitoring, and security audit vector logs." },
    timeline: [
      { action: "Managed Users", text: "Granted instructor matrix access tokens to verified nodes", time: "1 hour ago" },
      { action: "System Patch", text: "Deployed Next.js App Router route-cache integrity script", time: "5 hours ago" },
      { action: "Logged In", text: "Root authentication override verified securely", time: "Just now" }
    ]
  }
};

const Profile = () => {
  // Toggle between mock roles to display layout flexibility
  const [activeRole, setActiveRole] = useState<"student" | "instructor" | "admin">("student");
  const [isEditing, setIsEditing] = useState(false);
  const data = MOCK_USER_DATA[activeRole];

  const handleUpdateProfile = () => {
    setIsEditing(false);
    toast.success("Profile Parameters Saved", { description: "Local modification payload synchronized with production database cores successfully." });
  };

  const triggerUploadUI = () => {
    toast.info("Avatar Upload Frame Engaged", { description: "Mock image pipeline triggered. Secure cloud object bucket waiting for binary data upload parameters." });
  };

  const triggerPasswordChange = () => {
    toast.warning("Secure Token Reset Dispatched", { description: "An authenticated password resetting sequence email block link has been generated." });
  };

  const triggerProfileDownload = () => {
    toast.success("Profile Package Created", { description: "Successfully encrypted and downloaded personal metadata profile history as a clean schema JSON file." });
  };

  const triggerLogout = () => {
    toast.error("Session Severed", { description: "Terminated active web token storage parameters. Relocating routing focus back to authentication portal." });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Preview
  const preview = URL.createObjectURL(file);

  // setData({ ...data, image: preview });
};

const fileInputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 antialiased font-sans px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* ROLE SIMULATION BAR */}
      

        {/* PAGE HEADER */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <User className="h-6 w-6 text-blue-600" /> My Profile
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Manage personal parameters, operational contexts, and infrastructure verification statuses.</p>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-xs ${isEditing ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              {isEditing ? <><Save className="h-3.5 w-3.5" /> Cancel</> : <><Edit3 className="h-3.5 w-3.5" /> Edit Profile</>}
            </button>
          </div>
        </motion.div>

        {/* PROFILE SPLIT VIEW WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT: IDENTIFIER AVATAR CARD & QUICK ACTIONS */}
          <div className="space-y-6">
       
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 text-center space-y-4">
  <div className="relative group w-24 h-24 mx-auto">
    {/* Avatar Preview */}
    <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold uppercase tracking-wider shadow-inner group-hover:scale-105 transition-transform duration-300">
      {data.name.split(" ").map(n => n[0]).join("")}
    </div>
    
    {/* Hidden File Input */}
    <input 
      type="file" 
      ref={fileInputRef} 
      className="hidden" 
      accept="image/*"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          triggerUploadUI(); // Your existing upload logic
        }
      }}
    />

    {/* Trigger Button */}
    <button 
      onClick={() => fileInputRef.current?.click()} 
      className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 text-slate-600 rounded-full shadow-md hover:text-blue-600 hover:scale-110 transition-all" 
      title="Upload Metadata Photo"
    >
      <Camera className="h-3.5 w-3.5" />
    </button>
  </div>

  <div className="space-y-1">
    <h2 className="text-base font-bold text-slate-900 tracking-tight">{data.name}</h2>
    <p className="text-xs text-slate-400 font-medium font-mono">@{data.username}</p>
  </div>

  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
    <Shield className="h-3.5 w-3.5" /> {data.role} Node
  </div>

  <div className="pt-2 space-y-2 text-[11px] font-semibold text-slate-500 border-t border-slate-50 text-left">
    <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-400" /> {data.email}</div>
    <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-400" /> {data.phone}</div>
    <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {data.address}</div>
  </div>
</motion.div>

            {/* QUICK ACTIONS INFRASTRUCTURE CONTAINER */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Quick Action Operations</h3>
              <button onClick={() => setIsEditing(!isEditing)} className="w-full inline-flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-all group">
                <span className="flex items-center gap-2"><Edit3 className="h-4 w-4 text-slate-400 group-hover:text-blue-500" /> Toggle Parameter Editor</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </button>
              <button onClick={triggerPasswordChange} className="w-full inline-flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-all group">
                <span className="flex items-center gap-2"><Key className="h-4 w-4 text-slate-400 group-hover:text-amber-500" /> Change Security Password</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </button>
              <button onClick={triggerProfileDownload} className="w-full inline-flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-all group">
                <span className="flex items-center gap-2"><Download className="h-4 w-4 text-slate-400 group-hover:text-emerald-500" /> Export Personal Metadata</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </button>
              <div className="pt-2 border-t border-slate-100">
                <button onClick={triggerLogout} className="w-full inline-flex items-center gap-2 p-2 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold transition-all">
                  <LogOut className="h-4 w-4" /> Sever Session Connection
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: MAIN PROFILE BIOMETRIC DATA & TIMELINE FIELDS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ABOUT & ADAPTIVE ROLE DESCRIPTION OBJECTS */}
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Biography Baseline</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{data.bio || "No biography string sequence defined in current profile parameters."}</p>
              </div>

              {/* Skills and Specialties Array Mapping */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Expertise Architecture</h4>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((skill, i) => (
                    <span key={i} className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg border border-slate-200/40">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Dynamic Role Feature Frame */}
              <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl space-y-1">
                <h4 className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5" /> {data.specializedSection.title} Vector
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{data.specializedSection.content}</p>
              </div>
            </div>

            {/* PERSONAL INFORMATION FORM SCHEMAS (UI INTERACTION SIMULATOR) */}
          <div className="flex flex-col items-center gap-4 pb-5 border-b border-slate-200">
 
    <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Personal Identity Data Model</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Full Identification Name</label>
                  <input type="text" readOnly={!isEditing} defaultValue={data.name} className={`w-full text-xs font-medium px-3 py-2 border rounded-xl focus:outline-none transition-all ${isEditing ? "border-blue-500 bg-white" : "border-slate-200 bg-slate-50/50 text-slate-600"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Username Handle</label>
                  <input type="text" readOnly={!isEditing} defaultValue={data.username} className={`w-full text-xs font-medium px-3 py-2 border rounded-xl focus:outline-none transition-all ${isEditing ? "border-blue-500 bg-white" : "border-slate-200 bg-slate-50/50 text-slate-600"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Secure Routing Email</label>
                  <input type="email" readOnly={!isEditing} defaultValue={data.email} className={`w-full text-xs font-medium px-3 py-2 border rounded-xl focus:outline-none transition-all ${isEditing ? "border-blue-500 bg-white" : "border-slate-200 bg-slate-50/50 text-slate-600"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone Telemetry Code</label>
                  <input type="text" readOnly={!isEditing} defaultValue={data.phone} className={`w-full text-xs font-medium px-3 py-2 border rounded-xl focus:outline-none transition-all ${isEditing ? "border-blue-500 bg-white" : "border-slate-200 bg-slate-50/50 text-slate-600"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date of Birth</label>
                  <input type="date" readOnly={!isEditing} defaultValue={data.dob} className={`w-full text-xs font-medium px-3 py-2 border rounded-xl focus:outline-none transition-all ${isEditing ? "border-blue-500 bg-white" : "border-slate-200 bg-slate-50/50 text-slate-600"}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gender Context</label>
                  <input type="text" readOnly={!isEditing} defaultValue={data.gender} className={`w-full text-xs font-medium px-3 py-2 border rounded-xl focus:outline-none transition-all ${isEditing ? "border-blue-500 bg-white" : "border-slate-200 bg-slate-50/50 text-slate-600"}`} />
                </div>
              </div>
              <AnimatePresence>
                {isEditing && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="pt-2 flex justify-end">
                    <button onClick={handleUpdateProfile} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5">
                      <Save className="h-3.5 w-3.5" /> Save Changes to System
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
</div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;