import { getSession } from "@/lib/auth";
import Link from "next/link";
import { 
  HeartPulse, 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  Sparkles, 
  MessageSquareCode, 
  LogOut, 
  FileText,
  Bell,
  Sliders,
  UserCheck
} from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { redirect } from "next/navigation";

// Form Action wrapper for logout
async function handleLogout() {
  "use server";
  await logoutAction();
  redirect("/admin/login");
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If not logged in, render the login child directly (no sidebar or nav wrap)
  if (!session) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950">{children}</div>;
  }

  const sidebarLinks = [
    { label: "Overview Panel", path: "/admin", icon: LayoutDashboard },
    { label: "Appointments", path: "/admin?tab=appointments", icon: CalendarCheck },
    { label: "Patient Records", path: "/admin?tab=patients", icon: Users },
    { label: "Blog Posts CMS", path: "/admin?tab=blogs", icon: FileText },
    { label: "Enquiries Desk", path: "/admin?tab=queries", icon: MessageSquareCode },
    { label: "Testimonials", path: "/admin?tab=testimonials", icon: Sliders }
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <div className="p-1.5 bg-brand-teal/15 rounded-lg">
              <HeartPulse className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-800 dark:text-white block leading-tight">Sai Sneh</span>
              <span className="text-[9px] font-bold text-slate-400 block tracking-widest uppercase">Admin Desk</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-teal transition-all group"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-brand-teal transition-colors shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <form action={handleLogout}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Log Out Desk</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Workspace Top Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-205 dark:border-slate-800 h-16 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">Active Session:</span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-brand-teal/10 rounded-full flex items-center justify-center font-bold text-xs text-brand-teal">
                {session.name.charAt(0)}
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{session.name}</span>
            </div>
            <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-250">
              {session.role}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Direct Web Shortcut */}
            <Link
              href="/"
              className="text-xs text-brand-teal hover:underline font-semibold"
            >
              Back to Website
            </Link>

            {/* Notification Badge */}
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-teal rounded-full" />
            </button>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
