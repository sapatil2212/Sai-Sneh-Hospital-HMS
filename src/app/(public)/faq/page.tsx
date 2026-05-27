"use client";

import { useState } from "react";
import { FAQS } from "@/constants/faqs";
import { Plus, Minus, HelpCircle, PhoneCall } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<"all" | "general" | "insurance" | "services" | "dialysis">("all");

  const filteredFaqs = selectedCat === "all"
    ? FAQS
    : FAQS.filter(f => f.category === selectedCat);

  return (
    <div className="py-12 md:py-20 font-sans max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Help Desk</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-905 bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
          Common Queries & Policies
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Find information regarding cashless billing panel criteria, visiting restrictions in the ICU, Dialysis schedules, and online appointment slots.
        </p>
      </div>

      {/* Categories filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {(["all", "general", "insurance", "services", "dialysis"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => { setSelectedCat(cat); setActiveFaq(null); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all uppercase tracking-wider ${
              selectedCat === cat
                ? "bg-slate-900 border-slate-900 text-white dark:bg-brand-teal dark:border-brand-teal"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {cat === "all" ? "All FAQs" : cat}
          </button>
        ))}
      </div>

      {/* FAQ list */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = activeFaq === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                className="w-full px-6 py-4.5 text-left flex justify-between items-center font-bold text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
              >
                <span className="pr-4">{faq.question}</span>
                {isOpen ? <Minus className="w-4.5 h-4.5 text-brand-teal" /> : <Plus className="w-4.5 h-4.5 text-slate-400" />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
                  >
                    <p className="px-6 py-5 text-xs text-slate-500 dark:text-slate-405 leading-relaxed bg-slate-50/30 dark:bg-slate-900/10">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Support Card */}
      <div className="bg-gradient-to-r from-brand-teal/5 to-brand-blue/5 p-6 rounded-2xl border border-brand-teal/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex gap-4 items-center">
          <HelpCircle className="w-10 h-10 text-brand-teal shrink-0" />
          <div className="space-y-1">
            <span className="font-bold text-sm text-slate-800 dark:text-white">Still have questions?</span>
            <p className="text-xs text-slate-500">Contact our 24x7 desk or call for instant emergency transport.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Send Message
          </Link>
          <a
            href="tel:08888150101"
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>088881 50101</span>
          </a>
        </div>
      </div>
    </div>
  );
}
