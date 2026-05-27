export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-750">
      <h1 className="text-3xl font-extrabold text-slate-900 border-b pb-4">Terms & Conditions</h1>
      <p className="text-xs text-slate-400">Last updated: May 27, 2026</p>
      
      <p className="text-sm leading-relaxed">
        By using the online scheduling portal or booking services of Sai Sneh Hospital (Pune), you agree to comply with our terms of medical admissions.
      </p>

      <section className="space-y-3">
        <h3 className="font-bold text-base text-slate-800">1. Consulting Slots & Timings</h3>
        <p className="text-xs leading-relaxed text-slate-500">
          Online appointments represent a request for scheduling a slot. While we make every effort to accommodate preferred hours, emergency surgical events may alter doctor availability. Our reception will contact you to reschedule if necessary.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="font-bold text-base text-slate-800">2. Pre-Authorization & Cashless Billing</h3>
        <p className="text-xs leading-relaxed text-slate-500">
          Pre-auth approvals are managed under networks policies. Sai Sneh Hospital does not dictate claims approvals. If the insurance provider queries or rejects a cashless claim, the patient is required to clear all hospital dues at discharge.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="font-bold text-base text-slate-800">3. Emergency Admissions</h3>
        <p className="text-xs leading-relaxed text-slate-500">
          Critical care admissions in the ICU or Trauma Center are prioritized based on clinical triage (severity of symptoms), not on booking queues.
        </p>
      </section>

      <p className="text-xs text-slate-400 pt-4 border-t">
        For planned surgeries or ICU policies details, please visit our reception desk near Katraj Vasahat, Pune.
      </p>
    </div>
  );
}
