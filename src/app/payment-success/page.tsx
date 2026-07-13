import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { CheckCircle2, Package, CreditCard, ChevronRight } from "lucide-react";
import { updateEnrollmentPost } from "../api/ServerAction";

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;

  // 1. Validate session_id exists
  if (!session_id) {
    return
    // redirect("/");
  }

  // 2. Fetch the session from Stripe
  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent", "customer_details"],
    });
  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    return <div>Error loading payment details. Please contact support.</div>;
  }

  // 3. Logic: Ensure payment was actually successful
  if (session.payment_status !== "paid") {
     return <div>Payment not completed.</div>;
  }

if(!session.metadata){
  return
}
if(session_id){
await updateEnrollmentPost(
  session.metadata.courseId,
  session.metadata
);}
 

  return (
    <div className="min-h-screen bg-[#F7F7FB] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="bg-emerald-50 py-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Payment Successful!</h1>
        </div>

        <div className="p-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-sm text-slate-500 flex items-center gap-2">
                <Package className="w-4 h-4" /> Course
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {session.metadata?.title || "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-sm text-slate-500 flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Amount Paid
              </span>
              <span className="text-sm font-semibold text-slate-900">
                ${((session.amount_total || 0) / 100).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3.5 rounded-xl transition-all"
            >
              Go to Home <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}