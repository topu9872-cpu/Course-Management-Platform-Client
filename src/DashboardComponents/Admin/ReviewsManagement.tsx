"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { 
  Search, Star, Eye, EyeOff, Trash2, X, ChevronLeft, ChevronRight, 
  MessageSquare, Filter, ArrowUpDown, CornerDownRight, AlertTriangle, Calendar
} from "lucide-react";

interface Review {
  id: string;
  studentName: string;
  avatar: string;
  courseTitle: string;
  instructor: string;
  rating: number;
  message: string;
  date: string;
  status: "Published" | "Hidden";
}

const INITIAL_REVIEWS: Review[] = [
  { id: "REV-101", studentName: "Alex Mercer", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces", courseTitle: "Next.js 14 Advanced Architecture", instructor: "Alex River", rating: 5, message: "This course completely transformed how I structure my production apps. The deep dives into the app router caching mechanics are gold mine content.", date: "2026-07-09", status: "Published" },
  { id: "REV-102", studentName: "Elena Rostova", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces", courseTitle: "TypeScript Type-Level Magic", instructor: "Elena Rostova", rating: 4, message: "Excellent material on advanced generics and conditional mapping types. Deducted one star just because some audio levels in module 3 were a bit uneven.", date: "2026-07-05", status: "Published" },
  { id: "REV-103", studentName: "Marcus Vance", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces", courseTitle: "Design Systems with Tailwind CSS", instructor: "Marcus Vance", rating: 5, message: "Beautiful architectural principles for maintaining scaling utility systems. Essential information for teams using Pixso/Figma token variables.", date: "2026-06-28", status: "Published" },
  { id: "REV-104", studentName: "Tariq Mahmood", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces", courseTitle: "Framer Motion Masterclass", instructor: "Alex River", rating: 2, message: "The animations are cool but the pace was way too fast for intermediate developers. Needed more breakdowns on hardware-accelerated orchestration fields.", date: "2026-06-15", status: "Hidden" }
];

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Published" | "Hidden">("All");
  const [sortBy, setSortBy] = useState("Newest");
  
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredAndSortedReviews = useMemo(() => {
    return reviews
      .filter(rev => {
        const matchesSearch = rev.studentName.toLowerCase().includes(search.toLowerCase()) || rev.courseTitle.toLowerCase().includes(search.toLowerCase()) || rev.message.toLowerCase().includes(search.toLowerCase());
        const matchesRating = ratingFilter === "All" || rev.rating === parseInt(ratingFilter);
        const matchesStatus = statusFilter === "All" || rev.status === statusFilter;
        return matchesSearch && matchesRating && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "Newest") return b.date.localeCompare(a.date);
        if (sortBy === "Oldest") return a.date.localeCompare(b.date);
        return b.rating - a.rating;
      });
  }, [reviews, search, ratingFilter, statusFilter, sortBy]);

  const handleToggleVisibility = (id: string) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        const nextStatus = rev.status === "Published" ? "Hidden" : "Published";
        toast.dismiss();
        nextStatus === "Hidden" ? toast.warning("Review hidden successfully.") : toast.success("Review published successfully.");
        return { ...rev, status: nextStatus };
      }
      return rev;
    }));
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      setReviews(prev => prev.filter(rev => rev.id !== deleteTargetId));
      toast.error("Review removed from administration records.");
      setDeleteTargetId(null);
    }
  };

  const renderStars = (rating: number) => Array.from({ length: 5 }).map((_, i) => (
    <Star key={i} className={`h-3 w-3 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
  ));

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <Toaster position="top-right" richColors closeButton />
      
      {/* PAGE HEADER */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">Reviews Management</h1>
          <p className="text-xs text-slate-500">Monitor, moderate, and manage student course reviews.</p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between pt-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input type="text" placeholder="Search evaluation elements..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all" />
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white">
              <Star className="h-3.5 w-3.5 text-slate-400" />
              <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="focus:outline-none bg-transparent font-medium text-slate-700">
                <option value="All">All Stars</option>
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </select>
            </div>

            <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="focus:outline-none bg-transparent font-medium text-slate-700">
                <option value="All">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-2.5 py-1.5 bg-white">
              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="focus:outline-none bg-transparent font-medium text-slate-700">
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Highest Rating">Highest Rating</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MATRIX TABLE CONTAINER */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-medium">
                <th className="p-4 w-[18%]">Student</th>
                <th className="p-4 w-[22%]">Course Unit</th>
                <th className="p-4 w-[12%]">Evaluation</th>
                <th className="p-4 w-[28%]">Feedback Context</th>
                <th className="p-4 w-[10%]">Timestamp</th>
                <th className="p-4 w-[10%]">Visibility</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedReviews.map((rev) => (
                  <motion.tr key={rev.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <img src={rev.avatar} alt={rev.studentName} className="h-7 w-7 rounded-full bg-slate-100 border object-cover" />
                        <span>{rev.studentName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900 truncate max-w-43">{rev.courseTitle}</p>
                      <p className="text-[10px] text-slate-400 font-normal">Instructor: {rev.instructor}</p>
                    </td>
                    <td className="p-4"><div className="flex items-center gap-0.5">{renderStars(rev.rating)}</div></td>
                    <td className="p-4"><p className="text-slate-500 font-normal truncate max-w-60">{rev.message}</p></td>
                    <td className="p-4 font-mono text-slate-400">{rev.date}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${rev.status === 'Published' ? 'text-blue-600' : 'text-slate-400'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${rev.status === 'Published' ? 'bg-blue-600' : 'bg-slate-400'}`} />
                        {rev.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-slate-400">
                        <button onClick={() => { setSelectedReview(rev); toast.info("Review workspace context mounted."); }} className="p-1 hover:bg-slate-100 rounded hover:text-slate-700"><Eye className="h-3.5 w-3.5" /></button>
                        <button onClick={() => handleToggleVisibility(rev.id)} className="p-1 hover:bg-slate-100 rounded hover:text-slate-700">{rev.status === 'Published' ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</button>
                        <button onClick={() => setDeleteTargetId(rev.id)} className="p-1 hover:bg-slate-100 rounded hover:text-rose-600"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* MOBILE STACK */}
        <div className="block md:hidden divide-y divide-slate-100">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedReviews.map((rev) => (
              <motion.div key={`mob-${rev.id}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={rev.avatar} alt={rev.studentName} className="h-6 w-6 rounded-full object-cover" />
                    <h4 className="font-semibold text-slate-900">{rev.studentName}</h4>
                  </div>
                  <span className={`text-[10px] font-bold ${rev.status === 'Published' ? 'text-blue-600' : 'text-slate-400'}`}>{rev.status}</span>
                </div>
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-800 truncate">{rev.courseTitle}</p>
                  <div className="flex items-center gap-0.5">{renderStars(rev.rating)}</div>
                </div>
                <p className="text-slate-500 font-normal line-clamp-2">{rev.message}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[10px]">
                  <span className="text-slate-400 font-mono">{rev.date}</span>
                  <div className="flex gap-2 font-semibold">
                    <button onClick={() => setSelectedReview(rev)} className="text-blue-600">View</button>
                    <button onClick={() => handleToggleVisibility(rev.id)} className="text-slate-600">{rev.status === 'Published' ? 'Hide' : 'Publish'}</button>
                    <button onClick={() => setDeleteTargetId(rev.id)} className="text-rose-600">Delete</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* EMPTY CONTAINER FALLBACK */}
        {filteredAndSortedReviews.length === 0 && (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-2 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400"><MessageSquare className="h-5 w-5" /></div>
            <h3 className="font-semibold text-slate-800">No Reviews Found</h3>
            <p className="text-slate-400 max-w-xs mx-auto">No evaluation items matched your active structural layout state parameters.</p>
          </div>
        )}

        {/* FOOTER PAGINATION CONTROL */}
        {filteredAndSortedReviews.length > 0 && (
          <div className="p-3 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between text-xs font-medium text-slate-500">
            <p className="text-[11px]">Displaying <span className="font-semibold text-slate-800">{filteredAndSortedReviews.length}</span> records</p>
            <div className="flex items-center gap-1.5">
              <button className="p-1 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed"><ChevronLeft className="h-4 w-4" /></button>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md font-semibold text-slate-800 text-[11px]">1</span>
              <button className="p-1 bg-white border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>

      {/* FEEDBACK TIMELINE */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider border-b border-slate-100 pb-2">Recent Feedback Timeline Feed</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {reviews.slice(0, 2).map((rev, idx) => (
            <motion.div key={`feed-${rev.id}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <img src={rev.avatar} alt={rev.studentName} className="h-6 w-6 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{rev.studentName}</h4>
                    <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5"><Calendar className="h-2.5 w-2.5" /> {rev.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 bg-white px-2 py-0.5 border border-slate-100 rounded-md">
                  <span className="text-[10px] font-bold text-slate-800 mr-1">{rev.rating}</span>
                  <Star className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />
                </div>
              </div>
              <div className="space-y-1.5 pl-1 border-l-2 border-slate-100">
                <p className="text-slate-500 italic font-normal line-clamp-2">"{rev.message}"</p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 font-medium"><CornerDownRight className="h-3 w-3" /> {rev.courseTitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DETAILED DRAW SLIDEOVER */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedReview(null)} className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 26, stiffness: 220 }} className="bg-white border-l border-slate-200 max-w-md w-full h-full z-10 p-6 flex flex-col justify-between shadow-2xl relative text-xs">
              <div className="space-y-5 overflow-y-auto pb-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Evaluation Review Profile</h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{selectedReview.id}</p>
                  </div>
                  <button onClick={() => setSelectedReview(null)} className="p-1.5 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
                </div>
                <div className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  <img src={selectedReview.avatar} alt={selectedReview.studentName} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{selectedReview.studentName}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">Timestamp: {selectedReview.date}</p>
                  </div>
                </div>
                <div className="p-3 border border-slate-100 rounded-xl space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Target Course Element</p>
                  <p className="font-semibold text-slate-800">{selectedReview.courseTitle}</p>
                  <p className="text-slate-400 font-normal">Instructor: {selectedReview.instructor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Metrics</p>
                  <div className="flex items-center gap-1">{renderStars(selectedReview.rating)}</div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Critique Payload</p>
                  <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 border border-slate-100 rounded-xl whitespace-pre-wrap">{selectedReview.message}</p>
                </div>
              </div>
              <button onClick={() => setSelectedReview(null)} className="w-full py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-2xs">Close Workspace</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRM DELETION PORTAL */}
      <AnimatePresence>
        {deleteTargetId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTargetId(null)} className="fixed inset-0 bg-slate-900/10 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }} className="bg-white border border-slate-200 max-w-sm w-full rounded-2xl shadow-xl z-10 p-5 space-y-4 text-xs text-center flex flex-col items-center">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl border border-rose-100"><AlertTriangle className="h-5 w-5" /></div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">Purge Critique Record?</h4>
                <p className="text-slate-400 leading-relaxed font-normal mt-1">This operation structuralizes a complete removal of this state array object index safely locally.</p>
              </div>
              <div className="flex gap-2 w-full pt-1">
                <button onClick={() => setDeleteTargetId(null)} className="flex-1 py-1.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50">Cancel</button>
                <button onClick={confirmDelete} className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-2xs">Purge</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewsManagement;