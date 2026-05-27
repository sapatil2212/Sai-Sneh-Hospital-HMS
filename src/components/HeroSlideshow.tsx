"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/images/doctor_hero.png",
    title: "Expert Clinical Specialists",
    tagline: "39+ Years of Trusted Medical Practice"
  },
  {
    image: "/images/hospital_lobby.png",
    title: "State-of-the-Art Wards & ICU",
    tagline: "Premium 50-Bed Infrastructure"
  },
  {
    image: "/images/ai_medical_tech.png",
    title: "AI-Assisted Symptom Triage",
    tagline: "Modern Healthcare Integrated with Tech"
  }
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[370px] lg:h-[440px] rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-800/80 shadow-premium bg-slate-100 dark:bg-slate-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Image */}
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover filter brightness-[0.95]"
          />
          {/* Ambient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-905/20 to-transparent" />

          {/* Texts overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <span className="text-[10px] font-black tracking-widest text-brand-teal uppercase bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md inline-block">
              {slides[current].tagline}
            </span>
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-white drop-shadow-sm">
              {slides[current].title}
            </h3>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute top-4 right-4 flex gap-1.5 z-10 bg-slate-950/20 backdrop-blur-xs px-2.5 py-1.5 rounded-full">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              current === idx ? "bg-brand-teal w-3" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
