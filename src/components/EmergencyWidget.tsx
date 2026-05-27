"use client";

import { useState } from "react";
import { PhoneCall, Truck, Heart, Baby, ShieldAlert, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmergencyWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [landmark, setLandmark] = useState("");
  const [dispatched, setDispatched] = useState(false);

  const handleRequestAmbulance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !landmark) return;

    console.log("\n==============================================");
    console.log("[AMBULANCE DISPATCH SIMULATION]");
    console.log(`Patient Name: ${patientName || "Anonymous Request"}`);
    console.log(`Contact Phone: ${phone}`);
    console.log(`Landmark Location: ${landmark}`);
    console.log("STATUS: Dispatching Vehicle #MH-12-SS-5010...");
    console.log("==============================================\n");

    setDispatched(true);
    setTimeout(() => {
      // Auto-reset after a while
      setPatientName("");
      setPhone("");
      setLandmark("");
    }, 5000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            className="mb-4 w-80 sm:w-96 glass rounded-2xl shadow-emergency overflow-hidden border border-red-500/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
                  <ShieldAlert className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wide">EMERGENCY SERVICES</h4>
                  <span className="text-xs text-red-200">Sai Sneh 24x7 Triage Unit</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setDispatched(false);
                }}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Panel */}
            <div className="p-4 bg-slate-50/90 dark:bg-slate-900/90 max-h-96 overflow-y-auto space-y-4">
              {/* Hotlines */}
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-3.5 rounded-xl text-center space-y-2">
                <span className="text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider block">
                  Tap to Call Direct Hotlines
                </span>
                <a
                  href="tel:08888150101"
                  className="flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Ambulance: 088881 50101</span>
                </a>
              </div>

              {/* Ambulance Dispatch Form */}
              {!dispatched ? (
                <form onSubmit={handleRequestAmbulance} className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-3">
                  <span className="text-xs text-slate-500 font-bold block">Request Rapid Ambulance Pick-up</span>
                  
                  <input
                    type="text"
                    placeholder="Patient Name (Optional)"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 px-3 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:text-white"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone Number (Required)*"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-950 px-3 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Landmark in Katraj/Pune (Required)*"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    required
                    className="w-full bg-white dark:bg-slate-950 px-3 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-red-500 dark:text-white"
                  />

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all shadow-md cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-red-500" />
                    <span>Send Ambulance Now</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-center space-y-2">
                  <div className="flex justify-center text-emerald-500">
                    <Truck className="w-10 h-10 animate-bounce" />
                  </div>
                  <h5 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">Ambulance Dispatched!</h5>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Vehicle MH-12-SS-5010 has left Sai Sneh Hospital. Our medical crew is on their way to <strong>{landmark}</strong>. Keep phone line open!
                  </p>
                  <button
                    type="button"
                    onClick={() => setDispatched(false)}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 underline pt-1"
                  >
                    Send another request
                  </button>
                </div>
              )}

              {/* Medical Guidelines */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2">
                <span className="text-xs text-slate-500 font-bold block">First Aid Protocols</span>
                
                <div className="flex gap-2.5 p-2 bg-white dark:bg-slate-800 rounded-lg text-xs border border-slate-100 dark:border-slate-700">
                  <Heart className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-800 dark:text-white">Chest Discomfort</span>
                    <p className="text-slate-500 dark:text-slate-400">Keep patient seated upright. Loosen clothing. Give aspirin if recommended. Avoid exertion.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 p-2 bg-white dark:bg-slate-800 rounded-lg text-xs border border-slate-100 dark:border-slate-700">
                  <Baby className="w-5 h-5 text-brand-teal shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-800 dark:text-white">Labor Contractions</span>
                    <p className="text-slate-500 dark:text-slate-400">Time contractions from beginning of one to beginning of next. Contact maternity ward.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-red-500/25 cursor-pointer relative animate-pulse-slow"
      >
        <PhoneCall className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </motion.button>
    </div>
  );
}
