export interface DoctorData {
  id: string;
  name: string;
  slug: string;
  email: string;
  mobile: string;
  qualification: string;
  experience: number; // in years
  biography: string;
  image: string;
  specialty: string;
  departmentId: string;
  timingSlots: string[];
  available: boolean;
}

export const DOCTORS: DoctorData[] = [
  {
    id: "doc-snehal-jagtap",
    name: "Dr. Snehal Jagtap",
    slug: "dr-snehal-jagtap",
    email: "snehal.jagtap@saisneh.com",
    mobile: "088881 50101",
    qualification: "MBBS, DGO, DNB (Obstetrics & Gynecology)",
    experience: 18,
    biography: "Dr. Snehal Jagtap is a senior obstetrician and gynecologist with over 18 years of clinical experience. She specializes in high-risk pregnancy care, painless labor, infertility treatments, and laparoscopic gynecological surgeries. She is dedicated to providing compassionate, personalized care to mothers and children.",
    image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=400&auto=format&fit=crop",
    specialty: "High-Risk Pregnancy, Laparoscopic Gynac Surgery",
    departmentId: "dept-gynecology",
    timingSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "05:00 PM", "06:00 PM", "07:00 PM"],
    available: true
  },
  {
    id: "doc-rajesh-shinde",
    name: "Dr. Rajesh Shinde",
    slug: "dr-rajesh-shinde",
    email: "rajesh.shinde@saisneh.com",
    mobile: "088881 50102",
    qualification: "MBBS, MD (General Medicine), DM (Cardiology)",
    experience: 15,
    biography: "Dr. Rajesh Shinde is a renowned cardiologist specializing in interventional cardiology, echocardiography, and preventive cardiac healthcare. He has managed hundreds of critical cardiac arrests in the Sai Sneh ICU and runs the advanced cardiac screening division.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
    specialty: "Interventional Cardiology & Cardiac Rehabilitation",
    departmentId: "dept-cardiology",
    timingSlots: ["10:00 AM", "11:00 AM", "12:00 PM", "04:00 PM", "05:00 PM"],
    available: true
  },
  {
    id: "doc-amit-patil",
    name: "Dr. Amit Patil",
    slug: "dr-amit-patil",
    email: "amit.patil@saisneh.com",
    mobile: "088881 50103",
    qualification: "MBBS, MD (Pediatrics), Fellow in Neonatology",
    experience: 12,
    biography: "Dr. Amit Patil is an expert pediatrician and neonatologist managing childhood infections, immunization schedules, growth tracking, and critical pediatric care. He oversees the pediatric emergency and neonatal stabilization rooms.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
    specialty: "Neonatal Care & Pediatric Development",
    departmentId: "dept-pediatrics",
    timingSlots: ["09:00 AM", "10:30 AM", "11:30 AM", "06:00 PM", "07:00 PM"],
    available: true
  },
  {
    id: "doc-vikram-salunkhe",
    name: "Dr. Vikram Salunkhe",
    slug: "dr-vikram-salunkhe",
    email: "vikram.salunkhe@saisneh.com",
    mobile: "088881 50104",
    qualification: "MBBS, MS (Orthopedics), M.Ch (Joint Replacement)",
    experience: 14,
    biography: "Dr. Vikram Salunkhe is a dynamic orthopedic surgeon with vast experience in joint replacement (hip & knee), complex fracture management, arthroscopic ligament reconstruction, and geriatric bone care. He focuses on enabling rapid post-surgery mobility.",
    image: "https://images.unsplash.com/photo-1625498542602-6bfb30f39b3f?q=80&w=400&auto=format&fit=crop",
    specialty: "Hip/Knee Arthroplasty & Trauma Surgery",
    departmentId: "dept-orthopedics",
    timingSlots: ["11:00 AM", "12:00 PM", "01:00 PM", "05:00 PM", "06:00 PM"],
    available: true
  },
  {
    id: "doc-swapnil-deshmukh",
    name: "Dr. Swapnil Deshmukh",
    slug: "dr-swapnil-deshmukh",
    email: "swapnil.deshmukh@saisneh.com",
    mobile: "088881 50105",
    qualification: "MBBS, MD (Medicine), IDCCM (Critical Care)",
    experience: 11,
    biography: "Dr. Swapnil Deshmukh leads the 24x7 ICU department at Sai Sneh Hospital. He has extensive expertise in managing multi-organ failure, trauma, severe respiratory issues, and post-operative intensive care, ensuring continuous patient monitoring.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop",
    specialty: "Intensive Care Management, Advanced Ventilation",
    departmentId: "dept-icu",
    timingSlots: ["09:00 AM", "12:00 PM", "03:00 PM", "06:00 PM"],
    available: true
  },
  {
    id: "doc-mahendra-kadam",
    name: "Dr. Mahendra Kadam",
    slug: "dr-mahendra-kadam",
    email: "mahendra.kadam@saisneh.com",
    mobile: "088881 50106",
    qualification: "MBBS, MD, DM (Nephrology)",
    experience: 16,
    biography: "Dr. Mahendra Kadam is our chief consultant nephrologist overseeing the Dialysis Center. He specializes in chronic kidney disease (CKD), acute kidney injury, renal hypertension, and kidney transplant counseling.",
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?q=80&w=400&auto=format&fit=crop",
    specialty: "Renal Replacement Therapy & Kidney Care",
    departmentId: "dept-dialysis",
    timingSlots: ["08:00 AM", "09:30 AM", "11:00 AM", "03:00 PM", "04:30 PM"],
    available: true
  },
  {
    id: "doc-rahul-more",
    name: "Dr. Rahul More",
    slug: "dr-rahul-more",
    email: "rahul.more@saisneh.com",
    mobile: "088881 50107",
    qualification: "MBBS, MD (General Medicine)",
    experience: 20,
    biography: "Dr. Rahul More is a senior consulting physician at Sai Sneh Hospital, practicing for two decades. He manages metabolic disorders, diabetes, infectious diseases, and respiratory illnesses. He advocates for preventive healthcare and lifestyle adjustments.",
    image: "https://images.unsplash.com/photo-1637059824899-a441006a6875?q=80&w=400&auto=format&fit=crop",
    specialty: "Diabetes Care, Infectious Diseases, Thyroid Disorders",
    departmentId: "dept-general-medicine",
    timingSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"],
    available: true
  },
  {
    id: "doc-sanjay-mane",
    name: "Dr. Sanjay Mane",
    slug: "dr-sanjay-mane",
    email: "sanjay.mane@saisneh.com",
    mobile: "088881 50108",
    qualification: "MBBS, MS (General Surgery), FIAGES (Laparoscopy)",
    experience: 22,
    biography: "Dr. Sanjay Mane is a senior general and laparoscopic surgeon. He specializes in laser surgeries for piles/fissures, gallbladder removal, appendectomy, hernia repair, and major gastrointestinal surgeries in our state-of-the-art operation theatre.",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=400&auto=format&fit=crop",
    specialty: "Minimal Access (Laparoscopic) Surgery, Laser Proctology",
    departmentId: "dept-surgery",
    timingSlots: ["12:00 PM", "01:00 PM", "02:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"],
    available: true
  },
  {
    id: "doc-emergency",
    name: "Emergency Medical Officer (EMO)",
    slug: "emergency-medical-officer",
    email: "emergency@saisneh.com",
    mobile: "088881 50101",
    qualification: "MBBS (Emergency Protocols Certified)",
    experience: 10,
    biography: "Our on-duty Emergency Medical Officer provides instantaneous triage and stabilization for all trauma and emergency walk-ins. Backed 24x7 by on-call specialists in cardiology, surgery, and orthopedics.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
    specialty: "Trauma Care, Life Support, Immediate Triage",
    departmentId: "dept-emergency",
    timingSlots: ["12:00 AM", "04:00 AM", "08:00 AM", "12:00 PM", "04:00 PM", "08:00 PM"],
    available: true
  }
];
