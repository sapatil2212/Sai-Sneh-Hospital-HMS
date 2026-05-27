"use server";

import { 
  updateAppointmentStatus, 
  markQueryAsRead, 
  createTestimonial, 
  createBlog, 
  getAppointments,
  getContactQueries,
  getTestimonials
} from "../lib/db";
import { getWhatsAppLogs, sendWhatsAppNotification } from "../services/whatsapp";

// --- UPDATE APPOINTMENT STATUS ---
export async function updateAppointmentStatusAction(id: string, status: string, notes?: string) {
  try {
    const updated = await updateAppointmentStatus(id, status, notes);
    
    if (updated) {
      // If completed or confirmed, simulate triggering corresponding notifications
      if (status === "CONFIRMED") {
        await sendWhatsAppNotification(
          updated.patientMobile,
          updated.patientName,
          "reminder",
          {
            doctorName: "our specialist",
            timeSlot: updated.timeSlot
          }
        );
      } else if (status === "COMPLETED") {
        await sendWhatsAppNotification(
          updated.patientMobile,
          updated.patientName,
          "followup",
          { doctorName: "our specialist" }
        );
      }
      return { success: true, appointment: updated };
    }
    return { success: false, error: "Appointment not found." };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update appointment." };
  }
}

// --- WHATSAPP SIMULATION LOGS ---
export async function getWhatsAppLogsAction() {
  try {
    return { success: true, logs: getWhatsAppLogs() };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to retrieve logs." };
  }
}

// --- QUERY MANAGER ---
export async function markQueryAsReadAction(id: string) {
  try {
    const res = await markQueryAsRead(id);
    return { success: true, query: res };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update query status." };
  }
}

// --- CREATE TESTIMONIAL ---
export async function submitTestimonialAction(data: {
  patientName: string;
  rating: number;
  review: string;
  relation: string;
}) {
  try {
    if (!data.patientName || !data.review || !data.relation) {
      return { success: false, error: "Please fill in all fields." };
    }
    const t = await createTestimonial(data);
    return { success: true, testimonial: t };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to post review." };
  }
}

// --- CREATE BLOG ACTION ---
export async function createNewBlogAction(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  readTime: string;
}) {
  try {
    if (!data.title || !data.slug || !data.excerpt || !data.content) {
      return { success: false, error: "All core fields are required." };
    }
    const b = await createBlog({
      ...data,
      published: true
    });
    return { success: true, blog: b };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to create blog post." };
  }
}

// --- GET ANALYTICS DATA ---
export async function getAnalyticsAction() {
  try {
    const appointments = await getAppointments();
    const queries = await getContactQueries();
    const testimonials = await getTestimonials();

    // 1. Calculate overall counts
    const totalAppointments = appointments.length;
    const pendingAppointments = appointments.filter((a: any) => a.status === "PENDING").length;
    const confirmedAppointments = appointments.filter((a: any) => a.status === "CONFIRMED").length;
    const completedAppointments = appointments.filter((a: any) => a.status === "COMPLETED").length;
    const cancelledAppointments = appointments.filter((a: any) => a.status === "CANCELLED").length;

    // 2. Department Breakdown
    const deptBreakdown: Record<string, number> = {};
    appointments.forEach((a: any) => {
      // Handles both Prisma joins and mock structures
      const deptName = a.department?.name || (a.departmentId === "dept-gynecology" ? "Gynecology" : "Cardiology");
      deptBreakdown[deptName] = (deptBreakdown[deptName] || 0) + 1;
    });

    const deptChartData = Object.entries(deptBreakdown).map(([name, value]) => ({
      name,
      value
    }));

    // 3. Weekly Trends (Mock trends mapped to dates)
    const dailyAppointmentsTrend = [
      { day: "Mon", count: 12 },
      { day: "Tue", count: 19 },
      { day: "Wed", count: 15 },
      { day: "Thu", count: 22 },
      { day: "Fri", count: 30 },
      { day: "Sat", count: 18 },
      { day: "Sun", count: 8 }
    ];

    // 4. Financial Statistics (Mocked revenue)
    const financialStats = {
      totalRevenue: totalAppointments * 800, // Average consultation fee ₹800
      cashlessRatio: 0.65, // 65% cashless
      cashlessCount: Math.round(totalAppointments * 0.65),
      paidCount: totalAppointments - Math.round(totalAppointments * 0.65)
    };

    // 5. Bed Availability Metrics
    const bedAvailability = [
      { type: "ICU Beds", total: 12, occupied: 8, color: "#ef4444" },
      { type: "Maternity Wards", total: 15, occupied: 11, color: "#10b981" },
      { type: "Dialysis Stations", total: 10, occupied: 6, color: "#06b6d4" },
      { type: "General Ward", total: 13, occupied: 9, color: "#3b82f6" }
    ];

    return {
      success: true,
      data: {
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
        totalQueries: queries.length,
        unreadQueries: queries.filter((q: any) => !q.read).length,
        totalTestimonials: testimonials.length,
        deptChartData,
        dailyAppointmentsTrend,
        financialStats,
        bedAvailability
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to calculate analytics." };
  }
}
