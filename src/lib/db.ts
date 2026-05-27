import { prisma } from "./prisma";
import { DEPARTMENTS, DepartmentData } from "../constants/departments";
import { DOCTORS, DoctorData } from "../constants/doctors";
import { BLOGS, BlogData } from "../constants/blogs";
import { FAQS, FAQData } from "../constants/faqs";

// Persistent global memory cache for mock database mode
const globalForDb = global as unknown as {
  appointments: any[];
  queries: any[];
  testimonials: any[];
  blogs: any[];
};

if (!globalForDb.appointments) {
  globalForDb.appointments = [
    {
      id: "apt-mock-1",
      patientName: "Swapnil Shinde",
      patientMobile: "9876543210",
      patientEmail: "swapnil@gmail.com",
      departmentId: "dept-gynecology",
      doctorId: "doc-snehal-jagtap",
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      timeSlot: "10:00 AM",
      symptoms: "Routine pregnancy checkup",
      status: "CONFIRMED",
      notes: "First time visit. Keep patient records ready.",
      createdAt: new Date()
    },
    {
      id: "apt-mock-2",
      patientName: "Aditya Patil",
      patientMobile: "8888899999",
      patientEmail: "aditya@outlook.com",
      departmentId: "dept-cardiology",
      doctorId: "doc-rajesh-shinde",
      date: new Date(Date.now() + 86400000), // 1 day from now
      timeSlot: "11:00 AM",
      symptoms: "Minor chest pain during cardio exercises",
      status: "PENDING",
      notes: "",
      createdAt: new Date()
    }
  ];
}
if (!globalForDb.queries) {
  globalForDb.queries = [
    {
      id: "q-mock-1",
      name: "Ramesh Pawar",
      email: "ramesh@pawar.com",
      phone: "09999988888",
      subject: "Inquiry regarding Dialysis timing slots",
      message: "Hello, my father requires weekly dialysis. Do you have slots available on Sunday evenings? Please let me know.",
      read: false,
      createdAt: new Date()
    }
  ];
}
if (!globalForDb.testimonials) {
  globalForDb.testimonials = [
    {
      id: "t-mock-1",
      patientName: "Anjali Deshmukh",
      rating: 5,
      review: "Sai Sneh Hospital provided exceptional care during my high-risk delivery. Dr. Snehal Jagtap was incredibly reassuring and professional. The nurses and ICU stabilizers were world-class.",
      relation: "Patient",
      active: true,
      createdAt: new Date()
    },
    {
      id: "t-mock-2",
      patientName: "Karan Shah",
      rating: 5,
      review: "The dialysis unit here is very modern and absolutely clean. Dr. Kadam is very helpful and explains everything patiently. Truly the best healthcare center in Katraj.",
      relation: "Son of Patient",
      active: true,
      createdAt: new Date()
    },
    {
      id: "t-mock-3",
      patientName: "Sunita More",
      rating: 5,
      review: "My husband was admitted to the ICU in a critical state due to sudden cardiac discomfort. Dr. Rajesh Shinde and the emergency team stabilized him within minutes. Outstanding service!",
      relation: "Wife of Patient",
      active: true,
      createdAt: new Date()
    }
  ];
}
if (!globalForDb.blogs) {
  globalForDb.blogs = [...BLOGS];
}

const isMock = () => {
  return process.env.NEXT_PUBLIC_MOCK_DB === "true" || !process.env.DATABASE_URL;
};

// --- DEPARTMENTS ---
export async function getDepartments(): Promise<DepartmentData[]> {
  if (isMock()) {
    return DEPARTMENTS;
  }
  try {
    const dbDepts = await prisma.department.findMany({
      orderBy: { name: "asc" }
    });
    if (dbDepts.length === 0) return DEPARTMENTS;
    return dbDepts.map(d => ({
      id: d.id,
      name: d.name,
      slug: d.slug,
      description: d.description,
      icon: d.icon,
      image: d.image || ""
    }));
  } catch (error) {
    console.error("Database connection failed, falling back to mock:", error);
    return DEPARTMENTS;
  }
}

// --- DOCTORS ---
export async function getDoctors(): Promise<DoctorData[]> {
  if (isMock()) {
    return DOCTORS;
  }
  try {
    const dbDocs = await prisma.doctor.findMany({
      include: { department: true }
    });
    if (dbDocs.length === 0) return DOCTORS;
    return dbDocs.map(d => ({
      id: d.id,
      name: d.name,
      slug: d.slug,
      email: d.email,
      mobile: d.mobile,
      qualification: d.qualification,
      experience: d.experience,
      biography: d.biography,
      image: d.image,
      specialty: d.specialty,
      departmentId: d.departmentId,
      timingSlots: d.timingSlots as string[],
      available: d.available
    }));
  } catch (error) {
    console.error("Database connection failed, falling back to mock:", error);
    return DOCTORS;
  }
}

export async function getDoctorBySlug(slug: string): Promise<DoctorData | null> {
  if (isMock()) {
    return DOCTORS.find(d => d.slug === slug) || null;
  }
  try {
    const doc = await prisma.doctor.findUnique({
      where: { slug }
    });
    if (!doc) return null;
    return {
      id: doc.id,
      name: doc.name,
      slug: doc.slug,
      email: doc.email,
      mobile: doc.mobile,
      qualification: doc.qualification,
      experience: doc.experience,
      biography: doc.biography,
      image: doc.image,
      specialty: doc.specialty,
      departmentId: doc.departmentId,
      timingSlots: doc.timingSlots as string[],
      available: doc.available
    };
  } catch {
    return DOCTORS.find(d => d.slug === slug) || null;
  }
}

