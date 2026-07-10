'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  totalItems?: number;
  itemsPerPage?: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

export default function PremiumPagination({
  totalItems = 100,
  itemsPerPage = 10,
  initialPage = 1,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      if (onPageChange) onPageChange(page);
    }
  };

  // Generate pagination layout logic (Stripe/Linear style windowing)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, 'ellipsis-end', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, 'ellipsis-start', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'ellipsis-start', currentPage - 1, currentPage, currentPage + 1, 'ellipsis-end', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 bg-white antialiased">
      <nav className="flex items-center justify-between sm:justify-center sm:gap-2 font-sans text-sm select-none">
        
        {/* --- Previous Button --- */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="h-9 px-3.5 gap-1.5 flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 font-medium transition-all duration-200 shadow-sm hover:text-neutral-900 hover:border-neutral-300 hover:-translate-y-0.5 hover:shadow active:translate-y-0 active:scale-[0.98] disabled:opacity-45 disabled:pointer-events-none disabled:transform-none disabled:shadow-sm"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* --- Desktop Page Numbers Navigation --- */}
        <div className="hidden sm:flex items-center gap-1.5">
          {getPageNumbers().map((page, idx) => {
            if (typeof page === 'string') {
              return (
                <div 
                  key={`${page}-${idx}`} 
                  className="w-9 h-9 flex items-center justify-center text-neutral-400"
                >
                  <MoreHorizontal className="w-4 h-4 stroke-[1.5]" />
                </div>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-all duration-200 active:scale-[0.95] ${
                  isActive
                    ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-sm font-semibold pointer-events-none'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 hover:shadow hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* --- Mobile Visual Context Indicator --- */}
        <div className="sm:hidden text-xs font-medium text-neutral-500 tracking-wide px-2">
          Page {currentPage} of {totalPages}
        </div>

        {/* --- Next Button --- */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="h-9 px-3.5 gap-1.5 flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 font-medium transition-all duration-200 shadow-sm hover:text-neutral-900 hover:border-neutral-300 hover:-translate-y-0.5 hover:shadow active:translate-y-0 active:scale-[0.98] disabled:opacity-45 disabled:pointer-events-none disabled:transform-none disabled:shadow-sm"
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4 stroke-[1.5]" />
        </button>

      </nav>
    </div>
  );
}