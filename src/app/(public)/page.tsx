"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ShieldAlert, 
  Calendar, 
  PhoneCall, 
  MessageSquare, 
  Award, 
  Users, 
  Building2, 
  Heart, 
  ChevronRight, 
  Plus, 
  Minus,
  CheckCircle,
  FileText,
  Clock,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSlideshow from "@/components/HeroSlideshow";
import { DEPARTMENTS } from "@/constants/departments";
import { DOCTORS } from "@/constants/doctors";
import { FAQS } from "@/constants/faqs";
import { INSURANCE_PARTNERS } from "@/constants/insurance";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Statistics counters data
  const stats = [
    { icon: Award, value: "39+", label: "Years of Trust", desc: "Serving Pune since 1987" },
    { icon: Building2, value: "50", label: "Bedded Facility", desc: "Multi-Speciality Ward" },
    { icon: Users, value: "10K+", label: "Happy Patients", desc: "Successful recoveries" },
    { icon: Heart, value: "24/7", label: "ICU & Dialysis", desc: "Critical care support" }
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-brand-teal/5 via-brand-blue/5 to-transparent">
        {/* Animated grid overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 dark:opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero text copy */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-teal/10 border border-brand-teal/20 rounded-full text-[10px] font-bold text-brand-teal">
                <Clock className="w-3 h-3 animate-pulse" />
                <span>24x7 Emergency & Maternity Admission Care</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-tight">
                39 Years of <br />
                <span className="bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent font-bold">
                  Trusted Healthcare
                </span> <br />
                in Katraj, Pune
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                Sai Sneh Hospital is a premier 50-bedded multi-speciality healthcare facility and maternity home. We offer advanced ICU units, state-of-the-art operation theatres, and round-the-clock Dialysis centers with complete cashless support.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-0.5">
                <Link
                  href="/book-appointment"
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-slate-900 dark:bg-brand-teal hover:bg-slate-800 dark:hover:bg-brand-teal-dark shadow-sm hover:shadow-md transition-all text-center"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </Link>

                <a
                  href="tel:08888150101"
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-all text-center shadow-md cursor-pointer hover:shadow-lg"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Emergency 24/7</span>
                </a>
              </div>

              {/* AI Symptom Triage Launcher embedded directly in hero */}
              <div className="p-4 bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-1">
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-brand-teal/10 rounded-xl text-brand-teal shrink-0">
                    <Sparkles className="w-4 h-4 text-brand-teal" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">AI Integration</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Interactive Symptom Guide</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const btn = document.querySelector('button[class*="fixed bottom-24"]') as HTMLButtonElement;
                    if (btn) btn.click();
                  }}
                  className="text-xs font-bold text-white bg-brand-teal hover:bg-brand-teal-dark px-4 py-2 rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Launch Triage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Trust badges list */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-x-6 gap-y-3 text-[11px] text-slate-450 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-green" />
                  Cashless Mediclaim Approved
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-green" />
                  PMC & MPJAY Accepted
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-green" />
                  Qualified ICU Specialists
                </span>
              </div>
            </div>

            {/* Right Slideshow Column */}
            <div className="lg:col-span-5 w-full">
              <HeroSlideshow />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-brand-teal" />
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</span>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-350">{stat.label}</span>
                    <span className="block text-[10px] text-slate-400">{stat.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. DEPARTMENTS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Specialist Care</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Our Medical Departments</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            From emergency ICU management and neonatal maternity services to outpatient consultations, our specialized divisions deliver optimal treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.slice(0, 6).map((dept) => (
            <div
              key={dept.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover-lift flex flex-col h-full"
            >
              <div className="h-44 relative overflow-hidden">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-950/95 p-2 rounded-xl text-brand-teal shadow-md">
                  <span className="text-xs font-bold">{dept.name}</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                  {dept.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800/50">
                  <Link
                    href={`/book-appointment?dept=${dept.slug}`}
                    className="text-xs font-bold text-brand-teal hover:text-brand-teal-dark flex items-center gap-1.5"
                  >
                    <span>Book Consultation</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/departments"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-brand-teal"
          >
            <span>View All Departments</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. DOCTORS SECTION */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20 border-y border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Expert Physicians</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Meet Our Specialist Doctors</h2>
            <p className="text-slate-550 max-w-xl mx-auto text-sm leading-relaxed">
              Highly credentialed medical professionals with years of hospital expertise dedicated to patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCTORS.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="p-4 flex flex-col items-center text-center space-y-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-brand-teal/20 relative">
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-slate-800 dark:text-white">{doc.name}</h4>
                    <span className="text-[10px] font-bold text-brand-teal uppercase tracking-wider block mt-0.5">
                      {doc.specialty.split(",")[0]}
                    </span>
                    <span className="text-xs text-slate-400 block mt-1">{doc.qualification}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 dark:bg-slate-850 px-2.5 py-1 rounded-lg">
                    <Award className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{doc.experience} Years Experience</span>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-50 dark:border-slate-800 flex gap-2 bg-slate-50/20">
                  <Link
                    href={`/doctors/${doc.slug}`}
                    className="flex-1 text-center py-1.5 border border-slate-200 dark:border-slate-800 text-[11px] font-semibold rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    View Profile
                  </Link>
                  <Link
                    href={`/book-appointment?doc=${doc.slug}`}
                    className="flex-1 text-center py-1.5 bg-brand-teal hover:bg-brand-teal-dark text-white text-[11px] font-semibold rounded-full transition-colors"
                  >
                    Quick Book
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-brand-teal"
            >
              <span>View Full Doctors Roster</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. INSURANCE & CASHLESS PANEL */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Seamless Billing</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Cashless Mediclaim & <br />
              Government Schemes
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sai Sneh Hospital believes healthcare should be accessible to all. We provide cashless treatment approvals for all major health insurance providers (TPAs), alongside full support for government health schemes like MPJAY, PMJAY, PMC, PMPML, and MPKAY.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-brand-teal/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-teal" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Zero Upfront Cash</span>
                  <p className="text-xs text-slate-555">Get admitted immediately for critical care and ICU surgeries under pre-approved TPA networks.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-brand-teal/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-teal" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Dedicated Help Desk</span>
                  <p className="text-xs text-slate-555">Our desk managers assist with claim paperwork, pre-auths, and discharge settlements.</p>
                </div>
              </div>
            </div>
            <Link
              href="/insurance"
              className="inline-flex items-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-805 text-white rounded-full text-[11px] font-semibold transition-all hover:translate-x-0.5"
            >
              <span>Verify Policy / Eligibility</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {INSURANCE_PARTNERS.slice(0, 6).map((partner, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl text-center space-y-2 flex flex-col justify-center items-center shadow-xs"
                >
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-850 rounded-xl flex items-center justify-center font-black text-slate-700 dark:text-slate-300 text-xs">
                    {partner.logoText}
                  </div>
                  <span className="block font-bold text-xs text-slate-800 dark:text-slate-200">{partner.name.split(" (")[0]}</span>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">{partner.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQS SECTION */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20 border-t border-slate-100 dark:border-slate-800/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Clear Answers</span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.slice(0, 5).map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center font-semibold text-sm text-slate-800 dark:text-slate-250 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <Minus className="w-4 h-4 text-brand-teal" /> : <Plus className="w-4 h-4 text-slate-450" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-slate-100 dark:border-slate-800"
                      >
                        <p className="px-5 py-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50/30 dark:bg-slate-900/10">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CONVERSION CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-brand-teal to-brand-teal-dark text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(2,132,199,0.15),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Schedule a Consult with Our Doctors Today
          </h2>
          <p className="text-sm md:text-base text-teal-50 max-w-xl mx-auto leading-relaxed">
            Booking takes less than 2 minutes. Select your department, choose a preferred slot, and receive instant confirmation logs.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/book-appointment"
              className="px-5 py-2.5 rounded-full font-bold bg-white text-brand-teal hover:bg-slate-50 text-xs shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              Book My Slot
            </Link>
            <a
              href="tel:08888150101"
              className="px-5 py-2.5 rounded-full font-bold border border-white/30 hover:bg-white/10 text-xs transition-all flex items-center justify-center gap-1.5 hover:-translate-y-0.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Helpline 088881 50101</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. GOOGLE MAPS SECTION */}
      <section className="h-[400px] w-full border-t border-slate-200 dark:border-slate-800 relative bg-slate-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.8214227181077!2d73.8548233760431!3d18.446559387451368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eab14668ba47%3A0xebeab6fe0cbfaef5!2sSai%20Sneh%20Hospital%20%26%20Maternity%20Home!5e0!3m2!1sen!2sin!4v1716782500000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale dark:invert opacity-80"
          title="Sai Sneh Hospital Google Map"
        />
        <div className="absolute bottom-6 left-6 max-w-sm bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-premium space-y-2.5">
          <h4 className="font-bold text-xs text-slate-800 dark:text-white">Sai Sneh Hospital Location</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed dark:text-slate-400">
            Pune - Satara Rd, opp. PMT Bus Depot, Katraj Vasahat, Katraj, Pune, Maharashtra 411046
          </p>
          <a
            href="https://maps.google.com/?q=Sai+Sneh+Hospital+Katraj+Pune"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-brand-teal hover:underline inline-flex items-center gap-0.5"
          >
            <span>Get Driving Directions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
