export interface BlogData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  readTime: string;
  authorName: string;
  authorRole: string;
  createdAt: string;
}

export const BLOGS: BlogData[] = [
  {
    id: "blog-1",
    title: "Understanding Dialysis: What to Expect and How to Care for Your Kidneys",
    slug: "understanding-dialysis-care",
    excerpt: "Learn about the hemodialysis process, why it is critical for renal failure, and how to maintain high quality of life with regular sessions.",
    content: `<p>Hemodialysis is a vital medical treatment that filters waste and excess fluids from your blood when your kidneys are no longer able to do so effectively. For patients living with Stage 5 Chronic Kidney Disease (CKD) or acute kidney failure, the Dialysis Center at Sai Sneh Hospital provides a crucial lifeline.</p>
    
    <h3>What Happens During a Dialysis Session?</h3>
    <p>During hemodialysis, your blood is gently pumped out of your body into a dialysis machine (often called an artificial kidney). The machine uses a special filter called a dialyzer to clean your blood. The clean blood is then returned safely to your body. Each session typically lasts about 3 to 4 hours and is performed 2 to 3 times a week, depending on your nephrologist's recommendation.</p>
    
    <h3>Tips for Kidney Care & Dialysis Patients</h3>
    <ul>
      <li><strong>Manage Fluid Intake:</strong> Since kidneys aren't filtering fluids, excess water can accumulate, putting pressure on your heart and lungs. Monitor daily intake strictly.</li>
      <li><strong>Follow a Renal-Friendly Diet:</strong> Limit foods high in potassium, phosphorus, and sodium. Focus on high-quality proteins as suggested by your renal nutritionist.</li>
      <li><strong>Monitor Blood Pressure:</strong> Hypertension is both a cause and a symptom of kidney disease. Ensure regular monitoring.</li>
      <li><strong>Never Skip Sessions:</strong> Consistently attending your scheduled sessions is the single most important factor in maintaining energy and longevity.</li>
    </ul>
    
    <h3>Our Dialysis Facility in Katraj</h3>
    <p>At Sai Sneh Hospital, our Dialysis Center operates with advanced medical technology, strict sanitization protocols, and comfortable, reclining stations. Under the constant guidance of Dr. Mahendra Kadam and our trained technicians, we strive to make every session as stress-free and smooth as possible.</p>`,
    coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop",
    category: "Nephrology",
    tags: ["Kidney Health", "Dialysis", "Patient Guide"],
    readTime: "5 min read",
    authorName: "Dr. Mahendra Kadam",
    authorRole: "Consultant Nephrologist",
    createdAt: "May 10, 2026"
  },
  {
    id: "blog-2",
    title: "Preparing for Motherhood: A Guide to High-Risk Pregnancy Management",
    slug: "maternity-guide-high-risk-pregnancy",
    excerpt: "Insights on managing pregnancy risk factors, essential screenings, and steps to ensure a healthy delivery for you and your newborn.",
    content: `<p>A pregnancy is classified as 'high-risk' when there are potential complications that could affect the mother, the baby, or both. While the term sounds alarming, early detection and dedicated medical care lead to successful, healthy deliveries in the vast majority of cases.</p>
    
    <h3>Common Risk Factors</h3>
    <p>Several factors can contribute to a high-risk pregnancy, including maternal age (under 17 or over 35), pre-existing medical conditions (like diabetes, chronic hypertension, or thyroid disorders), conditions arising during pregnancy (such as gestational diabetes or preeclampsia), and multiple pregnancies (twins or triplets).</p>
    
    <h3>Essential Care Guidelines</h3>
    <ul>
      <li><strong>Regular Prenatal Visits:</strong> Frequent checkups allow obstetricians to monitor fetal growth and track maternal vitals.</li>
      <li><strong>Advanced Screenings:</strong> Ultrasound scans, anomaly scans, and maternal serum screenings are crucial for detecting developmental issues.</li>
      <li><strong>Customized Nutrition & Rest:</strong> A dietitian-recommended meal plan helps control gestational blood sugars. Proper rest minimizes stress and blood pressure fluctuations.</li>
    </ul>
    
    <h3>Maternity Home Legacy at Sai Sneh</h3>
    <p>With a 39-year heritage of serving expectant mothers in Pune, Dr. Snehal Jagtap and the maternity team at Sai Sneh Hospital offer complete support, from prenatal counseling and high-risk monitoring to state-of-the-art labor rooms, neonatal ICU stabilizers, and post-delivery lactation support.</p>`,
    coverImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop",
    category: "Gynecology & Maternity",
    tags: ["Maternity", "Pregnancy Care", "Newborns"],
    readTime: "6 min read",
    authorName: "Dr. Snehal Jagtap",
    authorRole: "Chief Gynecologist & Obstetrician",
    createdAt: "April 22, 2026"
  },
  {
    id: "blog-3",
    title: "Signs of Heart Trouble You Should Never Ignore",
    slug: "cardiac-warning-signs",
    excerpt: "Recognize the early red flags of cardiovascular diseases, understand heart attack symptoms, and learn when to seek emergency ICU care.",
    content: `<p>Cardiovascular diseases remain a leading cause of health emergencies worldwide. Recognizing the signs of heart trouble early can mean the difference between minor medical management and a life-threatening heart attack.</p>
    
    <h3>Key Red Flags</h3>
    <ul>
      <li><strong>Chest Discomfort:</strong> Pressure, fullness, squeezing, or pain in the center of the chest that lasts for more than a few minutes or goes away and comes back.</li>
      <li><strong>Shortness of Breath:</strong> Feeling winded or unable to catch your breath, with or without chest discomfort, even while resting.</li>
      <li><strong>Radiating Pain:</strong> Pain that spreads to the shoulders, neck, jaw, back, or down the left arm.</li>
      <li><strong>Cold Sweats and Dizziness:</strong> Breaking out in a cold sweat, feeling lightheaded, or experiencing sudden fatigue without exertion.</li>
    </ul>
    
    <h3>When is it an Emergency?</h3>
    <p>If you or anyone around you experiences these symptoms for more than 5 minutes, seek immediate medical attention. Do not attempt to drive yourself to the hospital. Call our 24x7 Emergency line at 088881 50101 immediately to activate our ambulance services.</p>
    
    <h3>Cardiac Stabilization at Sai Sneh Hospital</h3>
    <p>Equipped with a modern ICU and on-call cardiologist Dr. Rajesh Shinde, we provide rapid cardiac triage, thrombolysis, continuous multi-channel monitoring, and immediate stabilization to protect heart tissue and save lives during the critical 'golden hour'.</p>`,
    coverImage: "https://images.unsplash.com/photo-1579684389782-64d84b5e902a?q=80&w=800&auto=format&fit=crop",
    category: "Cardiology",
    tags: ["Heart Care", "Emergency", "Preventive Health"],
    readTime: "4 min read",
    authorName: "Dr. Rajesh Shinde",
    authorRole: "Consultant Cardiologist",
    createdAt: "May 05, 2026"
  }
];
