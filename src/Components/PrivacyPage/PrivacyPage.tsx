"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  BookOpen,
  Database,
  Lock,
  Share2,
  KeyRound,
  Cookie,
  UserCog,
  Mail,
  Globe,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const sections = [
  {
    icon: BookOpen,
    title: "1. Introduction",
    content:
      "CourseHub is a comprehensive Online Course Management Platform designed to connect Students, Instructors, and Administrators. This policy outlines our commitment to your privacy.",
  },
  {
    icon: Database,
    title: "2. Information We Collect",
    content:
      "We collect personal details (Name, Email, Profile Picture), account preferences, course metadata (enrollment, progress, certificates), and technical data (Browser, IP, Session ID) to power your dashboard.",
  },
  {
    icon: KeyRound,
    title: "3. Social Login",
    content:
      "We offer seamless authentication via Google, GitHub, and Facebook. We only store the minimal information authorized by these providers to manage your CourseHub account.",
  },
  {
    icon: UserCog,
    title: "4. How We Use Your Information",
    content:
      "Data is used to facilitate course management, authenticate users, personalize your learning path, prevent fraud, and ensure robust security across our infrastructure.",
  },
  {
    icon: Cookie,
    title: "5. Cookies & Sessions",
    content:
      "We use secure, HTTP-only cookies to manage sessions and login persistence, ensuring your authentication tokens remain protected at all times.",
  },
  {
    icon: Lock,
    title: "6. Data Security",
    content:
      "We prioritize security through HTTPS encryption, strict Role-Based Access Control (RBAC), protected API routes, and rigorous session validation.",
  },
  {
    icon: Share2,
    title: "7. Data Sharing",
    content:
      "CourseHub does not sell or rent your personal data. We only share information with essential service providers necessary for platform operations or when legally required.",
  },
  {
    icon: Clock,
    title: "8. Data Retention",
    content:
      "Your data is retained only for as long as necessary to provide our services and fulfill our legal and operational obligations.",
  },
  {
    icon: AlertCircle,
    title: "9. User Rights",
    content:
      "You maintain full control. You may view/update your profile, change account settings, request data deletion, or contact support to have your personal information removed.",
  },
  {
    icon: FileText,
    title: "10. Children's Privacy & Third Parties",
    content:
      "CourseHub is not intended for children under 13. Please note that third-party authentication services (Google/GitHub/FB) operate under their own independent privacy policies.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto"
      >
        {/* Hero Section */}
        <motion.section variants={item} className="text-center mb-24 relative">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-100 via-white to-white blur-3xl opacity-50" />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex p-5 rounded-3xl bg-blue-600/5 text-blue-600 mb-8 border border-blue-100 shadow-xl shadow-blue-500/5"
          >
            <ShieldCheck size={56} strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Your privacy is important to us. This Privacy Policy explains how
            CourseHub collects, uses, stores, and protects your information
            while you use our platform.
          </p>
          <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
            Last Updated: July 2026
          </div>
        </motion.section>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -4 }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 text-blue-600">
                <section.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {section.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Contact */}
        <motion.section
          variants={item}
          className=" rounded-[2rem] p-10 shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="mailto:topu9872@gmail.com"
              className="flex items-center gap-3 hover:text-blue-400 transition-colors"
            >
              <Mail className="text-blue-500" /> topu9872@gmail.com
            </a>
            <a
              href="https://github.com/topu9872-cpu"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-blue-400 transition-colors"
            >
              <FaGithub className="text-blue-500" /> GitHub
            </a>
            <a
              href="https://topudev.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-blue-400 transition-colors"
            >
              <Globe className="text-blue-500" /> Portfolio
            </a>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
