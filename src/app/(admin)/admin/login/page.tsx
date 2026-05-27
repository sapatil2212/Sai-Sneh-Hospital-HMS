"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { HeartPulse, KeyRound, Mail, AlertTriangle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all credential fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await loginAction(email, password);
      if (res.success) {
        router.refresh();
        router.push("/admin");
      } else {
        setError(res.error || "Invalid username or password.");
      }
    } catch (err: any) {
      setError("An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        {/* Logo */}
        <div className="inline-flex p-3 bg-brand-teal/10 rounded-2xl">
          <HeartPulse className="w-8 h-8 text-brand-teal" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Hospital Dashboard
        </h2>
        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
          Access the booking engine, patient portal, dialysis timetables, and notification automation logs.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-4 border border-slate-200 dark:border-slate-800 shadow-premium sm:rounded-2xl sm:px-10 space-y-6">
          {error && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl text-xs text-amber-800 dark:text-amber-400 flex gap-2 items-center">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-450 uppercase block">Work Email</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="email"
                  required
                  placeholder="admin@saisneh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-450 uppercase block">Password</label>
              <div className="relative flex items-center">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                />
              </div>
            </div>

            {/* Login Trigger */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-sm font-bold shadow-md hover:shadow-hover transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-slate-350"
            >
              <span>{loading ? "Authenticating..." : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Info Box */}
          <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 leading-relaxed">
            <span className="font-bold block text-slate-650 dark:text-slate-300">Quick Test Credentials:</span>
            <ul className="list-disc pl-4 mt-1 space-y-0.5">
              <li>Admin: <strong className="text-slate-800 dark:text-slate-200">admin@saisneh.com</strong> / <strong className="text-slate-800 dark:text-slate-200">admin123</strong></li>
              <li>Doctor: <strong className="text-slate-800 dark:text-slate-200">snehal@saisneh.com</strong> / <strong className="text-slate-800 dark:text-slate-200">doctor123</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
