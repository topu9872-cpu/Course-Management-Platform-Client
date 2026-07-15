import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

// Use proper types for numeric values
type EnrollDetails = {
  studentName: string;
  studentId: string;
  studentEmail: string;
  type: "paid" | "subscription";
  price: number;
  courseId: string;
  title: string;
  paymentStatus: string;
  enrollDate: string;
  instructorId: string;
  students: string;
  instructor: string;
  category: string;
  rating: string;
  duration: string;
};

export async function POST(req: NextRequest) {
  try {
    const origin =
      (await headers()).get("origin") || process.env.NEXT_PUBLIC_APP_URL;
    const body: EnrollDetails = await req.json();
    const {
      studentId,
      studentEmail,
      type,
      price,
      courseId,
      title,
      paymentStatus,
      enrollDate,
      studentName,
      students,
      instructorId,
      instructor,
      category,
      rating,
      duration,
    } = body;

    let lineItem: Stripe.Checkout.SessionCreateParams.LineItem;
    let mode: Stripe.Checkout.SessionCreateParams.Mode =
      type === "subscription" ? "subscription" : "payment";

    if (type === "subscription") {
      lineItem = {
        price: String(price),
        quantity: 1,
      };
    } else {
      lineItem = {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(Number(price) * 100),
          product_data: { name: title },
        },
        quantity: 1,
      };
    }

    // ── 2. Create the Stripe Checkout Session ──────────────────────
    const session = await stripe.checkout.sessions.create({
      line_items: [lineItem],
      mode: mode,
      metadata: {
        instructorId,
        students,
        studentId,
        studentEmail,
        type,
        price,
        courseId,
        title,
        paymentStatus,
        enrollDate,
        studentName,
        instructor,
        category,
        rating,
        duration,
      },
      // Pass the session ID to your success page
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-cancelled`,
      customer_email: studentEmail,
      billing_address_collection: "required",
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
