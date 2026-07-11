"use client";
import React, { useState } from "react";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SimpleSearchFilterBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const router = useRouter();
  const handleClear = () => setSearchQuery("");

  const handleReset = () => {
    setCategory("");
    setDifficulty("");
    setPrice("");
    setRating("");
  };

  const hasFilters = category || difficulty || price || rating;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());



  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 bg-white antialiased">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* --- Search Field Container --- */}
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-neutral-400 stroke-[1.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search courses, instructors, or categories..."
            className="w-full pl-12 pr-28 py-3 text-sm text-neutral-900 bg-white border border-neutral-200 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500"
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-20 p-1 text-neutral-400 hover:text-neutral-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={()=>{
            params.set('search',searchQuery)
            router.push(`/courses?${params.toString()}`)
          }} className="absolute right-0 px-4 py-3 font-bold text-sm  text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md transition-colors shadow-sm">
            Search
          </button>
        </div>

        {/* --- Responsive / Mobile Trigger Controls --- */}
        <div className="flex lg:hidden gap-2">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
              showMobileFilters || hasFilters
                ? "border-blue-500 bg-blue-50/30 text-blue-600"
                : "border-neutral-200 text-neutral-700"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {hasFilters && "•"}
          </button>
          {hasFilters && (
            <button
              onClick={handleReset}
              className="px-3 py-2.5 text-sm font-medium text-neutral-500"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* --- Filter Grid Dropdowns --- */}
      <div
        className={`lg:flex items-center justify-between mt-3 pt-3 border-t border-neutral-100 transition-all ${
          showMobileFilters
            ? "block space-y-2.5 lg:space-y-0"
            : "hidden lg:flex"
        }`}
      >
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full lg:w-auto">
          {/* Category Filter */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={category}
              onChange={(e) => {
                const value = e.target.value;
                setCategory(value);
                params.set("category", value);
                router.push(`/courses?${params.toString()}`);
              }}
              className={`w-full appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 ${
                category
                  ? "border-blue-500 bg-blue-50/10 text-blue-600"
                  : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <option value="">All Categories</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design & UI/UX</option>
              <option value="Data Science">Data Science</option>
              <option value="Web Development">Web Development</option>
            </select>
            <ChevronDown
              className={`absolute right-2.5 top-3 w-4 h-4 pointer-events-none ${category ? "text-blue-500" : "text-neutral-400"}`}
            />
          </div>

          {/* Difficulty Filter */}

          {/* Price Filter */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                setPrice(value);
                params.set("price", value);
                router.push(`/courses?${params.toString()}`);
              }}
              className={`w-full appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 ${
                price
                  ? "border-blue-500 bg-blue-50/10 text-blue-600"
                  : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <option value="">All Prices</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
            </select>
            <ChevronDown
              className={`absolute right-2.5 top-3 w-4 h-4 pointer-events-none ${price ? "text-blue-500" : "text-neutral-400"}`}
            />
          </div>

          {/* Rating Filter */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={rating}
              onChange={(e) => {
                const value = e.target.value;
                setRating(value);
                params.set("rating", value);
                router.push(`/courses?${params.toString()}`);
              }}
              className={`w-full appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 ${
                rating
                  ? "border-blue-500 bg-blue-50/10 text-blue-600"
                  : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
              }`}
            >
              <option value="">All Ratings</option>
              <option value="3">★ 3 & up</option>
              <option value="3.5">★ 3.5 & up</option>
              <option value="4">★ 4 & up</option>
              <option value="4.5">★ 4.5 & up</option>
              <option value="5.0">★ 5.0 </option>
            </select>
            <ChevronDown
              className={`absolute right-2.5 top-3 w-4 h-4 pointer-events-none ${rating ? "text-blue-500" : "text-neutral-400"}`}
            />
          </div>
        </div>

        {/* --- Reset Action Anchor --- */}
        {hasFilters && (
          <button
            onClick={handleReset}
            className="hidden lg:inline-block text-xs font-semibold tracking-wide text-neutral-400 hover:text-blue-600 transition-colors uppercase pl-4 border-l border-neutral-200"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
