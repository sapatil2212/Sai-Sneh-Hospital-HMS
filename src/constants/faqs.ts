export interface FAQData {
  id: string;
  question: string;
  answer: string;
  category: "general" | "insurance" | "services" | "dialysis";
}

export const FAQS: FAQData[] = [
  {
    id: "faq-1",
    question: "What are the visiting hours for the Sai Sneh Hospital ICU?",
    answer: "To ensure patient recovery and minimize infection risk, ICU visiting hours are strictly limited to 11:00 AM - 12:00 PM and 5:00 PM - 6:00 PM. Only one immediate family member is allowed inside the ICU during these times with a valid visitor pass.",
    category: "general"
  },
  {
    id: "faq-2",
    question: "Does the hospital provide cashless insurance facilities?",
    answer: "Yes, Sai Sneh Hospital offers cashless facilities for all major Mediclaim insurances, and government schemes including PMC (Pune Municipal Corporation), PMPML, MPKAY (Maharashtra Police Kutumb Arogya Yojna), PMT, MPJAY (Mahatma Jyotirao Phule Jan Arogya Yojana), and PMJAY (Ayushman Bharat).",
    category: "insurance"
  },
  {
    id: "faq-3",
    question: "Is the emergency department open 24x7?",
    answer: "Yes, our Emergency and Trauma Care unit, along with the Intensive Care Unit (ICU) and pharmacy, is fully functional 24 hours a day, 7 days a week, including Sundays and public holidays. Specialist doctors are available on-call around the clock.",
    category: "services"
  },
  {
    id: "faq-4",
    question: "How do I schedule a regular dialysis session at the hospital?",
    answer: "To schedule a dialysis session, please book an appointment online or contact our Dialysis Center desk directly at 088881 50101. First-time patients will require a nephrologist consultation at our hospital to review blood reports and verify prescription logs.",
    category: "dialysis"
  },
  {
    id: "faq-5",
    question: "Can I book a doctor's appointment online?",
    answer: "Yes, our integrated online appointment booking system allows you to select your preferred department, choice of doctor, and convenient date and time slot. Upon submission, you will receive an instant confirmation via email and a simulated WhatsApp notification.",
    category: "general"
  },
  {
    id: "faq-6",
    question: "What documents are required for cash-free admission under MPJAY / PMJAY?",
    answer: "You will need to present: (1) Active Ration Card (Yellow or Orange), (2) Aadhaar Card, (3) Income Certificate (if applicable), and (4) Doctor's referral letter indicating necessity for hospitalization. Our dedicated desk near reception will assist you with approvals.",
    category: "insurance"
  },
  {
    id: "faq-7",
    question: "Does Sai Sneh Hospital have an in-house ambulance service?",
    answer: "Yes, we operate a 24x7 ambulance service equipped with life support systems for immediate patient transport in and around Katraj, Pune. You can request an ambulance directly by tapping the emergency call button on our website.",
    category: "services"
  }
];
