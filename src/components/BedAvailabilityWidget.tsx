"use client";

import { Activity } from "lucide-react";

interface BedUnit {
  type: string;
  total: number;
  occupied: number;
  color: string;
}

const defaultBeds: BedUnit[] = [
  { type: "ICU Beds", total: 12, occupied: 8, color: "bg-red-500" },
  { type: "Maternity Wards", total: 15, occupied: 11, color: "bg-emerald-500" },
  { type: "Dialysis Stations", total: 10, occupied: 6, color: "bg-cyan-500" },
  { type: "General Ward", total: 13, occupied: 9, color: "bg-blue-500" }
];

export default function BedAvailabilityWidget({ beds = defaultBeds }: { beds?: BedUnit[] }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 rounded-2xl shadow-premium space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-teal animate-pulse" />
          <h4 className="font-bold text-sm text-slate-800 dark:text-white">Live Bed Availability</h4>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* Bed List */}
      <div className="space-y-3.5">
        {beds.map((bed, index) => {
          const open = bed.total - bed.occupied;
          const pct = (bed.occupied / bed.total) * 100;
          return (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">{bed.type}</span>
                <span className="text-slate-500">
                  <strong className="text-slate-800 dark:text-slate-200">{open}</strong> Available / {bed.total} Total
                </span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${bed.color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Notice Disclaimer */}
      <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center leading-relaxed">
        Admissions are updated hourly. For emergency bed reservation under cashless schemes, call our admission coordinator desk.
      </p>
    </div>
  );
}
