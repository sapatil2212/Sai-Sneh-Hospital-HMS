export interface PartnerData {
  name: string;
  type: "government" | "tpa" | "corporate";
  logoText: string;
  description: string;
}

export const INSURANCE_PARTNERS: PartnerData[] = [
  {
    name: "PMJAY (Ayushman Bharat)",
    type: "government",
    logoText: "PMJAY",
    description: "National health protection scheme providing free cashless tertiary care coverage up to ₹5 Lakhs per family."
  },
  {
    name: "MPJAY (Mahatma Jyotirao Phule Jan Arogya Yojana)",
    type: "government",
    logoText: "MPJAY",
    description: "State government scheme offering cash-free medical treatment for yellow/orange ration card holders in Maharashtra."
  },
  {
    name: "PMC (Pune Municipal Corporation)",
    type: "government",
    logoText: "PMC",
    description: "Provides medical reimbursement and cashless treatments for PMC employees and citizens under municipal health schemes."
  },
  {
    name: "MPKAY (Maharashtra Police Kutumb Arogya Yojna)",
    type: "government",
    logoText: "MPKAY",
    description: "Exclusive cashless medical services for officers and dependents of the Maharashtra Police Department."
  },
  {
    name: "PMPML & PMT Health Scheme",
    type: "government",
    logoText: "PMPML",
    description: "Health benefits and cashless hospitalization cover for public transport employees and retired staff of Pune."
  },
  {
    name: "Star Health & Allied Insurance",
    type: "tpa",
    logoText: "Star Health",
    description: "Hassle-free cashless approval for Star Health cardholders across all maternity and multi-specialty treatments."
  },
  {
    name: "ICICI Lombard General Insurance",
    type: "tpa",
    logoText: "ICICI Lombard",
    description: "Instant cashless pre-authorization and quick settlement for corporate and individual policies."
  },
  {
    name: "HDFC ERGO General Insurance",
    type: "tpa",
    logoText: "HDFC ERGO",
    description: "Comprehensive cashless coverage with dedicated HDFC desk support for smooth discharge process."
  },
  {
    name: "Niva Bupa Health Insurance",
    type: "tpa",
    logoText: "Niva Bupa",
    description: "Pre-approved cashless access within 2 hours of admission for all eligible procedures."
  },
  {
    name: "Care Health Insurance",
    type: "tpa",
    logoText: "Care Health",
    description: "Wide network coverage for critical care, ICU admissions, dialysis sessions, and surgeries."
  },
  {
    name: "Bajaj Allianz Health Insurance",
    type: "tpa",
    logoText: "Bajaj Allianz",
    description: "Local Pune-based rapid claim support for cashless maternity, pediatric, and surgical operations."
  }
];
