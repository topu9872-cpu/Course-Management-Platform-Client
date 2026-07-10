"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  adminNavigation,
  instructorNavigation,
  studentNavigation,
} from "./RouteOfAllRole";
import Link from "next/link";

const user = { role: "admin" ,name:'topu', email:'topu@example.com' };
const navigation =
  user?.role === "admin"
    ? adminNavigation
    : user?.role === "instructor"
      ? instructorNavigation
      : studentNavigation;

export const CourseHubSidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auto-collapse mobile panels when viewport sizes scale past desktop breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarContent = ({ isMobile = false }) => {
    const showExpanded = !isCollapsed || isMobile;
    return (
      <div className="flex h-full flex-col justify-between bg-white px-3 py-4 text-slate-900 select-none">
        <div>
          {/* Header Brand */}
          <div
            className={`flex items-center gap-2.5 px-2 pt-8 pb-5  border-b border-slate-100 ${showExpanded ? "justify-start" : "justify-center"}`}
          >
            <div className="flex h-8 w-8 shrink-0  items-center justify-center rounded-md bg-blue-600 text-white shadow-sm shadow-blue-600/10">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            {showExpanded && (
              <div className="flex flex-col min-w-0">
               
                <span className="truncate text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                  Course Management Platform
                </span>
              </div>
            )}
          </div>

          {/* Nav Items */}
         <div className="mt-5 space-y-5 overflow-y-auto overflow-x-hidden no-scrollbar max-h-[calc(100vh-190px)]">
  <ul className="space-y-1">
    {navigation?.map((item) => {
      const isActive = activeItem === item.id;
      const Icon = item.icon;
      return (
        <li key={item.id}>
          <Link
            href={item.path}
            onClick={() => {
              setActiveItem(item.id);
              if (isMobile) setIsMobileOpen(false);
            }}
            className={`group relative flex w-full items-center rounded-md text-xs transition-all duration-150 outline-none ${
              showExpanded
                ? "gap-2.5 px-2.5 py-2"
                : "justify-center p-2"
            } ${isActive ? "bg-blue-50 font-semibold text-blue-600" : "font-medium text-slate-500 hover:bg-zinc-100 hover:scale-105 hover:text-slate-900"}`}
          >
            {isActive && (
              <motion.div
                layoutId="sidebarActiveIndicator"
                className="absolute left-0 top-1 bottom-1 w-[2.5px] rounded-r bg-blue-600"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 32,
                }}
              />
            )}

            {Icon && (
              <Icon
                className={`h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-[1.02] ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}
              />
            )}

            {showExpanded ? (
              <span className="truncate tracking-wide">
                {item.label}
              </span>
            ) : (
              <div className="absolute left-full top-1/2 ml-3 -translate-y-1/2 scale-95 opacity-0 pointer-events-none rounded border border-slate-200 bg-slate-900 px-2 py-1 text-[10px] font-medium text-white shadow-sm transition-all duration-100 group-hover:scale-100 group-hover:opacity-100 z-50">
                {item.label}
              </div>
            )}
          </Link>
        </li>
      );
    })}
  </ul>
</div>
        </div>

        {/* Footer Settings Block */}
        <div
          className={`pt-3 border-t border-slate-100 flex items-center justify-between rounded-md p-1.5 transition-colors hover:bg-slate-50/60 ${
            showExpanded ? "gap-2" : "justify-center"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative h-7 w-7 shrink-0 rounded-full bg-slate-100 ring-1 ring-slate-200/50">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                alt="Avatar"
                className="h-full w-full rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-1 ring-white" />
            </div>
            {showExpanded && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="truncate text-xs font-semibold tracking-tight text-slate-800">
                   {user?.name}
                  </span>
                  <span className="inline-flex items-center rounded bg-blue-50 px-1 py-0.5 text-[9px] font-medium text-blue-600 border border-blue-100/30 uppercase tracking-wide">
                    {user?.role}
                  </span>
                </div>
                <span className="truncate text-[10px] text-slate-400">
                 {user?.email}
                </span>
              </div>
            )}
          </div>
          {showExpanded && (
            <button
              className="group p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors outline-none"
              aria-label="Logout"
            >
              <LogOut className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`,
        }}
      />

      {/* 
        FIXED CONTAINER FOR MOBILE MENU BUTTON
        Hides completely on desktop (lg:hidden).
        Uses screen-level viewport tracking (`fixed top-4 left-4`) and high z-index stack rules to guarantee visibility.
      */}
  <div className="fixed top-18 right-8 z-50 lg:hidden block">
  <button
    onClick={() => setIsMobileOpen(true)}
    className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-700 shadow-md transition-all active:scale-95 focus:outline-none"
    aria-label="Open sidebar drawer"
  >
    <Menu className="h-5.5 w-5.5" />
  </button>
</div>

      {/* Mobile-Only Drawer Pop-Out */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Dark Mask Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="absolute inset-0 bg-slate-900"
            />
            {/* Interactive Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              className="absolute bottom-0 top-0 left-0 w-full max-w-67 bg-white flex flex-col shadow-2xl"
            >
              {/* Internal X Button container inside menu drawer layout */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute right-3 top-4 rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent isMobile />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      
      <motion.aside
        animate={{
          width: isCollapsed ? 72 : 280,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 24,
        }}
        className="group/sidebar fixed left-0 top-0 bottom-0 z-40 hidden border-r border-slate-200 bg-white shadow-sm lg:flex"
      >
        <SidebarContent />

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-6 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-all duration-200 hover:border-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:opacity-0 lg:group-hover/sidebar:opacity-100 lg:focus:opacity-100"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </motion.aside>

      {/* Desktop Spacer */}
      <div
        className="hidden shrink-0 transition-all duration-300 lg:block"
        style={{
          width: isCollapsed ? 72 : 280,
        }}
      />
    </>
  );
};

export default CourseHubSidebar