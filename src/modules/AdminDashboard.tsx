"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Users, 
  CalendarCheck, 
  MessageSquareCode, 
  FileText, 
  Plus, 
  Check, 
  X, 
  Clock, 
  Trash2, 
  Award,
  Sparkles,
  Search,
  MessageSquare
} from "lucide-react";
import AnalyticsCharts from "@/components/AnalyticsCharts";
import BedAvailabilityWidget from "@/components/BedAvailabilityWidget";
import { updateAppointmentStatusAction, markQueryAsReadAction, createNewBlogAction } from "@/actions/admin";

interface AdminDashboardProps {
  appointments: any[];
  queries: any[];
  testimonials: any[];
  blogs: any[];
  waLogs: any[];
  analytics: any;
}

export default function AdminDashboard({
  appointments,
  queries,
  testimonials,
  blogs,
  waLogs,
  analytics
}: AdminDashboardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get("tab") || "overview";

  // CMS Form State
  const [blogTitle, setBlogTitle] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogCategory, setBlogCategory] = useState("General");
  const [blogContent, setBlogContent] = useState("");

  const [cmsSuccess, setCmsSuccess] = useState(false);
  const [cmsLoading, setCmsLoading] = useState(false);

  // Status Action Handler
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await updateAppointmentStatusAction(id, newStatus);
      if (res.success) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Mark Query Read Handler
  const handleMarkQueryRead = async (id: string) => {
    try {
      const res = await markQueryAsReadAction(id);
      if (res.success) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // CMS Blog submit
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogExcerpt || !blogContent) return;

    setCmsLoading(true);
    try {
      const slug = blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const res = await createNewBlogAction({
        title: blogTitle,
        slug,
        excerpt: blogExcerpt,
        content: `<p>${blogContent}</p>`,
        coverImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop",
        category: blogCategory,
        tags: ["Hospital Admin", "News"],
        readTime: "3 min read"
      });

      if (res.success) {
        setCmsSuccess(true);
        setBlogTitle("");
        setBlogExcerpt("");
        setBlogContent("");
        setTimeout(() => setCmsSuccess(false), 3000);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCmsLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* 1. TOP METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Consultations</span>
            <span className="text-2xl font-black text-slate-850 dark:text-white mt-1 block">{analytics.totalAppointments}</span>
            <span className="text-[10px] text-brand-teal font-semibold block mt-0.5">{analytics.pendingAppointments} Pending slots</span>
          </div>
          <div className="p-3 bg-brand-teal/5 rounded-xl text-brand-teal shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Billing Split</span>
            <span className="text-2xl font-black text-slate-850 dark:text-white mt-1 block">
              {Math.round(analytics.financialStats.cashlessRatio * 100)}%
            </span>
            <span className="text-[10px] text-slate-450 font-semibold block mt-0.5">{analytics.financialStats.cashlessCount} Cashless schemes</span>
          </div>
          <div className="p-3 bg-brand-teal/5 rounded-xl text-brand-teal shrink-0">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Active Enquiries</span>
            <span className="text-2xl font-black text-slate-850 dark:text-white mt-1 block">{analytics.totalQueries}</span>
            <span className="text-[10px] text-amber-655 font-semibold block mt-0.5">{analytics.unreadQueries} Unread tickets</span>
          </div>
          <div className="p-3 bg-brand-teal/5 rounded-xl text-brand-teal shrink-0">
            <MessageSquareCode className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Publishings</span>
            <span className="text-2xl font-black text-slate-850 dark:text-white mt-1 block">{blogs.length}</span>
            <span className="text-[10px] text-slate-450 font-semibold block mt-0.5">Health Tips posted</span>
          </div>
          <div className="p-3 bg-brand-teal/5 rounded-xl text-brand-teal shrink-0">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. TAB WORKSPACE PANELS */}

      {/* OVERVIEW PANEL TAB */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Charts Row */}
          <AnalyticsCharts 
            trendData={analytics.dailyAppointmentsTrend} 
            deptData={analytics.deptChartData} 
          />

          {/* Bed Availability & WhatsApp history grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <BedAvailabilityWidget beds={analytics.bedAvailability} />
            </div>

            {/* Live WhatsApp automation log tray */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-brand-teal" />
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white">Simulated WhatsApp Outbox</h4>
                  </div>
                  <span className="text-[9px] font-black uppercase text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded-md">
                    Automation Engine
                  </span>
                </div>

                <div className="space-y-3.5 h-64 overflow-y-auto pr-1">
                  {waLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1.5 text-xs text-slate-500"
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-slate-800 dark:text-slate-200">To: +91 {log.phone} ({log.patientName})</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full ${
                          log.status === "DELIVERED" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {log.status}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed dark:text-slate-400 whitespace-pre-line">{log.content}</p>
                      <span className="text-[9px] text-slate-400 block pt-1">
                        Triggered: {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APPOINTMENTS MANAGER TAB */}
      {activeTab === "appointments" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs space-y-6 p-6">
          <h3 className="font-bold text-base text-slate-850 dark:text-white">Active Patient Registrations</h3>
          
          <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4">Patient</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Slot</th>
                  <th className="p-4">Symptoms</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/20 dark:hover:bg-slate-900/10">
                    <td className="p-4 font-bold text-slate-800 dark:text-slate-200">{apt.patientName}</td>
                    <td className="p-4 space-y-0.5">
                      <span className="block">{apt.patientMobile}</span>
                      <span className="text-slate-400 block">{apt.patientEmail}</span>
                    </td>
                    <td className="p-4 space-y-0.5">
                      <span className="font-semibold block">{new Date(apt.date).toLocaleDateString()}</span>
                      <span className="text-slate-400 block">{apt.timeSlot}</span>
                    </td>
                    <td className="p-4 max-w-xs truncate">{apt.symptoms || "Regular checkup"}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                        apt.status === "CONFIRMED" 
                          ? "bg-blue-105 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : apt.status === "COMPLETED"
                          ? "bg-emerald-100 text-emerald-805 dark:bg-emerald-950 dark:text-emerald-400"
                          : apt.status === "CANCELLED"
                          ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                          : "bg-amber-100 text-amber-705 dark:bg-amber-950 dark:text-amber-300"
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1.5 justify-center">
                        {apt.status === "PENDING" && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, "CONFIRMED")}
                            className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                            title="Confirm Slot"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {apt.status !== "COMPLETED" && apt.status !== "CANCELLED" && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, "COMPLETED")}
                            className="p-1.5 rounded-lg bg-slate-900 dark:bg-brand-teal text-white hover:opacity-90 cursor-pointer"
                            title="Mark Complete"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {apt.status !== "CANCELLED" && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, "CANCELLED")}
                            className="p-1.5 rounded-lg bg-red-500 hover:bg-red-650 text-white cursor-pointer"
                            title="Cancel Booking"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PATIENT RECORDS TAB */}
      {activeTab === "patients" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-base text-slate-850 dark:text-white">Patient Record Registry</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {appointments.map((apt, index) => (
              <div 
                key={index} 
                className="p-5 border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Patient Profile</span>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">{apt.patientName}</h4>
                  <span className="text-xs text-slate-450 block">{apt.patientMobile}</span>
                  <span className="text-xs text-slate-450 block">{apt.patientEmail}</span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Admission Context</span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-305 block">Department: {apt.departmentId === "dept-gynecology" ? "Gynecology" : "Cardiology"}</span>
                  <span className="text-xs text-slate-500 block">Consultant Doctor</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Clinical Notes</span>
                  <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
                    {apt.symptoms || "No critical symptoms flagged in booking."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BLOG CMS TAB */}
      {activeTab === "blogs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Create Blog Form */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-6 rounded-2xl shadow-xs space-y-6">
            <h3 className="font-bold text-base text-slate-850 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
              Compose Health Blog
            </h3>

            {cmsSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold text-center">
                Article published successfully! Re-routing CMS log.
              </div>
            )}

            <form onSubmit={handleCreateBlog} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-450 uppercase block">Article Title*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Preparing for natural childbirth"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:border-brand-teal dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Category*</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-brand-teal dark:text-white"
                  >
                    <option value="General">General Medicine</option>
                    <option value="Gynecology & Maternity">Maternity Care</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="Cardiology">Cardiology</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Short Excerpt*</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief 1-sentence summary"
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:border-brand-teal dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-450 uppercase block">Content Body Text*</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Type health tip guidelines details..."
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:border-brand-teal dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={cmsLoading}
                className="w-full py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                {cmsLoading ? "Publishing..." : "Publish Article Now"}
              </button>
            </form>
          </div>

          {/* Published Articles List */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-5 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-bold text-sm text-slate-850 dark:text-white border-b border-slate-105 dark:border-slate-805 pb-3">
              Published Health Articles ({blogs.length})
            </h4>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {blogs.map((b) => (
                <div key={b.id} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1 text-xs">
                  <span className="text-[8px] font-black uppercase text-brand-teal">{b.category}</span>
                  <span className="block font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{b.title}</span>
                  <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{b.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ENQUIRIES DESK TAB */}
      {activeTab === "queries" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-base text-slate-850 dark:text-white">Incoming Help Desk Enquiries</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {queries.map((q) => (
              <div 
                key={q.id} 
                className={`p-5 border rounded-xl flex flex-col md:flex-row justify-between gap-6 items-start transition-all ${
                  q.read 
                    ? "bg-slate-50/40 dark:bg-slate-950 border-slate-100 dark:border-slate-800" 
                    : "bg-amber-50/10 dark:bg-slate-900 border-amber-250 dark:border-amber-900/50"
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex gap-2.5 items-center flex-wrap">
                    <span className="font-bold text-sm text-slate-800 dark:text-white">{q.name}</span>
                    <span className="text-[9px] text-slate-400">{new Date(q.createdAt).toLocaleString()}</span>
                    {!q.read && (
                      <span className="text-[8px] font-black uppercase text-amber-700 bg-amber-100 dark:bg-amber-950 px-1.5 py-0.5 rounded-md">
                        Unread Inquiry
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-semibold">
                    <span>Contact: {q.phone} | Email: {q.email}</span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-700 dark:text-slate-350">Subject: {q.subject}</h5>
                  <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">{q.message}</p>
                </div>

                {!q.read && (
                  <button
                    onClick={() => handleMarkQueryRead(q.id)}
                    className="px-4 py-2 bg-slate-900 dark:bg-brand-teal text-white hover:opacity-90 rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TESTIMONIALS MANAGER TAB */}
      {activeTab === "testimonials" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-base text-slate-850 dark:text-white">Patient Testimonials Panel</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {testimonials.map((t) => (
              <div 
                key={t.id}
                className="p-5 border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950 rounded-xl space-y-2.5 text-xs text-slate-500"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{t.patientName} ({t.relation})</span>
                  <span className="text-[10px] text-brand-teal font-extrabold uppercase">Rating: {"★".repeat(t.rating)}</span>
                </div>
                <p className="text-[11px] leading-relaxed dark:text-slate-400 italic">"{t.review}"</p>
                <span className="text-[9px] text-slate-400 block">Submitted: {new Date(t.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
