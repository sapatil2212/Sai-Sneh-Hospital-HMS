"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { DOCTORS, DoctorData } from "@/constants/doctors";
import { DEPARTMENTS } from "@/constants/departments";
import { bookAppointmentAction } from "@/actions/appointment";
import { Award, ArrowLeft, Calendar, ShieldCheck, Mail, Phone, Clock, User, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [doc, setDoc] = useState<DoctorData | null>(null);
  
  // Booking Form State
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [symptoms, setSymptoms] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      const match = DOCTORS.find((d) => d.slug === slug);
      if (match) setDoc(match);
    }
  }, [slug]);

  if (!doc) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-slate-500 font-medium">Loading profile or doctor not found...</p>
        <Link href="/doctors" className="text-xs text-brand-teal font-bold underline">
          Back to Doctors Catalog
        </Link>
      </div>
    );
  }

  const dept = DEPARTMENTS.find(d => d.id === doc.departmentId);

  const handleDirectBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !email || !date || !timeSlot) {
      setError("Please fill out all required booking fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await bookAppointmentAction({
        patientName: name,
        patientMobile: mobile,
        patientEmail: email,
        departmentId: doc.departmentId,
        doctorId: doc.id,
        date,
        timeSlot,
        symptoms
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || "Failed to book slot.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1 text-slate-550 hover:text-brand-teal text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all doctors</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Doctor Details */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-brand-teal/20 shrink-0">
              <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-black text-brand-teal bg-brand-teal/10 px-2.5 py-1 rounded-lg uppercase tracking-wider inline-block">
                {dept?.name || "Specialist"}
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">{doc.name}</h1>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-350">{doc.qualification}</p>
              <p className="text-xs text-slate-450">{doc.specialty}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-850 dark:text-white">Biography</h3>
            <p className="text-xs text-slate-500 leading-relaxed dark:text-slate-400">
              {doc.biography}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex gap-3 items-center">
              <Award className="w-5 h-5 text-brand-teal shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Experience</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{doc.experience} Years of Service</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex gap-3 items-center">
              <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">TPA Schemes</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Cashless Approved</span>
              </div>
            </div>
          </div>

          {/* Timing details */}
          <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-teal" />
              <span>Standard Consulting Hours</span>
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {doc.timingSlots.map((slot, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {slot}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 pt-1">
              For emergency consults outside standard hours, our Emergency Medical Officer handles admissions.
            </p>
          </div>
        </div>

        {/* Right Column: Embedded booking wizard */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 rounded-2xl shadow-premium space-y-6">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-teal" />
              <span>Schedule Appointment</span>
            </h3>

            {!success ? (
              <form onSubmit={handleDirectBook} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-650 font-semibold">
                    {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Patient Name*</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Mobile Number*</label>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Email Address*</label>
                    <input
                      type="email"
                      required
                      placeholder="patient@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Consultation Date*</label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Timing Slot*</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                    >
                      <option value="">Select Slot</option>
                      {doc.timingSlots.map((slot, index) => (
                        <option key={index} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Symptoms / Clinical Notes</label>
                  <textarea
                    rows={2}
                    placeholder="Enter main health issues..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-sm font-bold shadow-md hover:shadow-hover transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-slate-350"
                >
                  {loading ? "Scheduling..." : `Confirm Booking with ${doc.name}`}
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/50 rounded-2xl text-center space-y-4">
                <div className="flex justify-center text-emerald-500">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h4 className="font-extrabold text-slate-850 dark:text-white">Appointment Scheduled!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                  Your appointment booking has been registered. A simulated confirmation message has been dispatched to <strong>{mobile}</strong>.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-xs text-brand-teal font-bold hover:underline"
                >
                  Schedule another appointment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
