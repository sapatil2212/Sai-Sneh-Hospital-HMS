"use client";

import { useState } from "react";
import { INSURANCE_PARTNERS } from "@/constants/insurance";
import { Search, ShieldCheck, HelpCircle, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function InsurancePage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"all" | "government" | "tpa">("all");

  const filteredPartners = INSURANCE_PARTNERS.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(search.toLowerCase()) ||
                          partner.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "all" || partner.type === type;
    return matchesSearch && matchesType;
  });

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 1. Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Billing Support</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-905 bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
          Cashless Schemes & Panels
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Sai Sneh Hospital provides cashless facilities for all major Mediclaims, PMC, PMPML, MPKAY, PMT, MPJAY, PMJAY, enabling smooth, stress-free admissions.
        </p>
      </div>

      {/* 2. Interactive Search Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Search & Partners Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-white dark:bg-slate-900 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xs">
            <div className="sm:col-span-7 relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-4" />
              <input
                type="text"
                placeholder="Search TPA or Yojana by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 pl-11 pr-4 py-2 rounded-xl text-xs focus:outline-none focus:border-brand-teal dark:text-white"
              />
            </div>
            <div className="sm:col-span-5">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-brand-teal dark:text-white"
              >
                <option value="all">All Category Panels</option>
                <option value="tpa">Private Mediclaim TPA</option>
                <option value="government">Government Schemes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPartners.map((partner, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-850 p-5 rounded-2xl flex gap-4 items-start shadow-2xs hover:border-brand-teal/20 transition-all"
              >
                <div className="w-12 h-12 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-xl flex items-center justify-center font-extrabold text-brand-teal text-xs shrink-0">
                  {partner.logoText}
                </div>
                <div className="space-y-1">
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="font-bold text-xs text-slate-805 dark:text-slate-100">{partner.name}</span>
                    <span className="text-[8px] font-black uppercase text-brand-teal bg-brand-teal/10 px-1.5 py-0.5 rounded-md">
                      {partner.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed dark:text-slate-400">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xs text-slate-450">No panels found matching your criteria. Contact reception desk to check support.</p>
            </div>
          )}
        </div>

        {/* Right Side: Pre-auth procedure guide */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 p-6 rounded-2xl shadow-premium space-y-6">
          <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <FileText className="w-4.5 h-4.5 text-brand-teal" />
            <span>Cashless Pre-Auth Guide</span>
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3 items-start text-xs">
              <div className="w-5 h-5 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">1</div>
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Submit Documents</span>
                <p className="text-slate-450 mt-0.5">Submit patient Aadhaar card, Active insurance policy card, Doctor referrals, and Diagnostics files at our TPA Desk.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start text-xs">
              <div className="w-5 h-5 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">2</div>
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Desk Pre-Authorization</span>
                <p className="text-slate-450 mt-0.5">Our coordinator fills the pre-auth application form and uploads files to the insurance portal within 2 hours of admission.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start text-xs">
              <div className="w-5 h-5 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">3</div>
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Approval & Discharge</span>
                <p className="text-slate-450 mt-0.5">Upon approval, cashless treatment is provided. Patient covers only non-medical expenses at discharge time.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl flex gap-2.5 items-start text-[10px] text-amber-800 dark:text-amber-400">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Important Notice:</strong> For planned surgeries, please submit pre-auth documents 48 hours prior to admission for faster processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
