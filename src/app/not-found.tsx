"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <SearchX className="h-10 w-10 text-blue-600" />
        </div>

        <h1 className="mt-6 text-5xl font-bold text-slate-800">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-slate-700">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-500">
          Sorry, the page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}