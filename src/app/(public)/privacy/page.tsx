export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-20 font-sans max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-750">
      <h1 className="text-3xl font-extrabold text-slate-900 border-b pb-4">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Last updated: May 27, 2026</p>
      
      <p className="text-sm leading-relaxed">
        At Sai Sneh Hospital, we prioritize the confidentiality of patient personal and medical records. This privacy policy describes what details we log via our digital portal and how we process and safeguard clinical notes.
      </p>

      <section className="space-y-3">
        <h3 className="font-bold text-base text-slate-800">1. Information We Collect</h3>
        <p className="text-xs leading-relaxed text-slate-500">
          When booking an appointment or messaging our help desk, we collect: patient full name, active mobile number, email, symptoms, preferred date, and department references. These details are stored to schedule doctor timings and dispatch confirmations.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="font-bold text-base text-slate-800">2. Sharing Medical Information</h3>
        <p className="text-xs leading-relaxed text-slate-500">
          We do not sell, rent, or distribute patient medical histories. We only share details with corporate health TPAs or government schemes (e.g. PMC, MPJAY) to verify claims and authorize cashless billing.
        </p>
      </section>

      <section className="space-y-3">
        <h3 className="font-bold text-base text-slate-800">3. In-App Simulations</h3>
        <p className="text-xs leading-relaxed text-slate-500">
          The booking forms trigger mock WhatsApp notification logs and simulation messages displayed inside our administrative panels to model live hospital notifications.
        </p>
      </section>

      <p className="text-xs text-slate-400 pt-4 border-t">
        For inquiries regarding patient record corrections, please contact our administrator at info@saisnehhospital.com.
      </p>
    </div>
  );
}
