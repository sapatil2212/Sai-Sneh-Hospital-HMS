"use client";

import { useState } from "react";

interface GalleryItem {
  title: string;
  category: "wards" | "facilities" | "general";
  image: string;
  desc: string;
}

const items: GalleryItem[] = [
  {
    title: "Intensive Care Unit (ICU)",
    category: "wards",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop",
    desc: "Equipped with multi-channel patient monitors, ventilators, and round-the-clock intensivist monitoring."
  },
  {
    title: "Major Surgical Operation Theatre",
    category: "facilities",
    image: "https://images.unsplash.com/photo-1551884831-b590ddec8218?q=80&w=600&auto=format&fit=crop",
    desc: "Sterilized environment for orthopedics, laparoscopy, and general surgery procedures."
  },
  {
    title: "Hemodialysis Care Station",
    category: "facilities",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop",
    desc: "Renal dialysis room with comfortable recliners and sterilizer devices."
  },
  {
    title: "Deluxe Private Ward Room",
    category: "wards",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop",
    desc: "Comfortable private spaces for mothers and patients, equipped with nurse call systems."
  },
  {
    title: "General Patient Ward",
    category: "wards",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=600&auto=format&fit=crop",
    desc: "Spacious, well-ventilated shared ward providing affordable inpatient recovery beds."
  },
  {
    title: "Hospital Reception & Lobby",
    category: "general",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop",
    desc: "Welcoming reception lobby with dedicated desks for TPA cashless schemes and inquiries."
  }
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "wards" | "facilities" | "general">("all");

  const filteredItems = filter === "all"
    ? items
    : items.filter(item => item.category === filter);

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Infrastructure</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-905 bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
          Hospital Gallery & Infrastructure
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Take a visual tour of our clinical units, patient recovery wards, and modern surgical operation theaters.
        </p>
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap justify-center gap-2">
        {(["all", "wards", "facilities", "general"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all uppercase tracking-wider ${
              filter === cat
                ? "bg-slate-900 border-slate-900 text-white dark:bg-brand-teal dark:border-brand-teal"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {cat === "all" ? "All Areas" : cat === "wards" ? "Patient Wards" : cat === "facilities" ? "Clinical Facilities" : "Hospital Lobby"}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 border border-slate-105 dark:border-slate-850 rounded-2xl overflow-hidden shadow-xs hover-lift group"
          >
            <div className="h-56 relative overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
            
            <div className="p-5 space-y-2">
              <span className="text-[9px] font-black uppercase text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-md inline-block">
                {item.category === "wards" ? "Ward Room" : item.category === "facilities" ? "Clinical Unit" : "Hospital Area"}
              </span>
              <h3 className="font-bold text-sm text-slate-800 dark:text-white group-hover:text-brand-teal transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
