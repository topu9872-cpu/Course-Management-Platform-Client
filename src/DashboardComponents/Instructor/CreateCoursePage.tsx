"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  Plus, Trash2, Image as ImageIcon, Video, BookOpen, 
  Layers, CheckCircle, HelpCircle, Save, Eye, Rocket, Upload, FileText
} from "lucide-react";

const initialForm = {
  title: "Next.js 14 Production-Ready Masterclass",
  shortDescription: "Master the App Router, Server Components, advanced authentication, and scalable architecture.",
  category: "Development",
  level: "Advanced",
  language: "English",
  duration: "24 hours",
  price: "199",
  discountPrice: "149",
  maxStudents: "500",
  fullDescription: "Dive deep into modern full-stack development. This course bridges the gap between basic tutorials and production-grade applications.",
  status: "Draft",
  visibility: "Public",
  isFeatured: true
};

const CreateCoursePage = () => {
  const [basicInfo, setBasicInfo] = useState(initialForm);
  const [outcomes, setOutcomes] = useState<string[]>(["React Server Components (RSC)", "Next.js App Router", "TypeScript"]);
  const [requirements, setRequirements] = useState<string[]>(["Basic JavaScript", "React Fundamentals"]);
  const [gallery, setGallery] = useState<{ url: string; title: string }[]>([
    { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3", title: "Architecture Diagram" }
  ]);
  const [modules, setModules] = useState([
    { id: "m-1", title: "Introduction & System Architecture", lessons: ["Welcome & Course Roadmap", "Understanding Server vs Client Components"] },
    { id: "m-2", title: "Advanced Dynamic Components", lessons: ["Streaming and Suspense Boundaries"] }
  ]);
  
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
      toast.success(`Selected thumbnail: ${file.name}`);
    }
  };

  const updateItem = (setter: any, index: number, value: any, key?: string) => {
    setter((prev: any) => prev.map((item: any, i: number) => {
      if (i !== index) return item;
      return key ? { ...item, [key]: value } : value;
    }));
  };

  const addItem = (setter: any, defaultValue: any, msg: string) => {
    setter((prev: any) => [...prev, defaultValue]);
    toast.success(msg);
  };

  const removeItem = (setter: any, index: number, msg: string, isError = true) => {
    setter((prev: any) => prev.filter((_: any, i: number) => i !== index));
    isError ? toast.error(msg) : toast.success(msg);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased selection:bg-blue-500/10 text-sm">
      <Toaster position="top-right" richColors />
      
      <motion.main initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-4 pt-8 pb-28">
        <div className="mb-8 border-b border-slate-200 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Course Architect</h1>
            <p className="text-xs text-slate-500 mt-0.5">Build and deploy next-generation interactive curricula</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" /> Ready to Compose
          </div>
        </div>

        <div className="space-y-6">
          
          {/* 1. Basic Info */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2"><Layers className="w-4 h-4 text-blue-600" /> Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Native File Input Thumbnail Setup */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">Course Cover Thumbnail</label>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                <div 
                  onClick={() => fileInputRef.current?.click()} 
                  className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-lg p-5 flex flex-col items-center justify-center bg-slate-50/50 cursor-pointer transition-colors group relative overflow-hidden aspect-21/9"
                >
                  {thumbnailPreview ? (
                    <>
                      <img src={thumbnailPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity" />
                      <div className="relative z-10 flex flex-col items-center text-center bg-white/80 p-3 rounded-lg backdrop-blur-xs border border-slate-200/50">
                        <FileText className="w-5 h-5 text-blue-600 mb-1" />
                        <span className="font-semibold text-xs text-slate-800 truncate max-w-xs">{thumbnailFile?.name}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Click to swap selected image asset</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-1 transition-transform group-hover:-translate-y-0.5" />
                      <span className="font-semibold text-slate-700 text-xs">Upload local high-res image file</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">Supports PNG, JPG, or WEBP formats</span>
                    </>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">Course Title</label>
                <input type="text" className="w-full rounded-md border border-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500" value={basicInfo.title} onChange={e => setBasicInfo({...basicInfo, title: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">Short Description</label>
                <input type="text" className="w-full rounded-md border border-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500" value={basicInfo.shortDescription} onChange={e => setBasicInfo({...basicInfo, shortDescription: e.target.value})} />
              </div>
              {[
                { label: "Category", type: "select", options: ["Development", "Design", "Marketing"], key: "category" },
                { label: "Level", type: "select", options: ["Beginner", "Intermediate", "Advanced"], key: "level" },
                { label: "Language", type: "text", key: "language" },
                { label: "Duration", type: "text", key: "duration" },
                { label: "Base Price ($)", type: "number", key: "price" },
                { label: "Discount Price ($)", type: "number", key: "discountPrice" }
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-medium text-slate-500 mb-1">{f.label}</label>
                  {f.type === "select" ? (
                    <select className="w-full rounded-md border border-slate-200 px-3 py-1.5 bg-white focus:outline-none focus:border-blue-500" value={(basicInfo as any)[f.key]} onChange={e => setBasicInfo({...basicInfo, [f.key]: e.target.value})}>
                      {f.options?.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} className="w-full rounded-md border border-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500" value={(basicInfo as any)[f.key]} onChange={e => setBasicInfo({...basicInfo, [f.key]: e.target.value})} />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 2. Course Overview */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-600" /> Course Overview</h2>
            <textarea rows={4} className="w-full rounded-md border border-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500 resize-none" value={basicInfo.fullDescription} onChange={e => setBasicInfo({...basicInfo, fullDescription: e.target.value})} placeholder="Full course scope description..." />
          </section>

          {/* 3. Learning Outcomes */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600" /> Learning Outcomes</h2>
              <button onClick={() => addItem(setOutcomes, "", "Outcome template initialized")} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100"><Plus className="w-3.5 h-3.5 inline mr-0.5" /> Add</button>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {outcomes.map((out, idx) => (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} key={idx} className="flex gap-2">
                    <input type="text" className="w-full rounded-md border border-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500" value={out} onChange={e => updateItem(setOutcomes, idx, e.target.value)} />
                    <button onClick={() => removeItem(setOutcomes, idx, "Outcome slot dropped")} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* 4. Course Modules */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2"><Video className="w-4 h-4 text-blue-600" /> Curriculum Builder</h2>
              <button onClick={() => addItem(setModules, { id: `m-${Date.now()}`, title: "", lessons: [""] }, "Module added")} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100"><Plus className="w-3.5 h-3.5 inline mr-0.5" /> Add Module</button>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {modules.map((mod, mIdx) => (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} key={mod.id} className="border border-slate-200 rounded-lg p-3 bg-slate-50/40">
                    <div className="flex justify-between items-center mb-3">
                      <input type="text" className="bg-transparent border-none font-semibold text-slate-800 focus:outline-none text-sm w-4/5" placeholder={`Module ${mIdx + 1} Title`} value={mod.title} onChange={e => setModules(modules.map(m => m.id === mod.id ? { ...m, title: e.target.value } : m))} />
                      <button onClick={() => setModules(modules.filter(m => m.id !== mod.id))} className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-2 pl-3 border-l border-slate-200">
                      {mod.lessons.map((les, lIdx) => (
                        <div key={lIdx} className="flex gap-2 items-center bg-white p-1 rounded border border-slate-200">
                          <input type="text" className="w-full border-none px-2 py-0.5 text-xs focus:outline-none" value={les} placeholder="Lesson topic" onChange={e => setModules(modules.map(m => m.id === mod.id ? { ...m, lessons: m.lessons.map((l, li) => li === lIdx ? e.target.value : l) } : m))} />
                          <button onClick={() => setModules(modules.map(m => m.id === mod.id ? { ...m, lessons: m.lessons.filter((_, li) => li !== lIdx) } : m))} className="text-slate-400 hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                      <button onClick={() => setModules(modules.map(m => m.id === mod.id ? { ...m, lessons: [...m.lessons, ""] } : m))} className="text-xs text-slate-500 hover:text-blue-600 transition-colors mt-1"><Plus className="w-3 h-3 inline mr-0.5" /> Add Lesson</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* 5. Course Gallery */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-blue-600" /> Gallery Assets</h2>
              <button onClick={() => addItem(setGallery, { url: "", title: "" }, "Gallery asset added")} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100"><Plus className="w-3.5 h-3.5 inline mr-0.5" /> Add Image</button>
            </div>
            <div className="space-y-2">
              {gallery.map((img, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-slate-50/50 p-2 rounded-lg border border-slate-200">
                  <input type="text" className="flex-1 rounded border border-slate-200 bg-white px-2 py-1 text-xs" value={img.title} placeholder="Title" onChange={e => updateItem(setGallery, idx, e.target.value, "title")} />
                  <input type="text" className="flex-1 rounded border border-slate-200 bg-white px-2 py-1 text-xs" value={img.url} placeholder="URL source" onChange={e => updateItem(setGallery, idx, e.target.value, "url")} />
                  <button onClick={() => removeItem(setGallery, idx, "Gallery item removed")} className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Requirements */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2"><HelpCircle className="w-4 h-4 text-blue-600" /> Requirements</h2>
              <button onClick={() => addItem(setRequirements, "", "Requirement item appended")} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100"><Plus className="w-3.5 h-3.5 inline mr-0.5" /> Add Requirement</button>
            </div>
            <div className="space-y-2">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex gap-2">
                  <input type="text" className="w-full rounded-md border border-slate-200 px-3 py-1.5 focus:outline-none focus:border-blue-500" value={req} onChange={e => updateItem(setRequirements, idx, e.target.value)} />
                  <button onClick={() => removeItem(setRequirements, idx, "Requirement slot cleared")} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Publishing Configuration */}
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Publishing Configurations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["status", "visibility"].map((key) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-500 mb-1 capitalize">{key}</label>
                  <div className="flex gap-2">
                    {(key === "status" ? ["Draft", "Published"] : ["Public", "Private"]).map((opt) => (
                      <button key={opt} onClick={() => setBasicInfo({ ...basicInfo, [key]: opt })} className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-all ${(basicInfo as any)[key] === opt ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-200 bg-white"}`}>{opt}</button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2 flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Featured Course Status</span>
                  <span className="text-[11px] text-slate-400">Promote shell inside dashboard carousels.</span>
                </div>
                <button onClick={() => setBasicInfo({ ...basicInfo, isFeatured: !basicInfo.isFeatured })} className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${basicInfo.isFeatured ? "bg-blue-600" : "bg-slate-200"}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${basicInfo.isFeatured ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </motion.main>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 backdrop-blur-md py-3 shadow-lg z-40">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between sm:justify-end gap-3">
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => toast.success("Draft changes successfully cached.")} className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg border border-slate-200 font-medium text-slate-600 hover:bg-slate-50 bg-white">
            <Save className="w-4 h-4" /> Save Draft
          </motion.button>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => toast.info(`Architecture Snapshot: ${modules.length} Modules | ${modules.reduce((a,c) => a + c.lessons.length, 0)} Lessons`)} className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg border border-slate-200 font-medium text-slate-600 hover:bg-slate-50 bg-white">
            <Eye className="w-4 h-4" /> Metadata Stats
          </motion.button>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => toast.success("Platform deployment active! Course published.")} className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-sm shadow-blue-500/10">
            <Rocket className="w-4 h-4" /> Publish Course
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;