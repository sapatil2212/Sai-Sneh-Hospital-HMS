"use client";

import { useState } from "react";
import { submitContactQueryAction } from "@/actions/contact";
import { Mail, MapPin, Phone, Clock, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !subject || !message) {
      setError("Please complete all query fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await submitContactQueryAction({
        name,
        email,
        phone,
        subject,
        message
      });

      if (res.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        setError(res.error || "Failed to submit query.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* 1. Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Contact Us</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-905 bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
          Get in Touch with Our Desk
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Questions about cashless panel approvals, bed reservations, or appointments? Send our helpdesk a message.
        </p>
      </div>

      {/* 2. Contact details & Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Hospital Contacts</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl">
              <MapPin className="w-6 h-6 text-brand-teal shrink-0 mt-1" />
              <div>
                <span className="font-bold text-sm text-slate-800 dark:text-white">Address Details</span>
                <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400 mt-1">
                  Pune - Satara Rd, opp. PMT Bus Depot, Katraj Vasahat, Katraj, Pune, Maharashtra 411046
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl">
              <Phone className="w-6 h-6 text-brand-teal shrink-0 mt-1" />
              <div>
                <span className="font-bold text-sm text-slate-800 dark:text-white">Admission Help Desk</span>
                <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400 mt-1">
                  Helpline: <strong>088881 50101</strong> (Open 24/7)<br />
                  Office: 020-24370023
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl">
              <Clock className="w-6 h-6 text-brand-teal shrink-0 mt-1" />
              <div>
                <span className="font-bold text-sm text-slate-800 dark:text-white">Timing Hours</span>
                <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400 mt-1">
                  IPD Admissions & Emergency: <strong>24/7 Open</strong><br />
                  OPD Consulting: 10:00 AM - 1:00 PM & 5:00 PM - 9:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Query Form Panel */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 rounded-2xl shadow-premium space-y-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <MessageSquare className="w-5 h-5 text-brand-teal" />
              <span>Send Message</span>
            </h3>

            {success && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">Message Received!</h4>
                <p className="text-xs text-slate-650 dark:text-slate-400">
                  Thank you for reaching out. Your query has been logged in the admin panel and simulated.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs text-brand-teal font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            )}

            {!success && (
              <form onSubmit={handleSend} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-650 font-semibold">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Your Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Phone Number*</label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Email Address*</label>
                    <input
                      type="email"
                      required
                      placeholder="patient@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Subject / Query Topic*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Admission inquiry"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Your Message*</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your questions in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-sm font-bold shadow-md hover:shadow-hover transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-slate-300"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
