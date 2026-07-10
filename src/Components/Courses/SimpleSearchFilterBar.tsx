'use client'
import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function SimpleSearchFilterBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleClear = () => setSearchQuery('');
  
  const handleReset = () => {
    setCategory('');
    setDifficulty('');
    setPrice('');
    setRating('');
    setSortBy('relevant');
  };

  const hasFilters = category || difficulty || price || rating || sortBy !== 'relevant';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 bg-white antialiased">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        
        {/* --- Search Field Container --- */}
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-neutral-400 stroke-[1.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <button className="absolute right-1.5 px-4 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-md transition-colors shadow-sm">
            Search
          </button>
        </div>

        {/* --- Responsive / Mobile Trigger Controls --- */}
        <div className="flex lg:hidden gap-2">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
              showMobileFilters || hasFilters ? 'border-blue-500 bg-blue-50/30 text-blue-600' : 'border-neutral-200 text-neutral-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {hasFilters && '•'}
          </button>
          {hasFilters && (
            <button onClick={handleReset} className="px-3 py-2.5 text-sm font-medium text-neutral-500">
              Reset
            </button>
          )}
        </div>

        {/* --- Desktop Sort Alignment --- */}
        <div className="hidden lg:relative lg:block">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer"
          >
            <option value="relevant">Sort By: Relevance</option>
            <option value="popular">Most Popular</option>
            <option value="rated">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>
      </div>

      {/* --- Filter Grid Dropdowns --- */}
      <div
        className={`lg:flex items-center justify-between mt-3 pt-3 border-t border-neutral-100 transition-all ${
          showMobileFilters ? 'block space-y-2.5 lg:space-y-0' : 'hidden lg:flex'
        }`}
      >
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full lg:w-auto">
          
          {/* Category Filter */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 ${
                category ? 'border-blue-500 bg-blue-50/10 text-blue-600' : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <option value="">All Categories</option>
              <option value="dev">Development</option>
              <option value="design">Design & UI/UX</option>
              <option value="business">Business</option>
            </select>
            <ChevronDown className={`absolute right-2.5 top-3 w-4 h-4 pointer-events-none ${category ? 'text-blue-500' : 'text-neutral-400'}`} />
          </div>

          {/* Difficulty Filter */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 ${
                difficulty ? 'border-blue-500 bg-blue-50/10 text-blue-600' : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <ChevronDown className={`absolute right-2.5 top-3 w-4 h-4 pointer-events-none ${difficulty ? 'text-blue-500' : 'text-neutral-400'}`} />
          </div>

          {/* Price Filter */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 ${
                price ? 'border-blue-500 bg-blue-50/10 text-blue-600' : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <option value="">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            <ChevronDown className={`absolute right-2.5 top-3 w-4 h-4 pointer-events-none ${price ? 'text-blue-500' : 'text-neutral-400'}`} />
          </div>

          {/* Rating Filter */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-lg border transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 ${
                rating ? 'border-blue-500 bg-blue-50/10 text-blue-600' : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <option value="">All Ratings</option>
              <option value="4.5">★ 4.5 & up</option>
              <option value="4.0">★ 4.0 & up</option>
            </select>
            <ChevronDown className={`absolute right-2.5 top-3 w-4 h-4 pointer-events-none ${rating ? 'text-blue-500' : 'text-neutral-400'}`} />
          </div>

          {/* Mobile Fallback Layout for Sorting Element */}
          <div className="relative block lg:hidden pt-2 border-t border-neutral-100 mt-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg focus:outline-none"
            >
              <option value="relevant">Sort By: Relevance</option>
              <option value="popular">Most Popular</option>
              <option value="rated">Highest Rated</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-5 w-4 h-4 text-neutral-400 pointer-events-none" />
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