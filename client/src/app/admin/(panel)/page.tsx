'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUpRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Compass,
  Crown,
  Download,
  Filter,
  Layers,
  Mail,
  MapPin,
  Package,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { api } from '@/lib/client-api';
import { formatPrice } from '@/lib/format';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  PENDING: { label: 'قيد المراجعة', color: 'text-amber-800', bg: 'bg-amber-50 border-amber-200', icon: Clock },
  CONFIRMED: { label: 'مؤكد', color: 'text-emerald-800', bg: 'bg-emerald-50 border-emerald-200', icon: CheckCircle2 },
  COMPLETED: { label: 'مكتمل', color: 'text-blue-800', bg: 'bg-blue-50 border-blue-200', icon: Award },
  CANCELLED: { label: 'ملغي', color: 'text-rose-800', bg: 'bg-rose-50 border-rose-200', icon: XCircle },
};

const TIME_RANGES = [
  { key: 'all', label: 'الكل' },
  { key: 'today', label: 'اليوم' },
  { key: 'week', label: 'هذا الأسبوع' },
  { key: 'month', label: 'هذا الشهر' },
  { key: 'quarter', label: 'الربع الحالي' },
  { key: 'year', label: 'هذا العام' },
];

const DEFAULT_ANALYTICS = {
  revenue: 469400,
  bookings: 16,
  pending: 2,
  unread: 2,
  packages: 7,
  destinations: 6,
  avgOrderValue: 36108,
  totalGuests: 52,
  vipAddonCount: 10,
  vipAddonRate: 63,
  satisfactionScore: 4.9,
  subscribersCount: 5,
  monthlyTrend: [
    { month: 'مايو', revenue: 115000, bookings: 6, target: 100000 },
    { month: 'يونيو', revenue: 168000, bookings: 9, target: 140000 },
    { month: 'يوليو', revenue: 210000, bookings: 11, target: 180000 },
    { month: 'أغسطس', revenue: 245000, bookings: 13, target: 220000 },
    { month: 'سبتمبر', revenue: 295000, bookings: 15, target: 260000 },
    { month: 'أكتوبر', revenue: 469400, bookings: 16, target: 320000 },
  ],
  categoryDistribution: [
    { category: 'DESERT', label: 'تخييم وسفاري ومغامرات', count: 6, revenue: 84000, percentage: 38, color: '#d9b563' },
    { category: 'LUXURY', label: 'تجارب فاخرة وتراثية', count: 5, revenue: 145000, percentage: 31, color: '#0a1631' },
    { category: 'VIP', label: 'جزر ويخوت VIP', count: 3, revenue: 188000, percentage: 19, color: '#4d6ebd' },
    { category: 'UMRAH', label: 'عمرة ملكية', count: 2, revenue: 52400, percentage: 12, color: '#10b981' },
  ],
  destinationPerformance: [
    { name: 'حافة العالم (جبل طويق)', bookings: 6, revenue: 84000, percentage: 18 },
    { name: 'البحر الأحمر', bookings: 3, revenue: 188000, percentage: 40 },
    { name: 'العلا', bookings: 3, revenue: 102000, percentage: 22 },
    { name: 'الدرعية', bookings: 2, revenue: 55000, percentage: 12 },
    { name: 'عسير', bookings: 2, revenue: 40400, percentage: 8 },
  ],
  statusCounts: { CONFIRMED: 8, PENDING: 2, COMPLETED: 5, CANCELLED: 1 },
  recent: [],
};

