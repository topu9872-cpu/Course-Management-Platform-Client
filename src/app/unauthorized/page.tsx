"use client";

import Link from "next/link";
import { ShieldX } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <ShieldX className="h-10 w-10 text-blue-600" />
        </div>

        <h1 className="mt-6 text-4xl font-bold text-slate-800">
          403
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-slate-700">
          Access Denied
        </h2>

        <p className="mt-3 text-slate-500">
          Sorry, you don't have permission to access this page.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>

          <Link href="/login" className="btn btn-outline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;