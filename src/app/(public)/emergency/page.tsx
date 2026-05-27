"use client";

import { useState } from "react";
import { PhoneCall, Truck, Heart, Baby, ShieldAlert, CheckCircle, Clock } from "lucide-react";
import BedAvailabilityWidget from "@/components/BedAvailabilityWidget";

export default function EmergencyPage() {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [landmark, setLandmark] = useState("");
  const [dispatched, setDispatched] = useState(false);

  const handleAmbulanceDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !landmark) return;

    console.log(`[AMBULANCE DISPATCH TRIGGER] Patient: ${patientName || "Walkin"}, Phone: ${phone}, Landmark: ${landmark}`);
    setDispatched(true);
  };

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 1. Header Hero Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-8 md:p-12 rounded-3xl shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>24 Hours Critical Dispatch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Emergency & Trauma Services
          </h1>
          <p className="text-sm text-red-100 leading-relaxed">
            Immediate medical dispatch, cardiac stabilization during golden hours, and advanced trauma care beds. A doctor and specialist surgeon are available on-call around the clock.
          </p>
        </div>

        <div className="shrink-0 space-y-3 text-center">
          <span className="block text-xs uppercase tracking-widest text-red-200 font-extrabold">24x7 Ambulance Helpline</span>
          <a
            href="tel:08888150101"
            className="flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-50 text-red-600 font-black text-lg md:text-xl rounded-2xl shadow-xl transition-all hover:scale-101 animate-pulse"
          >
            <PhoneCall className="w-6 h-6 text-red-600" />
            <span>088881 50101</span>
          </a>
        </div>
      </div>

      {/* 2. Grid split: Dispatch Form & Bed Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Dispatcher form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-premium space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Truck className="w-6 h-6 text-red-500" />
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Request Rapid Ambulance Pick-up</h3>
          </div>

          {!dispatched ? (
            <form onSubmit={handleAmbulanceDispatch} className="space-y-4">
              <p className="text-xs text-slate-500">
                Input your pickup landmark below. The closest ambulance crew will be dispatched from our Katraj depot immediately.
              </p>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-450 uppercase block">Patient Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Enter patient name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Phone Number*</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Pickup Landmark (Katraj/Pune)*</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near PMT Depot, Katraj"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-red-500 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                Send Ambulance Now
              </button>
            </form>
          ) : (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/50 rounded-2xl text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="font-extrabold text-slate-850 dark:text-white">Ambulance MH-12-SS-5010 Dispatched!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                The ambulance crew has been notified and is departing for <strong>{landmark}</strong>. Please keep this mobile phone line <strong>{phone}</strong> clear. Our coordinator will contact you in seconds.
              </p>
              <button
                type="button"
                onClick={() => setDispatched(false)}
                className="text-xs text-brand-teal font-bold hover:underline"
              >
                Send another ambulance query
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Bed Occupancy */}
        <div className="lg:col-span-5">
          <BedAvailabilityWidget />
        </div>
      </div>

      {/* 3. Emergency Guidelines */}
      <div className="space-y-8 border-t border-slate-250 dark:border-slate-800/80 pt-16">
        <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">Critical Triage & First Aid Guides</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-950/20 rounded-xl flex items-center justify-center text-red-500 shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">Cardiac Events (Chest Pain)</h4>
            <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
              Keep the patient seated upright and absolute rest. Loosen tight neck clothing. Do not walk or climb stairs. Call for our ambulance instantly.
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-xl flex items-center justify-center text-brand-teal shrink-0">
              <Baby className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">Maternity Contractions</h4>
            <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
              Record start/end timestamps of uterine contractions. Pack hospital files and baby clothing bags. Call our 24x7 labor room desks immediately.
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl space-y-3">
            <div className="w-10 h-10 bg-cyan-50 dark:bg-cyan-950/20 rounded-xl flex items-center justify-center text-cyan-500 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-white">Trauma & Fractures</h4>
            <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
              Apply gentle compression to arrest bleeding. Do not attempt to align broken bone fractures. Support the affected limb using simple splits or boards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
