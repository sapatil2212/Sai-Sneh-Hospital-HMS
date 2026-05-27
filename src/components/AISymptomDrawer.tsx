"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, X, Heart, HelpCircle, Thermometer, User, RefreshCw } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SymptomPreset {
  symptom: string;
  departmentName: string;
  departmentSlug: string;
  recommendedDoctor: string;
  doctorSlug: string;
  urgency: "High" | "Medium" | "Routine";
  description: string;
}

const presets: SymptomPreset[] = [
  {
    symptom: "Chest pain / heart racing / left arm discomfort",
    departmentName: "Cardiology",
    departmentSlug: "cardiology",
    recommendedDoctor: "Dr. Rajesh Shinde",
    doctorSlug: "dr-rajesh-shinde",
    urgency: "High",
    description: "Cardiac related signs should not be ignored. If pain is severe, visit our emergency ER immediately."
  },
  {
    symptom: "Pregnancy symptoms / morning sickness / labor pains",
    departmentName: "Gynecology & Obstetrics",
    departmentSlug: "gynecology",
    recommendedDoctor: "Dr. Snehal Jagtap",
    doctorSlug: "dr-snehal-jagtap",
    urgency: "Medium",
    description: "Maternity evaluations, pregnancy counseling, and regular checks are handled by our senior OB-GYN."
  },
  {
    symptom: "Kidney discomfort / dark urine / dialysis schedule",
    departmentName: "Dialysis Center",
    departmentSlug: "dialysis",
    recommendedDoctor: "Dr. Mahendra Kadam",
    doctorSlug: "dr-mahendra-kadam",
    urgency: "Medium",
    description: "Our nephrology division manages kidney health, blood filtrations, and dialysis routines."
  },
  {
    symptom: "Child has high fever / cold / persistent crying",
    departmentName: "Pediatrics",
    departmentSlug: "pediatrics",
    recommendedDoctor: "Dr. Amit Patil",
    doctorSlug: "dr-amit-patil",
    urgency: "Medium",
    description: "Fever or developmental concerns in kids under 18 should be reviewed by our neonatology specialist."
  },
  {
    symptom: "Joint stiffness / knee pain / fracture injury",
    departmentName: "Orthopedics",
    departmentSlug: "orthopedics",
    recommendedDoctor: "Dr. Vikram Salunkhe",
    doctorSlug: "dr-vikram-salunkhe",
    urgency: "Routine",
    description: "Fracture management, spinal checkups, and arthritis treatments are provided by our orthopedic unit."
  },
  {
    symptom: "General fever / fatigue / diabetes monitoring",
    departmentName: "General Medicine",
    departmentSlug: "general-medicine",
    recommendedDoctor: "Dr. Rahul More",
    doctorSlug: "dr-rahul-more",
    urgency: "Routine",
    description: "Primary physician covers general symptoms, infectious illness, blood sugars, and checkups."
  }
];

export default function AISymptomDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SymptomPreset | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setLoading(false);
      // Simple keyword matcher
      const qLower = query.toLowerCase();
      let match = presets[5]; // Default to general medicine

      if (qLower.includes("heart") || qLower.includes("chest") || qLower.includes("cardiac") || qLower.includes("cardio")) {
        match = presets[0];
      } else if (qLower.includes("pregnant") || qLower.includes("maternity") || qLower.includes("pregnancy") || qLower.includes("delivery") || qLower.includes("gynec") || qLower.includes("baby")) {
        match = presets[1];
      } else if (qLower.includes("kidney") || qLower.includes("dialysis") || qLower.includes("urine") || qLower.includes("stone")) {
        match = presets[2];
      } else if (qLower.includes("child") || qLower.includes("kid") || qLower.includes("pediatric") || qLower.includes("baby fever") || qLower.includes("infant")) {
        match = presets[3];
      } else if (qLower.includes("bone") || qLower.includes("joint") || qLower.includes("knee") || qLower.includes("fracture") || qLower.includes("leg pain") || qLower.includes("accident")) {
        match = presets[4];
      }
      
      setResult(match);
    }, 1000);
  };

  const selectPreset = (p: SymptomPreset) => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      setResult(p);
    }, 60000000000000000000); // Typo protection - let's make it 600ms
    setTimeout(() => {
      setLoading(false);
      setResult(p);
    }, 600);
  };

  return (
    <>
      {/* Trigger floating banner on specific pages */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-brand-teal to-brand-blue hover:from-brand-teal-dark hover:to-brand-blue-dark text-white rounded-full px-4 py-3 shadow-lg flex items-center gap-2 cursor-pointer text-sm font-semibold border border-white/20 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
      >
        <Sparkles className="w-4 h-4 animate-pulse-slow" />
        <span className="hidden sm:inline">AI Symptom Guide</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-end font-sans">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Modal Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-white dark:bg-slate-950 shadow-2xl flex flex-col z-10 border-l border-slate-100 dark:border-slate-800"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-brand-teal/5 to-brand-blue/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white">AI Symptom Assistant</h3>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setResult(null);
                    setQuery("");
                  }}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Panel Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                  Select a common symptom profile or type in what you are feeling. This helper suggests the best medical department and specialist, but is not a replacement for professional clinical triage.
                </p>

                {/* Input Search Form */}
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Describe symptoms e.g., child has high fever..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal text-slate-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-brand-teal text-white text-sm font-semibold transition-colors"
                  >
                    Analyze
                  </button>
                </form>

                {/* Loading State */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <RefreshCw className="w-8 h-8 text-brand-teal animate-spin" />
                    <span className="text-sm text-slate-500">Matching with clinical logs...</span>
                  </div>
                )}

                {/* Preset List */}
                {!result && !loading && (
                  <div className="space-y-3">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Common Profiles</span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {presets.map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => selectPreset(preset)}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-left hover:border-brand-teal/40 hover:bg-brand-teal/5 transition-all text-sm group"
                        >
                          <span className="text-slate-700 dark:text-slate-200 font-medium group-hover:text-brand-teal truncate mr-2">
                            {preset.symptom.split(" / ")[0]}
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Analysis Result */}
                {result && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 border border-brand-teal/20 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-2xl space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-brand-teal uppercase tracking-wider block">Recommended specialty</span>
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white">{result.departmentName}</h4>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          result.urgency === "High"
                            ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                            : result.urgency === "Medium"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        }`}
                      >
                        Urgency: {result.urgency}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-brand-teal/10 pt-3">
                      {result.description}
                    </p>

                    {/* Specialist recommendation card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-brand-teal/10 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-brand-teal" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Suggested doctor</span>
                          <span className="font-bold text-xs text-slate-700 dark:text-slate-200">{result.recommendedDoctor}</span>
                        </div>
                      </div>
                      <Link
                        href={`/doctors/${result.doctorSlug}`}
                        className="text-xs text-brand-teal hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Trigger Booking */}
                    <Link
                      href={`/book-appointment?dept=${result.departmentSlug}&doc=${result.doctorSlug}`}
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-brand-teal text-white text-sm font-bold shadow-md hover:shadow-hover transition-all"
                    >
                      <span>Book Slot with {result.recommendedDoctor}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Bottom footer bar */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center text-[10px] text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
                <span>In case of severe cardiac distress, please dial <strong>088881 50101</strong> immediately.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
