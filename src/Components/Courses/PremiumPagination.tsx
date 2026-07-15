"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function PremiumPagination({
  currentPage,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    // Create a new URLSearchParams instance based on existing params
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "ellipsis-end", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "ellipsis-start",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "ellipsis-start",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis-end",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 bg-white antialiased">
      <nav className="flex items-center justify-between sm:justify-center sm:gap-2 font-sans text-sm select-none">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="h-9 px-3.5 gap-1.5 flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 font-medium transition-all duration-200 shadow-sm hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-45 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center gap-1.5">
          {getPageNumbers().map((page, idx) => {
            if (typeof page === "string") {
              return (
                <div
                  key={`${page}-${idx}`}
                  className="w-9 h-9 flex items-center justify-center text-neutral-400"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 rounded-lg border ${
                  page === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Mobile View */}
        <div className="sm:hidden text-neutral-600">
          Page {currentPage} of {totalPages}
        </div>

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="h-9 px-3.5 gap-1.5 flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 font-medium transition-all duration-200 shadow-sm hover:text-neutral-900 hover:border-neutral-300 disabled:opacity-45 disabled:pointer-events-none"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}