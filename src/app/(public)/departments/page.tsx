"use client";

import { useState } from "react";
import Link from "next/link";
import { DEPARTMENTS } from "@/constants/departments";
import { ChevronRight, Calendar, Stethoscope, HeartPulse, Sparkles } from "lucide-react";

export default function DepartmentsPage() {
  const [filter, setFilter] = useState<"all" | "critical" | "outpatient" | "maternity">("all");

  const criticalSlugs = ["icu", "dialysis", "emergency-care"];
  const maternitySlugs = ["gynecology", "pediatrics"];

  const filteredDepts = DEPARTMENTS.filter((dept) => {
    if (filter === "critical") return criticalSlugs.includes(dept.slug);
    if (filter === "maternity") return maternitySlugs.includes(dept.slug);
    if (filter === "outpatient") return !criticalSlugs.includes(dept.slug) && !maternitySlugs.includes(dept.slug);
    return true;
  });

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Specialties</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Our Specialities & Facilities
        </h1>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
          Comprehensive primary, surgical, emergency, and specialty therapies under one roof. Our medical units are equipped with standard clinical devices and staffed with dedicated consulting practitioners.
        </p>
      </div>

      {/* 2. Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {(["all", "critical", "maternity", "outpatient"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all uppercase tracking-wider ${
              filter === type
                ? "bg-slate-900 border-slate-900 text-white dark:bg-brand-teal dark:border-brand-teal"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {type === "all" ? "All Specialties" : type === "critical" ? "24x7 Critical Care" : type === "maternity" ? "Maternity & Children" : "General OPD"}
          </button>
        ))}
      </div>

      {/* 3. Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover-lift group"
          >
            <div>
              {/* Image Banner */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20" />
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-lg text-slate-850 dark:text-white flex items-center gap-2">
                  <span>{dept.name}</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                  {dept.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 border-t border-slate-50 dark:border-slate-800/60 mt-4 flex items-center justify-between">
              <Link
                href={`/book-appointment?dept=${dept.slug}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-teal/5 text-brand-teal dark:bg-brand-teal/15 dark:text-brand-teal hover:bg-brand-teal hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Slot</span>
              </Link>
              
              {criticalSlugs.includes(dept.slug) && (
                <span className="text-[9px] font-black uppercase text-emergency-red bg-emergency-red/10 border border-emergency-red/20 px-2 py-0.5 rounded-md animate-pulse">
                  24x7 Open
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
