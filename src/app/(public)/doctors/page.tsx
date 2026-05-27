"use client";

import { useState } from "react";
import Link from "next/link";
import { DOCTORS } from "@/constants/doctors";
import { DEPARTMENTS } from "@/constants/departments";
import { Award, ShieldAlert, Calendar, Check, Search } from "lucide-react";

export default function DoctorsPage() {
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesDept = selectedDept === "all" || doc.departmentId === selectedDept;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Our Staff</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-905 bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
          Consulting Medical Specialists
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Our practitioners bring years of post-qualification training in multi-specialty medicine. Find your specialist doctor and book a timing slot immediately.
        </p>
      </div>

      {/* 2. Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white dark:bg-slate-900 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xs">
        {/* Search */}
        <div className="md:col-span-6 relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-4" />
          <input
            type="text"
            placeholder="Search doctors by name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-11 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="md:col-span-6">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Doctors List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-850 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-premium hover-lift"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                {/* Doctor Portrait */}
                <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-brand-teal/20 shrink-0">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-850 dark:text-white">{doc.name}</h3>
                  <span className="text-[10px] font-black text-brand-teal uppercase tracking-wider block mt-0.5">
                    {doc.specialty.split(",")[0]}
                  </span>
                  <span className="text-xs text-slate-400 block mt-1">{doc.qualification}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {doc.biography}
              </p>

              {/* Attributes badge list */}
              <div className="flex gap-2.5 pt-1 text-xs">
                <span className="flex items-center gap-1 text-slate-500 bg-slate-50 dark:bg-slate-850 px-2.5 py-1 rounded-lg">
                  <Award className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{doc.experience} Yrs Exp</span>
                </span>
                
                {doc.available ? (
                  <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-2.5 py-1 rounded-lg font-semibold">
                    <Check className="w-3 h-3" />
                    <span>Available Today</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-700 bg-red-50 dark:bg-red-950/20 dark:text-red-400 px-2.5 py-1 rounded-lg font-semibold">
                    <ShieldAlert className="w-3 h-3" />
                    <span>On Call</span>
                  </span>
                )}
              </div>
            </div>

            {/* CTA action bar */}
            <div className="p-6 border-t border-slate-50 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-900/10 flex gap-2">
              <Link
                href={`/doctors/${doc.slug}`}
                className="flex-1 text-center py-2.5 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                View Profile
              </Link>
              <Link
                href={`/book-appointment?doc=${doc.slug}`}
                className="flex-1 text-center py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-bold rounded-xl"
              >
                Quick Booking
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-16 space-y-2">
          <p className="text-slate-500 font-medium">No doctors found matching the query.</p>
          <button
            onClick={() => { setSelectedDept("all"); setSearchQuery(""); }}
            className="text-xs text-brand-teal font-bold hover:underline"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
