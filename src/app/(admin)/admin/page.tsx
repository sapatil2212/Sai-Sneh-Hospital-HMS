import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { 
  getAppointments, 
  getContactQueries, 
  getTestimonials, 
  getBlogs 
} from "@/lib/db";
import { getWhatsAppLogsAction, getAnalyticsAction } from "@/actions/admin";
import AdminDashboard from "@/modules/AdminDashboard";

export default async function AdminPage() {
  const session = await getSession();

  // Route security gate: unauthenticated attempts redirect to login card
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch data directly on the server
  const appointments = await getAppointments();
  const queries = await getContactQueries();
  const testimonials = await getTestimonials();
  const blogs = await getBlogs();
  
  const waRes = await getWhatsAppLogsAction();
  const waLogs = waRes.success && waRes.logs ? waRes.logs : [];

  const analyticsRes = await getAnalyticsAction();
  const analytics = analyticsRes.success ? analyticsRes.data : {
    totalAppointments: 0,
    pendingAppointments: 0,
    deptChartData: [],
    dailyAppointmentsTrend: [],
    financialStats: { cashlessRatio: 0, cashlessCount: 0, paidCount: 0 },
    bedAvailability: []
  };

  return (
    <AdminDashboard
      appointments={appointments}
      queries={queries}
      testimonials={testimonials}
      blogs={blogs}
      waLogs={waLogs}
      analytics={analytics}
    />
  );
}