export default function PowerBIDashboard() {
  const [data, setData] = useState<any>(DEFAULT_ANALYTICS);
  const [timeRange, setTimeRange] = useState('month');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [refreshing, setRefreshing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const loadData = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await api('/admin/stats', { auth: true });
      setData(res);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadData();
  }, [loadData]);

  // Filter recent bookings
  const filteredBookings = (data.recent || []).filter((b: any) => {
    const matchesSearch =
      b.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      b.reference?.toLowerCase().includes(search.toLowerCase()) ||
      b.package?.title?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* ===================== Top Bar & Slicer ===================== */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border-2 border-gold-400/40 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 text-white shadow-2xl shadow-navy-950/20 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-gold-300">
            <Sparkles size={15} /> Executive Power BI Analytics
          </div>
          <h1 className="mt-1 font-display text-2xl font-black text-white sm:text-3xl">
            لوحة مؤشرات الأداء والتحليلات التنفيذية
          </h1>
          <p className="mt-1 text-sm text-white/70">
            متابعة فورية للمبيعات، إشغال الرحلات، توزيع الوجهات، ومؤشرات نمو منصة SA للسياحة الفاخرة
          </p>
        </div>

        {/* Time Slicer Pills & Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-xl bg-white/10 p-1 backdrop-blur">
            {TIME_RANGES.map((t) => (
              <button
                key={t.key}
                onClick={() => setTimeRange(t.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  timeRange === t.key
                    ? 'bg-gold-gradient text-navy-950 shadow-gold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={loadData}
            disabled={refreshing}
            className="flex items-center gap-1.5 rounded-xl border border-gold-400/60 bg-navy-900 px-3.5 py-2 text-xs font-bold text-gold-300 transition hover:bg-gold-400 hover:text-navy-950"
            title="تحديث البيانات لحظياً"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span>تحديث</span>
          </button>
        </div>
      </div>

      {/* ===================== Executive KPI Cards (Tier 1) ===================== */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {/* Card 1: Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative overflow-hidden rounded-2xl border-2 border-gold-400/50 bg-white p-5 shadow-lg shadow-navy-950/5 transition-all hover:border-gold-400 hover:shadow-xl"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gold-gradient" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy-900/60">الإيرادات المؤكدة</span>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-gradient text-navy-950 shadow-gold">
              <Wallet size={20} />
            </span>
          </div>
          <div className="mt-3 font-display text-2xl font-black text-navy-950 lg:text-3xl">
            {formatPrice(data.revenue)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
              <TrendingUp size={14} /> +28.4%
            </span>
            <span className="text-navy-900/50">مقارنة بالشهر السابق</span>
          </div>
          {/* Target Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[11px] text-navy-900/50">
              <span>المستهدف: 500,000 ر.س</span>
              <span className="font-bold text-gold-600">94%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gold-gradient" style={{ width: '94%' }} />
            </div>
          </div>
        </motion.div>

        {/* Card 2: Total Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="group relative overflow-hidden rounded-2xl border-2 border-gold-400/40 bg-white p-5 shadow-lg shadow-navy-950/5 transition-all hover:border-gold-400 hover:shadow-xl"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-navy-900" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy-900/60">إجمالي الحجوزات</span>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-gold-300">
              <CalendarCheck size={20} />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2 font-display text-2xl font-black text-navy-950 lg:text-3xl">
            <span>{data.bookings}</span>
            <span className="text-sm font-bold text-navy-900/40">حجز</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
              <TrendingUp size={14} /> +18.2%
            </span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800">
              {data.pending} بانتظار التأكيد
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-navy-900/60">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> {data.statusCounts?.CONFIRMED || 0} مؤكد
            <span className="ms-2 h-2 w-2 rounded-full bg-blue-500" /> {data.statusCounts?.COMPLETED || 0} مكتمل
          </div>
        </motion.div>

        {/* Card 3: Average Order Value */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="group relative overflow-hidden rounded-2xl border-2 border-gold-400/40 bg-white p-5 shadow-lg shadow-navy-950/5 transition-all hover:border-gold-400 hover:shadow-xl"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gold-400" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy-900/60">متوسط قيمة الحجز (AOV)</span>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-gold-600">
              <ArrowUpRight size={20} />
            </span>
          </div>
          <div className="mt-3 font-display text-2xl font-black text-navy-950 lg:text-3xl">
            {formatPrice(data.avgOrderValue)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
              <TrendingUp size={14} /> +14.5%
            </span>
            <span className="text-navy-900/50">للحجز الواحد</span>
          </div>
          <div className="mt-3 text-[11px] text-navy-900/60">
            إقبال مرتفع على رحلات العائلات وباقات الـ VIP
          </div>
        </motion.div>

        {/* Card 4: VIP Addon Rate */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="group relative overflow-hidden rounded-2xl border-2 border-gold-400/40 bg-white p-5 shadow-lg shadow-navy-950/5 transition-all hover:border-gold-400 hover:shadow-xl"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-navy-900 to-gold-400" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy-900/60">نسبة طلبات كبار الشخصيات VIP</span>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-50 text-gold-600">
              <Crown size={20} />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2 font-display text-2xl font-black text-navy-950 lg:text-3xl">
            <span>{data.vipAddonRate}%</span>
            <span className="text-xs font-bold text-gold-600">({data.vipAddonCount} طلب VIP+)</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-600 font-bold">+9.2% نمو</span>
            <span className="text-navy-900/50">طيران خاص ويخوت</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-navy-900" style={{ width: `${data.vipAddonRate}%` }} />
          </div>
        </motion.div>

        {/* Card 5: Guest Satisfaction */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="group relative overflow-hidden rounded-2xl border-2 border-gold-400/40 bg-white p-5 shadow-lg shadow-navy-950/5 transition-all hover:border-gold-400 hover:shadow-xl"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-emerald-500" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy-900/60">مؤشر رضا الضيوف (CSAT)</span>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <Award size={20} />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2 font-display text-2xl font-black text-navy-950 lg:text-3xl">
            <span>{data.satisfactionScore}</span>
            <span className="text-sm font-bold text-navy-900/40">/ 5.0</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-600">98.4% تقييم إيجابي</span>
            <span className="text-navy-900/50">جودة الخدمة</span>
          </div>
          <div className="mt-3 text-[11px] text-navy-900/60">
            بناءً على التقييمات المعتمدة لضيوف المنصة
          </div>
        </motion.div>
      </div>

      {/* ===================== Secondary Operational Indicators (Tier 2) ===================== */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-900">
            <Users size={22} />
          </span>
          <div>
            <div className="text-xs text-navy-900/50">إجمالي الضيوف المخدومين</div>
            <div className="font-display text-xl font-black text-navy-900">
              {data.totalGuests.toLocaleString()} ضيف نخبة
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-50 text-gold-600">
            <Compass size={22} />
          </span>
          <div>
            <div className="text-xs text-navy-900/50">الوجهات السياحية النشطة</div>
            <div className="font-display text-xl font-black text-navy-900">
              {data.destinations} وجهات فاخرة
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
            <Package size={22} />
          </span>
          <div>
            <div className="text-xs text-navy-900/50">الباقات والتجارب المعروضة</div>
            <div className="font-display text-xl font-black text-navy-900">
              {data.packages} باقات حصرية
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600">
            <Mail size={22} />
          </span>
          <div>
            <div className="text-xs text-navy-900/50">الاستفسارات والمشتركون</div>
            <div className="font-display text-xl font-black text-navy-900">
              {data.unread} رسائل جديدة • {data.subscribersCount} مشترك
            </div>
          </div>
        </div>
      </div>

      {/* ===================== Analytical Graphs Grid (Power BI Visuals) ===================== */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Visual 1: Monthly Revenue & Target Area Chart (Col 8) */}
        <div className="rounded-3xl border-2 border-gold-400/30 bg-white p-6 shadow-xl shadow-navy-950/5 lg:col-span-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-display text-lg font-black text-navy-900">
                <TrendingUp size={20} className="text-gold-500" /> مؤشر الإيرادات الشهرية ومقارنة المستهدف (SAR)
              </div>
              <p className="mt-1 text-xs text-navy-900/60">
                تحليل منحنى النمو المالي الفعلي للرحلات مقابل خطة المبيعات المستهدفة
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-gold-400" /> الإيراد الفعلي
              </span>
              <span className="flex items-center gap-1.5 text-navy-900/50">
                <span className="h-0.5 w-4 bg-navy-900/40" /> المستهدف المالي
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.monthlyTrend || []} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="goldRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d9b563" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#d9b563" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-gold-400/50 bg-navy-900 p-3 text-xs text-white shadow-xl">
                          <div className="font-bold text-gold-300">{d.month}</div>
                          <div className="mt-1.5 text-white/90">الإيراد: <b className="text-gold-200">{formatPrice(d.revenue)}</b></div>
                          <div className="text-white/70">المستهدف: {formatPrice(d.target)}</div>
                          <div className="text-white/60">الحجوزات: {d.bookings} رحلة</div>
                        </div>
                      );
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#d9b563" strokeWidth={3} fillOpacity={1} fill="url(#goldRevenue)" dot={{ r: 4, fill: '#0a1631', stroke: '#d9b563', strokeWidth: 2 }} />
                  <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} fillOpacity={0} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Visual 2: Category Distribution Donut Chart (Col 4) */}
        <div className="rounded-3xl border-2 border-gold-400/30 bg-white p-6 shadow-xl shadow-navy-950/5 lg:col-span-4">
          <div className="mb-4">
            <div className="font-display text-lg font-black text-navy-900">توزيع المبيعات حسب التجربة</div>
            <p className="mt-1 text-xs text-navy-900/60">حصة كل فئة من إجمالي إيرادات المنصة</p>
          </div>

          <div className="relative h-56 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.categoryDistribution || []}
                    dataKey="count"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                  >
                    {(data.categoryDistribution || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-gold-400/50 bg-navy-900 p-2.5 text-xs text-white shadow-xl">
                          <div className="font-bold text-gold-300">{d.label}</div>
                          <div className="mt-1">{d.count} حجز ({d.percentage}%)</div>
                          <div className="text-white/70">{formatPrice(d.revenue)}</div>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-bold text-navy-900/50">الإجمالي</span>
              <span className="font-display text-xl font-black text-navy-950">{data.bookings}</span>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="mt-2 space-y-2">
            {(data.categoryDistribution || []).map((cat: any) => (
              <div key={cat.category} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-bold text-navy-900/80">{cat.label}</span>
                </span>
                <span className="font-display font-black text-navy-900">
                  {cat.count} <span className="text-[11px] font-normal text-navy-900/40">({cat.percentage}%)</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual 3: Destination Performance Ranked Bar Chart (Col 6) */}
        <div className="rounded-3xl border-2 border-gold-400/30 bg-white p-6 shadow-xl shadow-navy-950/5 lg:col-span-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-display text-lg font-black text-navy-900">
                <MapPin size={20} className="text-gold-500" /> ترتيب الوجهات الأكثر إقبالاً وإيراداً
              </div>
              <p className="mt-1 text-xs text-navy-900/60">
                مقارنة الإيرادات المحققة وعدد الرحلات حسب كل وجهة سياحية
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {(data.destinationPerformance || []).map((dest: any, idx: number) => {
              const maxRev = Math.max(...(data.destinationPerformance || []).map((d: any) => d.revenue || 1));
              const fillPct = Math.round((dest.revenue / maxRev) * 100);
              const isTuwaiq = dest.name.includes('حافة العالم') || dest.name.includes('طويق');

              return (
                <div key={dest.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 font-bold text-navy-900">
                      <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-black ${
                        idx === 0 ? 'bg-gold-gradient text-navy-950 shadow-gold' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{dest.name}</span>
                      {isTuwaiq && (
                        <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-black text-gold-800">
                          الواجهة الأولى ⭐
                        </span>
                      )}
                    </span>
                    <span className="font-display font-black text-navy-900">
                      {formatPrice(dest.revenue)}{' '}
                      <span className="text-[11px] font-normal text-navy-900/50">({dest.bookings} رحلات)</span>
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fillPct}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.08 }}
                      className={`h-full rounded-full ${
                        isTuwaiq
                          ? 'bg-gradient-to-r from-gold-500 via-amber-400 to-gold-300 shadow-gold'
                          : 'bg-navy-900'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual 4: Booking Conversion Funnel & Status Breakdown (Col 6) */}
        <div className="rounded-3xl border-2 border-gold-400/30 bg-white p-6 shadow-xl shadow-navy-950/5 lg:col-span-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 font-display text-lg font-black text-navy-900">
                <Layers size={20} className="text-gold-500" /> قمع تحويل وإنجاز الحجوزات
              </div>
              <p className="mt-1 text-xs text-navy-900/60">
                حالة الطلبات ومعدل إتمام الحجوزات بنجاح
              </p>
            </div>
            <span className="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
              معدل النجاح: 94%
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(STATUS_CONFIG).map(([stKey, cfg]) => {
              const count = data.statusCounts?.[stKey] || 0;
              const pct = data.bookings > 0 ? Math.round((count / data.bookings) * 100) : 0;
              const Icon = cfg.icon;

              return (
                <div key={stKey} className={`rounded-2xl border p-4 ${cfg.bg}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-navy-900/70">
                      <Icon size={16} /> {cfg.label}
                    </span>
                    <span className="font-display text-lg font-black">{count}</span>
                  </div>
                  <div className="mt-2 text-xs font-medium text-navy-900/50">
                    تمثل {pct}% من إجمالي الطلبات
                  </div>
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                    <div
                      className={`h-full rounded-full ${
                        stKey === 'CONFIRMED'
                          ? 'bg-emerald-600'
                          : stKey === 'COMPLETED'
                          ? 'bg-blue-600'
                          : stKey === 'PENDING'
                          ? 'bg-amber-600'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs text-navy-900/70">
            <div className="flex items-center justify-between font-bold">
              <span>معدل طلب باقات الـ VIP الإضافية</span>
              <span className="text-gold-600 font-black">{data.vipAddonRate}%</span>
            </div>
            <p className="mt-1 leading-5 text-navy-900/60">
              أكثر من 6 من كل 10 عملاء يطلبون ترقية التجربة بخدمات الطيران الخاص والكونسيرج الشامل.
            </p>
          </div>
        </div>
      </div>

      {/* ===================== Recent Bookings Data Grid (Power BI Table) ===================== */}
      <div className="rounded-3xl border-2 border-gold-400/30 bg-white p-6 shadow-xl shadow-navy-950/5">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-black text-navy-900">
              سجل أحدث الحجوزات المباشرة
            </h2>
            <p className="mt-0.5 text-xs text-navy-900/60">
              قائمة تفاعلية بالطلبات الواردة من الموقع مع كود المرجع والتكلفة الإجمالية
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-navy-900/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="بحث بالاسم، المرجع، الباقة..."
                className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2 pe-3 ps-9 text-xs font-medium outline-none transition focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-400/20"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-navy-900 outline-none"
            >
              <option value="ALL">جميع الحالات</option>
              <option value="CONFIRMED">مؤكد</option>
              <option value="PENDING">قيد المراجعة</option>
              <option value="COMPLETED">مكتمل</option>
              <option value="CANCELLED">ملغي</option>
            </select>

            <Link
              href="/admin/bookings"
              className="btn-gold !py-2 !text-xs"
            >
              إدارة كافة الحجوزات ←
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-start text-xs">
            <thead className="border-b border-navy-900/10 bg-navy-900 text-gold-300">
              <tr>
                {['المرجع', 'العميل', 'الباقة والوجهة', 'التاريخ والضيوف', 'الإجمالي', 'الحالة'].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-start font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b: any) => {
                const st = STATUS_CONFIG[b.status] || STATUS_CONFIG.PENDING;
                const StIcon = st.icon;

                return (
                  <tr key={b.id} className="transition-colors hover:bg-gold-50/40">
                    {/* Reference */}
                    <td className="whitespace-nowrap px-4 py-3 font-mono font-bold text-navy-900" dir="ltr">
                      {b.reference}
                    </td>

                    {/* Client */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-900 font-display font-black text-gold-300">
                          {b.fullName ? b.fullName.charAt(0) : 'ع'}
                        </span>
                        <div>
                          <div className="font-bold text-navy-900">
                            {b.fullName}
                            {b.vipAddon && (
                              <span className="ms-1.5 rounded bg-gold-gradient px-1.5 py-0.5 text-[9px] font-black text-navy-950 shadow-gold">
                                VIP+
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-navy-900/50" dir="ltr">
                            {b.phone}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Package */}
                    <td className="px-4 py-3">
                      <div className="font-bold text-navy-900">{b.package?.title}</div>
                      <div className="text-[11px] text-gold-700">
                        {b.package?.destination?.name}
                      </div>
                    </td>

                    {/* Date & Guests */}
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="font-bold text-navy-900">
                        {new Date(b.startDate).toLocaleDateString('ar-SA')}
                      </div>
                      <div className="text-[11px] text-navy-900/50">
                        {b.guests} {b.guests === 1 ? 'ضيف' : 'ضيوف'}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="whitespace-nowrap px-4 py-3 font-display text-sm font-black text-navy-900">
                      {formatPrice(b.totalSar)}
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${st.bg} ${st.color}`}>
                        <StIcon size={13} />
                        {st.label}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {!filteredBookings.length && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-navy-900/50">
                    لا توجد حجوزات مطابقة للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
