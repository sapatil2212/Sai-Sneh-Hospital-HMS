"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DEPARTMENTS } from "@/constants/departments";
import { DOCTORS } from "@/constants/doctors";
import { bookAppointmentAction } from "@/actions/appointment";
import { Calendar, User, Phone, Mail, Stethoscope, Clock, ShieldCheck, CheckCircle } from "lucide-react";

function BookAppointmentForm() {
  const searchParams = useSearchParams();
  const deptParam = searchParams?.get("dept");
  const docParam = searchParams?.get("doc");

  // Form Field State
  const [departmentId, setDepartmentId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");

  // UI Flow State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Set initial params if they exist in URL
  useEffect(() => {
    if (deptParam) {
      const match = DEPARTMENTS.find(d => d.slug === deptParam);
      if (match) setDepartmentId(迫 => match.id); // Wait, fix typo in state update
    }
  }, [deptParam]);

  useEffect(() => {
    if (departmentId) {
      // Auto-select first doctor in department if parameters indicate it
      const matchDept = DEPARTMENTS.find(d => d.id === departmentId);
      if (docParam) {
        const matchDoc = DOCTORS.find(d => d.slug === docParam);
        if (matchDoc && matchDoc.departmentId === departmentId) {
          setDoctorId(matchDoc.id);
        }
      }
    }
  }, [departmentId, docParam]);

  // Fallback direct set for doctor param if department is empty
  useEffect(() => {
    if (docParam && !departmentId) {
      const matchDoc = DOCTORS.find(d => d.slug === docParam);
      if (matchDoc) {
        setDepartmentId(matchDoc.departmentId);
        setDoctorId(matchDoc.id);
      }
    }
  }, [docParam, departmentId]);

  // Filter doctors based on selected department
  const availableDoctors = DOCTORS.filter(d => d.departmentId === departmentId);

  // Get available slots based on selected doctor
  const selectedDoctorRecord = DOCTORS.find(d => d.id === doctorId);
  const availableSlots = selectedDoctorRecord ? selectedDoctorRecord.timingSlots : [];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !mobile || !email || !departmentId || !doctorId || !date || !timeSlot) {
      setError("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await bookAppointmentAction({
        patientName: name,
        patientMobile: mobile,
        patientEmail: email,
        departmentId,
        doctorId,
        date,
        timeSlot,
        symptoms
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || "Failed to submit booking.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setName("");
    setMobile("");
    setEmail("");
    setSymptoms("");
    setDate("");
    setTimeSlot("");
    setDoctorId("");
  };

  return (
    <div className="py-12 md:py-20 font-sans max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold text-brand-teal uppercase tracking-widest block">Scheduling Portal</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-905">Book Consultation Slot</h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto">
          Complete the form below to book your appointment. In-app simulation will trigger outgoing notifications instantly.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-premium overflow-hidden">
        {!success ? (
          <form onSubmit={handleBooking} className="p-6 md:p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-650 font-semibold">
                {error}
              </div>
            )}

            {/* Step 1: Clinical Mapping */}
            <div className="space-y-4">
              <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block border-b border-slate-100 dark:border-slate-800 pb-2">
                1. Medical Mapping
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Department Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5 text-brand-teal" />
                    <span>Select Department*</span>
                  </label>
                  <select
                    value={departmentId}
                    onChange={(e) => {
                      setDepartmentId(e.target.value);
                      setDoctorId("");
                      setTimeSlot("");
                    }}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                  >
                    <option value="">Choose Department</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Doctor Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-brand-teal" />
                    <span>Select Specialist Doctor*</span>
                  </label>
                  <select
                    value={doctorId}
                    onChange={(e) => {
                      setDoctorId(e.target.value);
                      setTimeSlot("");
                    }}
                    required
                    disabled={!departmentId}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400"
                  >
                    <option value="">
                      {!departmentId ? "First select department" : "Choose Doctor"}
                    </option>
                    {availableDoctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.qualification.split(",")[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Date & Slots */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block border-b border-slate-100 dark:border-slate-800 pb-2">
                2. Select Date & Slot
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date Picker */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-teal" />
                    <span>Preferred Date*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                  />
                </div>

                {/* Time Slots selector */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-teal" />
                    <span>Preferred Time Slot*</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    required
                    disabled={!doctorId}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400"
                  >
                    <option value="">
                      {!doctorId ? "First select a doctor" : "Choose Time Slot"}
                    </option>
                    {availableSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Patient Records */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block border-b border-slate-100 dark:border-slate-800 pb-2">
                3. Patient Particulars
              </span>

              <div className="space-y-3">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Full Name*</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1">
                      <Phone className="w-3 h-3 text-brand-teal" />
                      <span>Mobile Number (WhatsApp Enabled)*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Email Address*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="patient@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                    />
                  </div>
                </div>

                {/* Symptoms */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-450 uppercase block">Brief Symptoms / Medical History</label>
                  <textarea
                    rows={3}
                    placeholder="Enter main clinical issues, symptoms, or notes..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-teal dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Submission */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0">
                <ShieldCheck className="w-4 h-4 text-brand-teal" />
                <span>Your information is protected under healthcare privacy logs.</span>
              </span>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-sm font-bold shadow-md hover:shadow-hover transition-all cursor-pointer disabled:bg-slate-300"
              >
                {loading ? "Scheduling slot..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-10 text-center space-y-6 max-w-xl mx-auto">
            <div className="flex justify-center text-emerald-500">
              <CheckCircle className="w-16 h-16 animate-bounce" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Appointment Booked!</h2>
            <p className="text-xs text-slate-550 leading-relaxed dark:text-slate-400">
              Dear <strong>{name}</strong>, your request has been confirmed. A simulated WhatsApp alert containing confirmation details, timing schedules, and map directions has been logged.
            </p>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-100 dark:border-slate-800 text-left text-xs text-slate-500 space-y-2">
              <div><span className="font-bold">Consulting Doctor:</span> {selectedDoctorRecord?.name}</div>
              <div><span className="font-bold">Department:</span> {DEPARTMENTS.find(d => d.id === departmentId)?.name}</div>
              <div><span className="font-bold">Scheduled Slot:</span> {date} at {timeSlot}</div>
              <div><span className="font-bold">Helpline:</span> 088881 50101</div>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Schedule Another Slot
              </button>
              <button
                onClick={() => handleReset()}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { Suspense } from "react";

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={
      <div className="py-20 text-center text-slate-500 font-medium">
        Loading booking slot details...
      </div>
    }>
      <BookAppointmentForm />
    </Suspense>
  );
}
