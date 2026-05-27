export interface DepartmentData {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Lucide icon name
  image: string;
}

export const DEPARTMENTS: DepartmentData[] = [
  {
    id: "dept-cardiology",
    name: "Cardiology",
    slug: "cardiology",
    description: "Advanced cardiac care providing diagnostic testing, critical coronary support, and comprehensive cardiovascular checkups by expert heart specialist doctors.",
    icon: "Heart",
    image: "/images/cardiology.png"
  },
  {
    id: "dept-gynecology",
    name: "Gynecology & Obstetrics",
    slug: "gynecology",
    description: "Compassionate maternity, pregnancy care, painless deliveries, high-risk pregnancy management, and full gynecological services serving women for 39+ years.",
    icon: "Baby",
    image: "/images/gynecology.png"
  },
  {
    id: "dept-pediatrics",
    name: "Pediatrics",
    slug: "pediatrics",
    description: "Dedicated child healthcare providing routine vaccinations, developmental screenings, and inpatient support for neonates, infants, and adolescents.",
    icon: "Smile",
    image: "/images/pediatrics.png"
  },
  {
    id: "dept-orthopedics",
    name: "Orthopedics",
    slug: "orthopedics",
    description: "Expert treatment for bone fractures, joint replacements, spinal disorders, arthritis care, and rehabilitation therapies for speedy physical recovery.",
    icon: "Activity",
    image: "/images/orthopedics.png"
  },
  {
    id: "dept-icu",
    name: "Intensive Care Unit (ICU)",
    slug: "icu",
    description: "State-of-the-art 24x7 ICU equipped with advanced ventilators, multi-channel patient monitors, and specialized intensivist care for critical emergencies.",
    icon: "Activity",
    image: "/images/icu.png"
  },
  {
    id: "dept-dialysis",
    name: "Dialysis Center",
    slug: "dialysis",
    description: "Premium kidney care offering regular hemodialysis sessions, modern dialysis machines, sterilized stations, and expert nephrologist oversight.",
    icon: "ShieldAlert",
    image: "/images/dialysis.png"
  },
  {
    id: "dept-general-medicine",
    name: "General Medicine",
    slug: "general-medicine",
    description: "Comprehensive primary healthcare covering diabetes management, hypertension, infectious diseases, lifestyle disorders, and health checkups.",
    icon: "Stethoscope",
    image: "/images/general_medicine.png"
  },
  {
    id: "dept-surgery",
    name: "General & Laparoscopic Surgery",
    slug: "surgery",
    description: "Advanced surgical theatre performing minimally invasive laparoscopy, appendectomies, hernia repairs, and general gastrointestinal surgeries.",
    icon: "Syringe",
    image: "/images/surgery.png"
  },
  {
    id: "dept-emergency",
    name: "24x7 Emergency Care",
    slug: "emergency-care",
    description: "Rapid trauma and critical care response unit with dedicated trauma beds, emergency doctors, and on-call specialist surgeons available 24/7.",
    icon: "PhoneCall",
    image: "/images/emergency.png"
  }
];
