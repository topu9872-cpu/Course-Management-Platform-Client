"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Clock } from "lucide-react";

import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa6";

import { toast } from "sonner";
import { Subcribeing } from "@/app/api/ServerAction";
import { authClient } from "@/lib/auth-client";

type userInfo = {
  name: string;
  email: string;
};

const Footer: React.FC = () => {
  const socialLinks = [
    { Icon: FaGithub, href: "https://github.com/topu9872-cpu" },
    { Icon: FaLinkedin, href: "www.linkedin.com/in/mehedi-hasan-topu" },
    {
      Icon: FaFacebook,
      href: "https://www.facebook.com/profile.php?id=61578488636020",
    },
  ];

  const platformLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Courses", href: "/courses" },
    { label: "Categories", href: "/categories" },
    { label: "Pricing", href: "/pricing" },
  ];

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubscribe = async () => {
    toast.success("Thanks for subscribing!", {
      style: {
        background: "#ffffff",
        color: "#1e293b",
        border: "1px solid #bfdbfe",
        borderRadius: "12px",
      },
    });
    await Subcribeing({ name: user?.name, email: user?.email } as userInfo);
  };

  return (
    <footer className="relative rounded-t-[3rem] bg-white pt-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-12 border-b border-slate-100 pb-16 lg:grid-cols-2">
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-extrabold tracking-tighter">
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CourseHub
              </span>
            </Link>
            <p className="max-w-md text-slate-600 leading-relaxed">
              Empowering learners worldwide with industry-leading courses. Join
              our mission to democratize education and skill development for
              everyone.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <h4 className="font-semibold text-slate-900">
              Subscribe to our newsletter
            </h4>
            <div className="flex w-full max-w-sm items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 py-3 outline-none text-slate-700"
              />
              <button
                onClick={handleSubscribe}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 hover:scale-105"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 gap-12 py-12 sm:grid-cols-2 lg:grid-cols-4 border-b border-slate-100">
          {/* Platform Links */}

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900">Platform</h3>
            <ul className="space-y-3 text-slate-600">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900">Company</h3>
            <ul className="space-y-3 text-slate-600">
              {["About Us", "Contact", "Blog", "Careers", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900">Support</h3>
            <ul className="space-y-3 text-slate-600">
              {[
                "Help Center",
                "Privacy Policy",
                "Terms & Conditions",
                "Refund Policy",
                "Report an Issue",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-900">Contact</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Mail size={16} /> hello@coursehub.com
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> +1 (555) 000-1234
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> 123 Innovation Drive, Tech City
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} /> Mon - Fri: 9am - 6pm
              </p>
            </div>

            {/* Social Icons Container */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, rotate: 10 }}
                  className="inline-flex items-center justify-center rounded-full bg-slate-100 p-2.5 text-slate-600 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 py-6 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} CourseHub. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-slate-500">
            <Link href="#" className="hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
