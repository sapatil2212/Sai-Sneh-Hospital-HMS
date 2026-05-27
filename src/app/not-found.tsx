import Link from "next/link";
import { HeartPulse, Home, Calendar } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center px-4 font-sans text-center">
      <div className="space-y-6 max-w-md">
        {/* Animated Icon */}
        <div className="mx-auto w-16 h-16 bg-brand-teal/10 dark:bg-brand-teal/20 rounded-2xl flex items-center justify-center text-brand-teal">
          <HeartPulse className="w-9 h-9" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-205">Clinical Link Missing</h2>
          <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
            The page you are looking for has been moved, archived, or does not exist in our clinical systems.
          </p>
        </div>

        {/* Action Recovery Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-850 dark:bg-brand-teal text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/book-appointment"
            className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <Calendar className="w-4 h-4 text-brand-teal" />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
