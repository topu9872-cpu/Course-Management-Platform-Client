"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";

const ForbiddenPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <LockKeyhole className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="mt-6 text-5xl font-bold text-slate-800">
          403
        </h1>

        <h2 className="mt-2 text-2xl font-semibold text-slate-700">
          Forbidden
        </h2>

        <p className="mt-3 text-slate-500">
          You don't have permission to access this resource.
          Please contact the administrator if you believe this is a mistake.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>

          <Link href="/dashboard" className="btn btn-outline">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;