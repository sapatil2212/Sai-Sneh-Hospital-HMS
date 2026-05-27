"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

interface ChartsProps {
  trendData: { day: string; count: number }[];
  deptData: { name: string; value: number }[];
}

const COLORS = ["#0d9488", "#0284c7", "#06b6d4", "#10b981", "#3b82f6", "#f59e0b", "#6366f1"];

export default function AnalyticsCharts({ trendData, deptData }: ChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
      {/* 1. Appointment Trends (Area Chart) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Volume Tracking</span>
        <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-6">Weekly Appointments Trend</h4>
        
        <div className="h-64 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#94a3b8" />
              <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }} 
              />
              <Area type="monotone" dataKey="count" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Department Breakdown (Bar Chart) */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Specialty Breakdown</span>
        <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-6">Patient Load by Department</h4>
        
        <div className="h-64 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#94a3b8" />
              <YAxis axisLine={false} tickLine={false} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px'
                }} 
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {deptData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
