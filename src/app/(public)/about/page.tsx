"use client";

import { Award, Shield, Heart, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const values = [
    { icon: Heart, title: "Patient Compassion", desc: "We prioritize patient comfort and care above all, ensuring treatment with dignity." },
    { icon: Shield, title: "Clinical Excellence", desc: "Operating with advanced technology in our ICU, operation theatres, and dialysis setups." },
    { icon: Award, title: "39 Years of Trust", desc: "A household name in Katraj, Pune, supporting generations of families since 1987." },
    { icon: Clock, title: "24x7 Accessibility", desc: "Round-the-clock doctors, critical care teams, and cashless mediclaim support." }
  ];

  const milestones = [
    { year: "1987", title: "Hospital Founded", desc: "Started as a dedicated maternity home serving the local Katraj community." },
    { year: "1998", title: "General Surgery expansion", desc: "Inaugurated our first fully-equipped surgical operation theatre." },
    { year: "2010", title: "ICU Commissioning", desc: "Launched a state-of-the-art multi-bed ICU for high-risk critical cases." },
    { year: "2018", title: "Dialysis Unit Launch", desc: "Built a 24x7 dialysis center under specialist nephrology guidance." },
    { year: "2026", title: "Digital Healthcare Upgrade", desc: "Upgraded diagnostic devices and integrated AI-assisted symptom tracking." }
  ];

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 1. Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">About Us</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-905 bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
          Our 39-Year Healing Legacy
        </h1>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed">
          Established in 1987, Sai Sneh Hospital has grown from a local maternity clinic to a premium 50-bed multi-speciality hospital, delivering continuous care to Pune-Satara Road families.
        </p>
      </div>

      {/* 2. Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            Providing Multi-Speciality Medical Care Under One Roof
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Sai Sneh Hospital specializes in comprehensive patient care. We operate a high-standard Intensive Care Unit (ICU) led by on-duty intensivists, a modern hemodialysis center running 24x7, and an advanced surgery suite equipped for laparoscopic procedures.
          </p>
          <p className="text-sm text-slate-500 leading-relaxed">
            With a deep history in gynecological care and obstetrics, we continue to provide safe, comfortable maternity solutions, painless deliveries, and neonatal stabilization services.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
              <span className="text-3xl font-black text-brand-teal block">50</span>
              <span className="text-xs text-slate-450 font-bold uppercase tracking-wide">Bedded Hospital</span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
              <span className="text-3xl font-black text-brand-teal block">24/7</span>
              <span className="text-xs text-slate-450 font-bold uppercase tracking-wide">Emergency Services</span>
            </div>
          </div>
        </div>

        {/* Showcase Image with absolute stats */}
        <div className="lg:col-span-6 relative">
          <div className="h-96 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-premium relative">
            <img 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop" 
              alt="Sai Sneh Hospital ICU Unit" 
              className="w-full h-full object-cover"
            />
            {/* Absolute overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
          </div>
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-slate-900/95 p-5 rounded-xl shadow-lg border border-slate-100 dark:border-slate-850 flex gap-4 items-center">
            <Award className="w-10 h-10 text-brand-teal shrink-0" />
            <div>
              <span className="block font-bold text-xs text-slate-800 dark:text-white">ISO 9001:2015 Certified Care</span>
              <p className="text-[10px] text-slate-400">Strictly following quality protocols and medical guidelines in Pune.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="space-y-10 border-t border-slate-200 dark:border-slate-800/80 pt-16">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Our Core Commitments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-5 rounded-2xl shadow-xs space-y-3"
              >
                <div className="w-10 h-10 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-white">{v.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Timeline Milestones */}
      <div className="space-y-10 border-t border-slate-200 dark:border-slate-800/80 pt-16">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Our Journey Through Time</h2>
        
        <div className="max-w-4xl mx-auto relative pl-6 border-l-2 border-brand-teal/20 space-y-8">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative space-y-1">
              {/* Bullet Node */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-brand-teal border-4 border-white dark:border-slate-950" />
              
              <span className="text-xs font-black text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-md">{m.year}</span>
              <h4 className="font-bold text-sm text-slate-855 dark:text-white pt-1">{m.title}</h4>
              <p className="text-xs text-slate-450 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