// --- APPOINTMENTS ---
export async function getAppointments() {
  if (isMock()) {
    return globalForDb.appointments;
  }
  try {
    return await prisma.appointment.findMany({
      include: { department: true, doctor: true },
      orderBy: { date: "asc" }
    });
  } catch {
    return globalForDb.appointments;
  }
}

export async function createAppointment(data: {
  patientName: string;
  patientMobile: string;
  patientEmail: string;
  departmentId: string;
  doctorId: string;
  date: Date;
  timeSlot: string;
  symptoms?: string;
  notes?: string;
}) {
  if (isMock()) {
    const newApt = {
      id: `apt-mock-${Date.now()}`,
      ...data,
      status: "PENDING",
      createdAt: new Date()
    };
    globalForDb.appointments.unshift(newApt);
    return newApt;
  }
  return await prisma.appointment.create({
    data: {
      patientName: data.patientName,
      patientMobile: data.patientMobile,
      patientEmail: data.patientEmail,
      departmentId: data.departmentId,
      doctorId: data.doctorId,
      date: data.date,
      timeSlot: data.timeSlot,
      symptoms: data.symptoms || "",
      notes: data.notes || "",
      status: "PENDING"
    }
  });
}

export async function updateAppointmentStatus(id: string, status: string, notes?: string) {
  if (isMock()) {
    const idx = globalForDb.appointments.findIndex(a => a.id === id);
    if (idx !== -1) {
      globalForDb.appointments[idx].status = status;
      if (notes !== undefined) globalForDb.appointments[idx].notes = notes;
      return globalForDb.appointments[idx];
    }
    return null;
  }
  return await prisma.appointment.update({
    where: { id },
    data: {
      status: status as any,
      ...(notes !== undefined ? { notes } : {})
    }
  });
}

// --- BLOGS ---
export async function getBlogs(): Promise<BlogData[]> {
  if (isMock()) {
    return globalForDb.blogs;
  }
  try {
    const dbBlogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" }
    });
    if (dbBlogs.length === 0) return globalForDb.blogs;
    return dbBlogs.map(b => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      coverImage: b.coverImage,
      category: b.category,
      tags: b.tags,
      readTime: b.readTime,
      authorName: "Sai Sneh Editorial Team",
      authorRole: "Medical Advisory",
      createdAt: b.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }));
  } catch {
    return globalForDb.blogs;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogData | null> {
  if (isMock()) {
    return globalForDb.blogs.find(b => b.slug === slug) || null;
  }
  try {
    const b = await prisma.blog.findUnique({
      where: { slug }
    });
    if (!b) return null;
    return {
      id: b.id,
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      coverImage: b.coverImage,
      category: b.category,
      tags: b.tags,
      readTime: b.readTime,
      authorName: "Sai Sneh Editorial Team",
      authorRole: "Medical Advisory",
      createdAt: b.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };
  } catch {
    return globalForDb.blogs.find(b => b.slug === slug) || null;
  }
}

export async function createBlog(data: any) {
  if (isMock()) {
    const newBlog = {
      id: `blog-mock-${Date.now()}`,
      ...data,
      authorName: "Sai Sneh Administrator",
      authorRole: "Hospital Admin",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };
    globalForDb.blogs.unshift(newBlog);
    return newBlog;
  }
  // Prisma fallback omitted for mock brevity
  return null;
}

// --- CONTACT QUERIES ---
export async function getContactQueries() {
  if (isMock()) {
    return globalForDb.queries;
  }
  try {
    return await prisma.contactQuery.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch {
    return globalForDb.queries;
  }
}

export async function createContactQuery(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  if (isMock()) {
    const newQuery = {
      id: `q-mock-${Date.now()}`,
      ...data,
      read: false,
      createdAt: new Date()
    };
    globalForDb.queries.unshift(newQuery);
    return newQuery;
  }
  try {
    return await prisma.contactQuery.create({ data });
  } catch {
    return null;
  }
}

export async function markQueryAsRead(id: string) {
  if (isMock()) {
    const q = globalForDb.queries.find(x => x.id === id);
    if (q) q.read = true;
    return q;
  }
  try {
    return await prisma.contactQuery.update({
      where: { id },
      data: { read: true }
    });
  } catch {
    return null;
  }
}

// --- TESTIMONIALS ---
export async function getTestimonials() {
  if (isMock()) {
    return globalForDb.testimonials;
  }
  try {
    return await prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" }
    });
  } catch {
    return globalForDb.testimonials;
  }
}

export async function createTestimonial(data: {
  patientName: string;
  rating: number;
  review: string;
  relation: string;
}) {
  if (isMock()) {
    const newT = {
      id: `t-mock-${Date.now()}`,
      ...data,
      active: true,
      createdAt: new Date()
    };
    globalForDb.testimonials.unshift(newT);
    return newT;
  }
  try {
    return await prisma.testimonial.create({
      data: {
        patientName: data.patientName,
        rating: data.rating,
        review: data.review,
        relation: data.relation,
        active: true
      }
    });
  } catch {
    return null;
  }
}
