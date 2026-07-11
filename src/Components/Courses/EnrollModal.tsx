"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function EnrollButton({detailsData}:any) {
  const [open, setOpen] = useState(false);

  const handleEnroll = () => {
    // TODO: Stripe Checkout / API call
    console.log("Enrolled");

    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-blue-900 text-white font-bold text-sm tracking-wide py-4 rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group shadow-md active:scale-[0.99]"
      >
        Enroll In Program Now
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-neutral-900">
              Confirm Enrollment
            </h2>

            <p className="mt-3 text-neutral-600">
              You're about to enroll in this program. After continuing,
              you'll be redirected to the secure payment page.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-neutral-300 px-5 py-2.5 font-medium hover:bg-neutral-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleEnroll}
                className="rounded-xl bg-blue-900 px-5 py-2.5 text-white font-semibold hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}