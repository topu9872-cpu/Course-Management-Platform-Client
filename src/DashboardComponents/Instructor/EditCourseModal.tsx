import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Plus, Trash2, Loader2, Layers, 
  Image as ImageIcon, Video, HelpCircle, Rocket,
  ChevronDown, BookOpen, CheckCircle, List
} from 'lucide-react';
import { updateInstructorData } from '@/app/api/ServerAction';
import { Button, Modal, ModalHeader, ModalBody, ModalContent, ModalFooter } from '@heroui/react';
import { ImageBB } from '@/Components/UI/ImageBB';
import Image from 'next/image';

interface EditCourseFormProps {
  course: any;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (formData: any) => Promise<void>;
  onCancel: () => void;
}

export const EditCourseForm: React.FC<EditCourseFormProps> = ({ 
  course, 
  isOpen, 
  onOpenChange, 
  onSave, 
  onCancel 
}) => {
  const [status, setStatus] = useState(course?.status || "Draft");
  const [visibility, setVisibility] = useState(course?.visibility || "Public");
  const [category, setCategory] = useState(course?.category || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(course?.thumbnail || "");
  
  const [outcomes, setOutcomes] = useState<string[]>(course?.outcomes || [""]);
  const [modules, setModules] = useState<string[]>(course?.modules || [""]);
  const [requirements, setRequirements] = useState<string[]>(course?.requirements || [""]);
  const [gallery, setGallery] = useState<{ alt: string; url: string }[]>(course?.gallery || []);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // 1. Keep it as a FormData object
    const rawFormData = new FormData(e.currentTarget);
    
    // 2. Handle your image upload
    let thumbnailUrl = imagePreview;
    if (imageFile) {
      thumbnailUrl = await ImageBB(imageFile);
    }

    // 3. Append the custom state values to the FormData instance
    rawFormData.set('thumbnail', thumbnailUrl);
    rawFormData.set('status', status);
    rawFormData.set('visibility', visibility);
    rawFormData.set('category', category);
    
    // Convert arrays/objects to strings since FormData only accepts strings or Blobs
    rawFormData.set('outcomes', JSON.stringify(outcomes.filter(item => item.trim() !== "")));
    rawFormData.set('modules', JSON.stringify(modules.filter(item => item.trim() !== "")));
    rawFormData.set('requirements', JSON.stringify(requirements.filter(item => item.trim() !== "")));
    rawFormData.set('gallery', JSON.stringify(gallery.filter(item => item.url.trim() !== "")));

    // 4. For your backend Server Action, you can pass either the plain object or the FormData
    // If updateInstructorData expects a plain object, we generate it here:
    const plainObjectProps = {
      ...Object.fromEntries(rawFormData.entries()),
      outcomes: outcomes.filter(item => item.trim() !== ""),
      modules: modules.filter(item => item.trim() !== ""),
      requirements: requirements.filter(item => item.trim() !== ""),
      gallery: gallery.filter(item => item.url.trim() !== "")
    };
    
    await updateInstructorData(course._id, plainObjectProps);
    
    // 5. Pass the valid FormData instance to the parent callback
    await onSave(rawFormData);
    onOpenChange(false);
  } catch (error) {
    console.error("Failed to update course:", error);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Modal className='h-4/5 overflow-y-scroll bg-base-100 '
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="border-b border-slate-100 py-4 px-6 text-xl font-bold text-slate-950">
              Edit Course
            </ModalHeader>

            <ModalBody className="bg-slate-50/50 p-6  text-sm">
              <div className="min-h-screen text-slate-800 antialiased selection:bg-blue-500/10">
                <motion.main
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto pb-20 bg-base-100 px-10"
                >
                  <div className="mb-6 border-b border-slate-200 pb-4 flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Course Architect
                      </h1>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Build and deploy next-generation interactive curricula
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />{" "}
                      Ready to Compose
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* 1. Basic Info */}
                    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                      <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-600" /> Basic Information
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Course Cover Thumbnail
                          </label>

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setImageFile(file);
                              setImagePreview(URL.createObjectURL(file));
                            }}
                          />

                          {imagePreview ? (
                            <div
                              className="relative w-full aspect-21/7 rounded-lg overflow-hidden cursor-pointer border border-slate-200 shadow-inner group"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Image
                                src={imagePreview}
                                alt="Course Thumbnail"
                                fill
                                className="object-cover transition-transform group-hover:scale-[1.01]"
                              />
                              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white/90 blur-backdrop text-slate-800 text-xs px-3 py-1.5 rounded-md font-medium shadow-sm">Change Thumbnail</span>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-lg p-5 flex flex-col items-center justify-center bg-slate-50/50 cursor-pointer transition-colors group aspect-21/7"
                            >
                              <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-600 mb-1" />
                              <span className="font-semibold text-slate-700 text-xs">
                                Upload local high-res image file
                              </span>
                              <span className="text-[11px] text-slate-400 mt-0.5">
                                Supports PNG, JPG, or WEBP formats
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Course Title
                          </label>
                          <input
                            name="title"
                            type="text"
                            className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                            defaultValue={course?.title || "Next.js 14 Production-Ready Masterclass"}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Short Description
                          </label>
                          <input
                            name="shortDescription"
                            type="text"
                            className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                            defaultValue={course?.shortDescription || "Master the App Router, Server Components, advanced authentication, and scalable architecture."}
                          />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Category
                          </label>
                          <div className="relative">
                            <select
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className={`w-full appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-md border transition-all cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                                category
                                  ? "border-blue-500 bg-blue-50/10 text-blue-600"
                                  : "border-slate-200 text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              <option value="" disabled>
                                Select a category...
                              </option>
                              <option value="Mobile Development">Mobile Development</option>
                              <option value="Backend">Backend</option>
                              <option value="Design">Design & UI/UX</option>
                              <option value="Data Science">Data Science</option>
                              <option value="Web Development">Web Development</option>
                            </select>
                            <ChevronDown
                              className={`absolute right-2.5 top-2.5 w-4 h-4 pointer-events-none ${
                                category ? "text-blue-500" : "text-slate-400"
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Language
                          </label>
                          <input
                            name="language"
                            type="text"
                            defaultValue={course?.language || "English"}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Duration (e.g., "10 Weeks")
                          </label>
                          <input
                            name="duration"
                            type="text"
                            defaultValue={course?.duration || "12 Weeks"}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Starts (Date)
                          </label>
                          <input
                            name="startDate"
                            type="date"
                            defaultValue={course?.startDate ? course.startDate.split('T')[0] : ""}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Base Price ($)
                          </label>
                          <input
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            defaultValue={course?.price || 0}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Discount Price ($)
                          </label>
                          <input
                            name="discountPrice"
                            type="number"
                            min="0"
                            step="0.01"
                            defaultValue={course?.discountPrice || 0}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Location / Format
                          </label>
                          <input
                            name="location"
                            type="text"
                            defaultValue={course?.location || "Online"}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">
                            Instructor Name
                          </label>
                          <input
                            name="instructor"
                            type="text"
                            defaultValue={course?.instructor || ""}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                          />
                        </div>
                      </div>
                    </section>

                    {/* 2. Course Overview */}
                    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                      <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600" /> Course Overview
                      </h2>
                      <textarea
                        name="description"
                        rows={4}
                        className="w-full rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-shadow"
                        defaultValue={course?.description || "Dive deep into modern full-stack development. This course bridges the gap between basic tutorials and production-grade applications."}
                      />
                    </section>

                    {/* 3. Learning Outcomes */}
                    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" /> Learning Outcomes
                        </h2>
                        <button
                          type="button"
                          onClick={() => setOutcomes([...outcomes, ""])}
                          className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 inline mr-0.5" /> Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {outcomes.map((outcome, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={outcome}
                              onChange={(e) => {
                                const newOutcomes = [...outcomes];
                                newOutcomes[index] = e.target.value;
                                setOutcomes(newOutcomes);
                              }}
                              placeholder="e.g., Build a complete scalable backend"
                              className="flex-1 rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                            />
                            <button
                              type="button"
                              onClick={() => setOutcomes(outcomes.filter((_, i) => i !== index))}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* 4. Course Modules */}
                    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                          <List className="w-4 h-4 text-blue-600" /> Course Modules
                        </h2>
                        <button
                          type="button"
                          onClick={() => setModules([...modules, ""])}
                          className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 inline mr-0.5" /> Add Module
                        </button>
                      </div>
                      <div className="space-y-2">
                        {modules.map((mod, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={mod}
                              onChange={(e) => {
                                const newModules = [...modules];
                                newModules[index] = e.target.value;
                                setModules(newModules);
                              }}
                              placeholder="Module Title (e.g., Introduction to Next.js)"
                              className="flex-1 rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                            />
                            <button
                              type="button"
                              onClick={() => setModules(modules.filter((_, i) => i !== index))}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* 5. Course Gallery */}
                    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-blue-600" /> Gallery Assets
                        </h2>
                        <button
                          type="button"
                          onClick={() => setGallery([...gallery, { alt: "", url: "" }])}
                          className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 inline mr-0.5" /> Add Image
                        </button>
                      </div>
                      <div className="space-y-2">
                        {gallery.map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200"
                          >
                            <input
                              type="text"
                              value={item.alt}
                              onChange={(e) => {
                                const newGallery = [...gallery];
                                newGallery[index].alt = e.target.value;
                                setGallery(newGallery);
                              }}
                              placeholder="Image Description"
                              className="w-1/3 rounded border border-slate-200 bg-white px-2 py-1.5 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <input
                              type="text"
                              value={item.url}
                              onChange={(e) => {
                                const newGallery = [...gallery];
                                newGallery[index].url = e.target.value;
                                setGallery(newGallery);
                              }}
                              placeholder="Image URL"
                              className="flex-1 rounded border border-slate-200 bg-white px-2 py-1.5 text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => setGallery(gallery.filter((_, i) => i !== index))}
                              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* 6. Requirements */}
                    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-blue-600" /> Requirements
                        </h2>
                        <button
                          type="button"
                          onClick={() => setRequirements([...requirements, ""])}
                          className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 inline mr-0.5" /> Add Requirement
                        </button>
                      </div>
                      <div className="space-y-2">
                        {requirements.map((req, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={req}
                              onChange={(e) => {
                                const newReqs = [...requirements];
                                newReqs[index] = e.target.value;
                                setRequirements(newReqs);
                              }}
                              placeholder="e.g., Basic knowledge of HTML, CSS, and JavaScript"
                              className="flex-1 rounded-md border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
                            />
                            <button
                              type="button"
                              onClick={() => setRequirements(requirements.filter((_, i) => i !== index))}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* 7. Publishing Configuration */}
                    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                      <h2 className="text-base font-semibold text-slate-900 mb-4">
                        Publishing Configurations
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Status Toggle */}
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-2">
                            Status
                          </label>
                          <div className="flex gap-2">
                            {["Draft", "Published"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setStatus(opt)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-all ${
                                  status === opt
                                    ? "border-blue-600 bg-blue-50 text-blue-600"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Visibility Toggle */}
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-2">
                            Visibility
                          </label>
                          <div className="flex gap-2">
                            {["Public", "Private"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setVisibility(opt)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-all ${
                                  visibility === opt
                                    ? "border-blue-600 bg-blue-50 text-blue-600"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </motion.main>
              </div>
            </ModalBody>

            <ModalFooter className="border-t border-slate-100 py-3 px-6 flex justify-end gap-2 bg-white">
              <Button 
                variant="flat" 
                color="danger" 
                onPress={() => {
                  onCancel();
                  onClose();
                }}
                disabled={isSubmitting}
                size="sm"
                className="font-medium"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                color="primary"
                disabled={isSubmitting}
                size="sm"
                className="font-medium bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Rocket className="w-3.5 h-3.5" />
                    Save & Update
                  </>
                )}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};