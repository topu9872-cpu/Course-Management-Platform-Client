"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  Search, Plus, Folder, Code, Briefcase, Landmark, Flame, 
  Edit3, EyeOff, Eye, Trash2, X, ChevronLeft, ChevronRight, LayoutGrid, AlertCircle
} from "lucide-react";

// --- MOCK INTERFACES & CONTEXTS ---
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  totalCourses: number;
  createdDate: string;
  status: "Active" | "Hidden";
  iconName: "Code" | "Briefcase" | "Landmark" | "Flame" | "Folder";
}

const INITIAL_CATEGORIES: Category[] = [
  { id: "CAT-001", name: "Engineering & Architecture", slug: "engineering-architecture", description: "Deep architectural deep-dives including Next.js Core paradigms, microservices setups, and React runtime rendering engines.", totalCourses: 142, createdDate: "2025-08-12", status: "Active", iconName: "Code" },
  { id: "CAT-002", name: "Business Systems & Scaling", slug: "business-systems", description: "Strategic telemetry metrics tracking, workflow automation blueprints, and resource orchestrations.", totalCourses: 89, createdDate: "2025-09-01", status: "Active", iconName: "Briefcase" },
  { id: "CAT-003", name: "Data Sharding Matrices", slug: "data-sharding", description: "Advanced relational paradigms, vector spatial indices parsing, and transactional ledger compliance rules.", totalCourses: 64, createdDate: "2025-11-15", status: "Hidden", iconName: "Landmark" },
  { id: "CAT-004", name: "UI/UX & Semantic Layouts", slug: "ui-ux-design", description: "Design systems token matrices engineering, Tailwind workflows, accessibility constraints, and Pixso pipelines.", totalCourses: 112, createdDate: "2026-01-20", status: "Active", iconName: "Flame" }
];

const ICON_MAP = {
  Code: Code,
  Briefcase: Briefcase,
  Landmark: Landmark,
  Flame: Flame,
  Folder: Folder
};

const CategoriesManagement = () => {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [search, setSearch] = useState("");
  const [selectedPreview, setSelectedPreview] = useState<Category | null>(INITIAL_CATEGORIES[0]);
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });
  
  // Delete Confirmation states
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // --- FILTERING LOGIC ---
  const filteredCategories = useMemo(() => {
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(search.toLowerCase()) || 
      cat.slug.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  // --- ACTIONS (FIXED SIDE-EFFECTS INSIDE REACTION UPDATERS) ---
// --- ACTIONS ---
const handleToggleVisibility = (id: string) => {
  setCategories(prev => prev.map(cat => {
    if (cat.id === id) {
      // Explicitly type nextStatus so TypeScript knows it's a valid Category["status"]
      const nextStatus: "Active" | "Hidden" = cat.status === "Active" ? "Hidden" : "Active";
      
      toast.dismiss();
      if (nextStatus === "Hidden") {
        toast.warning("Category hidden successfully.");
      } else {
        toast.success("Category is now visible.");
      }
      
      const updated: Category = { ...cat, status: nextStatus };
      if (selectedPreview?.id === id) setSelectedPreview(updated);
      return updated;
    }
    return cat;
  }));
};

  const openFormModal = (category: Category | null = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, slug: category.slug, description: category.description });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", slug: "", description: "" });
    }
    setIsFormModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.slug.trim()) {
      toast.error("Please complete all mandatory fields.");
      return;
    }

    if (editingCategory) {
      const updatedCategories = categories.map(cat => cat.id === editingCategory.id ? {
        ...cat,
        name: formData.name,
        slug: formData.slug,
        description: formData.description
      } : cat);

      setCategories(updatedCategories);
      toast.success("Category updated successfully.");
      setIsFormModalOpen(false);

      const updatedTarget = updatedCategories.find(c => c.id === editingCategory.id);
      if (updatedTarget) setSelectedPreview(updatedTarget);
    } else {
      const newId = `CAT-00${categories.length + 1}`;
      const newCat: Category = {
        id: newId,
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        totalCourses: 0,
        createdDate: new Date().toISOString().split("T")[0],
        status: "Active",
        iconName: "Folder"
      };
      setCategories([...categories, newCat]);
      setSelectedPreview(newCat);
      toast.success("Category added successfully.");
      setIsFormModalOpen(false);
    }
  };

  const triggerDeleteUi = (id: string) => {
    setDeleteTargetId(id);
  };

  const confirmDeleteUi = () => {
    if (!deleteTargetId) return;
    
    const updatedCategories = categories.filter(cat => cat.id !== deleteTargetId);
    setCategories(updatedCategories);
    toast.error("Category deleted successfully.");
    
    if (selectedPreview?.id === deleteTargetId) {
      setSelectedPreview(updatedCategories[0] || null);
    }
    setDeleteTargetId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 antialiased font-sans px-4 py-6 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PAGE HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -6 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-2xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Categories</h1>
            <p className="text-xs text-slate-500 mt-0.5">Organize structural course taxonomies, configure localized routing slug keys, and map curriculum nodes.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input 
                type="text" placeholder="Search catalog structures..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
            <button 
              onClick={() => openFormModal(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-2xs"
            >
              <Plus className="h-3.5 w-3.5" /> Add Category
            </button>
          </div>
        </motion.div>

        {/* WORKSPACE DIVISION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* CATEGORIES TABLE & MOBILE CARDS LIST */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
            
            {/* DESKTOP MATRIX GRID */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-4">Taxonomy Space</th>
                    <th className="p-4">Route Reference (Slug)</th>
                    <th className="p-4">Telemetry Load</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredCategories.map((cat) => {
                    const TargetIcon = ICON_MAP[cat.iconName] || Folder;
                    return (
                      <tr 
                        key={cat.id} 
                        onClick={() => setSelectedPreview(cat)}
                        className={`hover:bg-slate-50/50 cursor-pointer transition-all ${selectedPreview?.id === cat.id ? "bg-blue-50/40 border-l-2 border-l-blue-600" : ""}`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                              <TargetIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{cat.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{cat.id} · Created {cat.createdDate}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-500 font-mono">{cat.slug}</td>
                        <td className="p-4 font-mono font-semibold text-slate-700">{cat.totalCourses} modules</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                            <span className={`w-1 h-1 rounded-full ${cat.status === 'Active' ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                            {cat.status}
                          </span>
                        </td>
                        <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => openFormModal(cat)} className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors" title="Edit Metadata"><Edit3 className="h-3.5 w-3.5" /></button>
                            <button onClick={() => handleToggleVisibility(cat.id)} className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors" title={cat.status === 'Active' ? "Hide Category" : "Unhide Category"}>
                              {cat.status === 'Active' ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </button>
                            <button onClick={() => triggerDeleteUi(cat.id)} className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors" title="Purge Taxonomy Unit"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE INTERFACE STACKED LIST */}
            <div className="block md:hidden divide-y divide-slate-100">
              {filteredCategories.map((cat) => {
                const TargetIcon = ICON_MAP[cat.iconName] || Folder;
                return (
                  <div 
                    key={cat.id} 
                    onClick={() => setSelectedPreview(cat)}
                    className={`p-4 space-y-2 cursor-pointer ${selectedPreview?.id === cat.id ? "bg-blue-50/30" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-slate-100 rounded text-slate-500">
                          <TargetIcon className="h-3.5 w-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">{cat.name}</h4>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${cat.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{cat.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono px-0.5">{cat.slug} · {cat.totalCourses} Modules</p>
                    
                    <div className="flex items-center justify-end gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => openFormModal(cat)} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded text-[10px] font-medium flex items-center gap-1"><Edit3 className="h-2.5 w-2.5" /> Edit</button>
                      <button onClick={() => handleToggleVisibility(cat.id)} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded text-[10px] font-medium">{cat.status === 'Active' ? 'Hide' : 'Show'}</button>
                      <button onClick={() => triggerDeleteUi(cat.id)} className="p-1 bg-rose-50 text-rose-600 rounded border border-rose-100"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* EMPTY STATE ARCHITECTURE CARD */}
            {filteredCategories.length === 0 && (
              <div className="p-12 text-center flex flex-col items-center justify-center space-y-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400">
                  <LayoutGrid className="h-6 w-6" />
                </div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">No Categories Found</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">No domain hierarchies correspond to your current lookup variables.</p>
                <button onClick={() => openFormModal(null)} className="mt-2 text-[11px] font-bold text-blue-600 hover:underline">Instantiate First Dimension</button>
              </div>
            )}

            {/* PAGINATION PANEL FOOTER */}
            {filteredCategories.length > 0 && (
              <div className="p-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                <p className="text-[11px]">Subset maps <span className="font-bold text-slate-800">{filteredCategories.length}</span> of <span className="font-bold text-slate-800">{categories.length}</span> entries</p>
                <div className="flex items-center gap-1.5">
                  <button className="p-1 bg-white border border-slate-200/60 rounded-lg text-slate-400 cursor-not-allowed"><ChevronLeft className="h-3.5 w-3.5" /></button>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md font-bold text-slate-800 text-[11px]">1</span>
                  <button className="p-1 bg-white border border-slate-200/60 rounded-lg text-slate-400 cursor-not-allowed"><ChevronRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            )}
          </div>

          {/* SIDE PREVIEW INSPECTION DISPLAY PANEL */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Taxonomy Scope Preview</h3>
            {selectedPreview ? (
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    {React.createElement(ICON_MAP[selectedPreview.iconName] || Folder, { className: "h-5 w-5" })}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{selectedPreview.name}</h4>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">{selectedPreview.slug}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Functional Descriptor</p>
                  <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">{selectedPreview.description || "No localized documentation signature available for this category partition."}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Assigned Allocation</p>
                    <p className="font-mono text-slate-800 font-bold mt-0.5">{selectedPreview.totalCourses} Modules</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Routing Vector</p>
                    <p className={`text-[10px] font-bold mt-0.5 ${selectedPreview.status === 'Active' ? 'text-emerald-700' : 'text-slate-500'}`}>{selectedPreview.status}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic py-4 text-center">Select an array object node to mount telemetry values.</p>
            )}
          </div>

        </div>

      </div>

      {/* MUTATION MODAL DIALOG: ADD/EDIT CATEGORY */}
      <AnimatePresence>
        {isFormModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFormModalOpen(false)} className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs" />
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white border border-slate-200 max-w-md w-full rounded-2xl shadow-xl z-10 p-5 space-y-4 text-xs relative"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">{editingCategory ? "Mutate Category Definition" : "Instantiate Category Unit"}</h3>
                <button onClick={() => setIsFormModalOpen(false)} className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
              </div>

              <form onSubmit={handleSaveCategory} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category Name *</label>
                  <input 
                    type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Reactive Cloud Computations"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50 text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Routing Key Slug *</label>
                  <input 
                    type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., reactive-cloud-computations"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50 text-slate-800 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Taxonomy Documentation / Description</label>
                  <textarea 
                    rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Specify target node operational bounds and module groupings..."
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-slate-50/50 text-slate-700 font-medium leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button type="button" onClick={() => setIsFormModalOpen(false)} className="px-3 py-1.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors">Abort</button>
                  <button type="submit" className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-2xs">Commit Configuration</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CRITICAL ACTIONS: DELETION CONSTRAINTS CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTargetId(null)} className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs" />
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white border border-slate-200 max-w-sm w-full rounded-2xl shadow-xl z-10 p-5 space-y-4 text-xs text-center flex flex-col items-center"
            >
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Purge Domain Partition?</h4>
                <p className="text-slate-400 max-w-xs leading-relaxed">This action deletes the target taxonomy node reference locally. Downstream indexing vectors may encounter exceptions.</p>
              </div>
              <div className="flex items-center justify-center gap-2 w-full pt-1">
                <button onClick={() => setDeleteTargetId(null)} className="flex-1 py-1.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors">Retain Node</button>
                <button onClick={confirmDeleteUi} className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-2xs">Confirm Purge</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoriesManagement;