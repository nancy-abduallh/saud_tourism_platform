'use client';

import React, { useEffect, useState } from 'react';
import {
  Award,
  Building,
  Building2,
  CalendarCheck,
  Castle,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Crown,
  Eye,
  EyeOff,
  Flame,
  Gift,
  HeartPulse,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  MapPin,
  Navigation,
  Package,
  Plane,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Star,
  Tent,
  Train,
  Trees,
} from 'lucide-react';
import type { HomeSectionsData } from '@/lib/types';
import { DEFAULT_HOME_SECTIONS_DATA } from '@/lib/default-data';

const AVAILABLE_IMAGES = [
  { url: '/images/tuwaiq-edge.jpg', label: 'حافة العالم - مطل طويق الصخري (الرياض)' },
  { url: '/images/tuwaiq-safari.jpg', label: 'سفاري الدفع الرباعي والمخيمات الصحراوية' },
  { url: '/images/alula.jpg', label: 'العلا - مدائن صالح والآثار النبطية' },
  { url: '/images/gallery-1.jpg', label: 'العلا - جبل الفيل والتخييم الفلكي الليلي' },
  { url: '/images/gallery-2.jpg', label: 'العلا - مناطيد الهواء فوق صخور الحجر' },
  { url: '/images/gallery-3.jpg', label: 'العلا - فيلا ومنتجع صخري فاخر بمسبح خاص' },
  { url: '/images/gallery-4.jpg', label: 'سيارة رينج روفر دفع رباعي VIP في الرمال' },
  { url: '/images/red-sea.jpg', label: 'وجهة البحر الأحمر - جزر فيروزية وبنغلات فوق الماء' },
  { url: '/images/diriyah.jpg', label: 'الدرعية - حي الطريف التاريخي وقصور نجد' },
  { url: '/images/asir.jpg', label: 'عسير - مرتفعات السودة الخضراء والضباب' },
  { url: '/images/makkah.jpg', label: 'مكة المكرمة - جناح ملكي مطل على الكعبة وبرج الساعة' },
  { url: '/images/madinah.jpg', label: 'المدينة المنورة - المسجد النبوي الشريف والقبة الخضراء' },
  { url: '/images/hail.jpg', label: 'حائل - قصر القشلة التاريخي وجبال حائل' },
  { url: '/images/tabuk-disah.jpg', label: 'تبوك - وادي الديسة والأعمدة الصخرية والواحات' },
  { url: '/images/qassim.jpg', label: 'القصيم - مزارع النخيل الباسقة والنزل الريفية' },
  { url: '/images/taif.jpg', label: 'الطائف - طريق عقبة الهدا والتلفريك ومصائف الجبال' },
  { url: '/images/jeddah.jpg', label: 'جدة - مارينا اليخوت ونافورة الملك فهد بالكورنيش' },
  { url: '/images/jazan-farasan.jpg', label: 'جازان - أرخبيل جزر فرسان البكر والشواطئ الفيروزية' },
  { url: '/images/kharj-springs.jpg', label: 'الخرج - عيون الماء الطبيعية والواحات التاريخية' },
  { url: '/images/haql-shipwreck.jpg', label: 'تبوك - شواطئ حقل وسفينة جورجيوس الغارقة' },
  { url: '/images/rijal-almaa.jpg', label: 'عسير - قرية رجال ألمع التراثية وقصور الحجر' },
  { url: '/images/pkg-4.jpg', label: 'أبها وعسير - قمم السحاب وقرى ألمعية' },
  { url: '/images/pkg-5.jpg', label: 'مكة المكرمة - إطلالة الحرم والأجنحة الفاخرة' },
  { url: '/images/hero-1.jpg', label: 'ملاذ فاخر ومسبح خاص في الصحراء' },
  { url: '/images/hero-3.jpg', label: 'جزر البحر الأحمر وأنشطة الإبحار الفاخر' },
];

export default function AdminSectionsPage() {
  const [data, setData] = useState<HomeSectionsData>(DEFAULT_HOME_SECTIONS_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'visibility' | 'valueProps' | 'stayTypes' | 'exploreCities' | 'tripPlanner' | 'weekendDeals' | 'popularStays' | 'vipBanner' | 'travelRoutes'>('visibility');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/sections');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);
      const res = await fetch('/api/admin/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMessage({ text: 'تم حفظ إعدادات أقسام الصفحة الرئيسية بنجاح!', type: 'success' });
        setTimeout(() => setMessage(null), 4000);
      } else {
        setMessage({ text: 'حدث خطأ أثناء حفظ الإعدادات', type: 'error' });
      }
    } catch (e) {
      setMessage({ text: 'فشل الاتصال بالخادم', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('هل أنت متأكد من استعادة الترتيب والبيانات الافتراضية لكافة أقسام الصفحة الرئيسية؟')) {
      setData(DEFAULT_HOME_SECTIONS_DATA);
    }
  };

  const toggleVisibility = (key: keyof HomeSectionsData['visibility']) => {
    setData((prev) => ({
      ...prev,
      visibility: {
        ...prev.visibility,
        [key]: !prev.visibility[key],
      },
    }));
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
          <p className="text-sm font-bold text-navy-950">جاري تحميل إعدادات الأقسام...</p>
        </div>
      </div>
    );
  }

  const sectionsList: { key: keyof HomeSectionsData['visibility']; title: string; desc: string; icon: any }[] = [
    { key: 'hero', title: 'شرائح الهيرو العلوية', desc: 'سلايدر العرض الترويجي الرئيسي أعلى الصفحة', icon: Layers },
    { key: 'valueProps', title: 'شريط المزايا والقيمة المضافة (Booking)', desc: 'تأكيد فوري، كونسيرج 24/7، شبكة 13 فرعاً، وتجارب حصرية', icon: ShieldCheck },
    { key: 'stayTypes', title: 'ابحث حسب نوع مكان الإقامة', desc: 'فلل وشاليهات، مخيمات ملكية، أجنحة فندقية، ونزل تراثية', icon: Castle },
    { key: 'trendingDestinations', title: 'الوجهات الرائجة الأكثر زيارة', desc: 'العلا، الرياض، البحر الأحمر، عسير، والدرعية', icon: Sparkles },
    { key: 'exploreCities', title: 'استكشف مدن ومناطق المملكة', desc: 'شبكة بطاقات سريعة للمدن: حائل، تبوك، الطائف، القصيم، الخرج، جازان', icon: Compass },
    { key: 'marquee', title: 'الشريط الإخباري المتحرك (Marquee)', desc: 'شريط الكلمات المفتاحية والوجهات المتحركة', icon: Navigation },
    { key: 'quickTripPlanner', title: 'مخطط الرحلات السريع والذكي', desc: 'تبويبات الشواطئ، الطبيعة، التراث، السفاري، والعمرة', icon: Compass },
    { key: 'weekendDeals', title: 'عروض عطلة نهاية الأسبوع (Deals)', desc: 'باقات مخفضة مع نسب الخصم وأسعار العروض', icon: Flame },
    { key: 'featuredPackages', title: 'الباقات السياحية الفاخرة المميزة', desc: 'قائمة الباقات الرئيسية المضافة في لوحة الباقات', icon: Package },
    { key: 'popularStays', title: 'بيوت وملاذات يفضلها الضيوف', desc: 'أماكن الإقامة الأعلى تقييماً من رواد الفخامة', icon: Star },
    { key: 'vipClubBanner', title: 'بطاقة نادي نجوم السياحة VIP', desc: 'برنامج الولاء والامتيازات الحصرية والخصومات', icon: Crown },
    { key: 'medicalTourism', title: 'بوابة السياحة العلاجية والاستشفائية الدولية', desc: 'استقبال المرضى الدوليين، العلاج في المستشفيات المرجعية وبرامج النقاهة', icon: HeartPulse },
    { key: 'stats', title: 'إحصائيات وأرقام المنصة', desc: 'أرقام الضيوف والتجارب والتقييمات وخدمة الكونسيرج', icon: Award },
    { key: 'vipServices', title: 'خدمات كبار الشخصيات VIP', desc: 'طيران خاص، يخوت، سيارات رينج روفر، ومرشدون', icon: Gift },
    { key: 'ownerMessage', title: 'كلمة الأستاذ سعود الشمري (المالك)', desc: 'الرسالة الترحيبية الرسمية للمالك ورؤية 2030', icon: ShieldCheck },
    { key: 'branches', title: 'شبكة فروع المملكة (13 فرعاً)', desc: 'تغطية فروع ومكاتب التمثيل السياحي لكافة مناطق المملكة', icon: Building2 },
    { key: 'travelRoutes', title: 'مسارات رائجة للمسافرين داخل المملكة', desc: 'أشهر خطوط التنقل من الرياض وجدة والدمام', icon: Navigation },
    { key: 'whyUs', title: 'لماذا تختار منصة SA للسياحة؟', desc: 'نقاط القوة الأربعة والتميز المؤسسي', icon: CheckCircle2 },
    { key: 'howItWorks', title: 'كيف تحجز رحلتك (3 خطوات)', desc: 'خطوات استكشاف وحجز وتجربة الرحلات', icon: Clock },
    { key: 'testimonials', title: 'آراء وشهادات الضيوف', desc: 'تقييمات وتعليقات العملاء لكبار الشخصيات', icon: Star },
    { key: 'ctaBanner', title: 'بانر الحجز والدعوة للتواصل', desc: 'البانر الختامي للاتصال المباشر والواتساب', icon: CalendarCheck },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-gold-700">
            <LayoutGrid size={15} />
            <span>لوحة التحكم المتقدمة</span>
          </div>
          <h1 className="mt-1 font-display text-xl sm:text-2xl font-black text-navy-950">
            إدارة وتخصيص أقسام وتجارب الصفحة الرئيسية
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            تحكم كامل في ظهور، نصوص، بطاقات، وصور كافة أقسام الصفحة الرئيسية لتعكس بدقة أرقى المعايير السياحية.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw size={14} />
            <span>استعادة الافتراضي</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-5 py-2.5 text-xs font-black text-navy-950 shadow-gold hover:scale-105 transition-all disabled:opacity-50"
          >
            <Save size={15} />
            <span>{saving ? 'جاري الحفظ...' : 'حفظ كافة التعديلات'}</span>
          </button>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div
          className={`flex items-center gap-2 rounded-2xl p-4 text-xs font-bold ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 size={16} /> : <Flame size={16} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'visibility', label: 'إظهار / إخفاء الأقسام (21 قسماً)', icon: Eye },
          { id: 'valueProps', label: 'شريط المزايا (4)', icon: ShieldCheck },
          { id: 'stayTypes', label: 'أنواع الإقامة (4)', icon: Castle },
          { id: 'exploreCities', label: 'استكشف المدن (6)', icon: Compass },
          { id: 'tripPlanner', label: 'مخطط الرحلات (5 فئات)', icon: Layers },
          { id: 'weekendDeals', label: 'عروض عطلة الأسبوع (4)', icon: Flame },
          { id: 'popularStays', label: 'بيوت وملاذات الضيوف (4)', icon: Star },
          { id: 'travelRoutes', label: 'مسارات التنقل', icon: Navigation },
          { id: 'vipBanner', label: 'نادي النجوم VIP', icon: Crown },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-navy-950 text-gold-300 shadow-md font-black'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-gold-400' : 'text-slate-500'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Section Visibility */}
      {activeTab === 'visibility' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="mb-6">
            <h2 className="font-display text-base font-black text-navy-950">
              التحكم في ظهور أو إخفاء أقسام الصفحة الرئيسية
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              يمكنك تعطيل أو تفعيل أي قسم بنقرة واحدة ليتم تطبيق التغيير فوراً على الصفحة الرئيسية للموقع.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectionsList.map((sec) => {
              const Icon = sec.icon;
              const isEnabled = data.visibility[sec.key] !== false;
              return (
                <div
                  key={sec.key}
                  className={`flex items-start justify-between gap-3 rounded-2xl border p-4 transition-all ${
                    isEnabled
                      ? 'border-gold-500/40 bg-gold-50/20'
                      : 'border-slate-200 bg-slate-50/60 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                        isEnabled ? 'bg-gold-500/10 text-gold-700' : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-display text-xs font-black text-navy-950">{sec.title}</h3>
                      <p className="mt-1 text-[11px] text-slate-500 leading-snug">{sec.desc}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleVisibility(sec.key)}
                    className={`shrink-0 rounded-full p-1.5 transition-colors cursor-pointer ${
                      isEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                    }`}
                    title={isEnabled ? 'مفعل (اضغط للإخفاء)' : 'مخفي (اضغط للتفعيل)'}
                  >
                    {isEnabled ? <Check size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Value Props */}
      {activeTab === 'valueProps' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 space-y-6">
          <div>
            <h2 className="font-display text-base font-black text-navy-950">
              تعديل بطاقات شريط المزايا والقيمة المضافة (Value Props)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              الأشرطة والمزايا التي تظهر أسفل الهيرو مباشرة مستوحاة من Booking.com لتعزيز ثقة الزائر.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {data.valueProps.map((item, idx) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-4 space-y-3 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-navy-950 px-2 py-0.5 text-[10px] font-bold text-gold-300">
                    الميزة #{idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item.badge}
                    onChange={(e) => {
                      const updated = [...data.valueProps];
                      updated[idx].badge = e.target.value;
                      setData({ ...data, valueProps: updated });
                    }}
                    placeholder="شارة الميزة"
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-gold-700 w-36 text-start"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">العنوان</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...data.valueProps];
                      updated[idx].title = e.target.value;
                      setData({ ...data, valueProps: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-navy-950"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">الوصف التفصيلي</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...data.valueProps];
                      updated[idx].description = e.target.value;
                      setData({ ...data, valueProps: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Stay Types */}
      {activeTab === 'stayTypes' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 space-y-6">
          <div>
            <h2 className="font-display text-base font-black text-navy-950">
              تعديل أنواع أماكن الإقامة والتجارب (Stay Types)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              البطاقات الأربعة لتصفح الإقامات (فلل، مخيمات ملكية، أجنحة فندقية، نزل تراثية).
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {data.stayTypes.map((stay, idx) => (
              <div key={stay.id} className="rounded-2xl border border-slate-200 p-5 space-y-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img src={stay.image} alt={stay.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={stay.title}
                      onChange={(e) => {
                        const updated = [...data.stayTypes];
                        updated[idx].title = e.target.value;
                        setData({ ...data, stayTypes: updated });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-navy-950"
                      placeholder="عنوان نوع الإقامة"
                    />
                    <input
                      type="text"
                      value={stay.badge}
                      onChange={(e) => {
                        const updated = [...data.stayTypes];
                        updated[idx].badge = e.target.value;
                        setData({ ...data, stayTypes: updated });
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-gold-700"
                      placeholder="الشارة (مثال: خصوصية VIP)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">الوصف المختصر</label>
                  <input
                    type="text"
                    value={stay.subtitle}
                    onChange={(e) => {
                      const updated = [...data.stayTypes];
                      updated[idx].subtitle = e.target.value;
                      setData({ ...data, stayTypes: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">العدد المعروض</label>
                    <input
                      type="text"
                      value={stay.count}
                      onChange={(e) => {
                        const updated = [...data.stayTypes];
                        updated[idx].count = e.target.value;
                        setData({ ...data, stayTypes: updated });
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-bold text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">رابط الوجهة</label>
                    <input
                      type="text"
                      value={stay.href}
                      onChange={(e) => {
                        const updated = [...data.stayTypes];
                        updated[idx].href = e.target.value;
                        setData({ ...data, stayTypes: updated });
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">مسار أو رابط الصورة</label>
                  <select
                    value={stay.image}
                    onChange={(e) => {
                      const updated = [...data.stayTypes];
                      updated[idx].image = e.target.value;
                      setData({ ...data, stayTypes: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-navy-950 mb-1.5"
                  >
                    {AVAILABLE_IMAGES.map((img) => (
                      <option key={img.url} value={img.url}>
                        {img.label} ({img.url})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={stay.image}
                    onChange={(e) => {
                      const updated = [...data.stayTypes];
                      updated[idx].image = e.target.value;
                      setData({ ...data, stayTypes: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-600"
                    placeholder="أو اكتب رابط صورة مباشر..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Explore Cities */}
      {activeTab === 'exploreCities' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 space-y-6">
          <div>
            <h2 className="font-display text-base font-black text-navy-950">
              تعديل بطاقات استكشاف مدن ومناطق المملكة (6 مدن)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              تحكم في أسماء، أوصاف، صور، وشارات بطاقات المدن الستة.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.exploreCities.map((city, idx) => (
              <div key={city.id} className="rounded-2xl border border-slate-200 p-4 space-y-3 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img src={city.image} alt={city.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={city.name}
                      onChange={(e) => {
                        const updated = [...data.exploreCities];
                        updated[idx].name = e.target.value;
                        setData({ ...data, exploreCities: updated });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-black text-navy-950"
                      placeholder="اسم المدينة"
                    />
                    <input
                      type="text"
                      value={city.badge}
                      onChange={(e) => {
                        const updated = [...data.exploreCities];
                        updated[idx].badge = e.target.value;
                        setData({ ...data, exploreCities: updated });
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-gold-700"
                      placeholder="الشارة"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">الوصف التعريفي</label>
                  <input
                    type="text"
                    value={city.title}
                    onChange={(e) => {
                      const updated = [...data.exploreCities];
                      updated[idx].title = e.target.value;
                      setData({ ...data, exploreCities: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">العدد (الباقات والتجارب)</label>
                  <input
                    type="text"
                    value={city.count}
                    onChange={(e) => {
                      const updated = [...data.exploreCities];
                      updated[idx].count = e.target.value;
                      setData({ ...data, exploreCities: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-bold text-navy-950"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">مسار أو رابط الصورة</label>
                  <select
                    value={city.image}
                    onChange={(e) => {
                      const updated = [...data.exploreCities];
                      updated[idx].image = e.target.value;
                      setData({ ...data, exploreCities: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-navy-950 mb-1.5"
                  >
                    {AVAILABLE_IMAGES.map((img) => (
                      <option key={img.url} value={img.url}>
                        {img.label} ({img.url})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Trip Planner */}
      {activeTab === 'tripPlanner' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 space-y-6">
          <div>
            <h2 className="font-display text-base font-black text-navy-950">
              تعديل بطاقات وتجارب مخطط الرحلات الذكي (Smart Trip Planner)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              تحكم في تصنيفات مخطط الرحلات (الشواطئ، الطبيعة، التراث، السفاري، العمرة والزيارة) وبطاقات الوجهات، الأسعار، وأوقات التنقل والصور.
            </p>
          </div>

          <div className="space-y-8">
            {data.tripPlanner?.map((cat, catIdx) => (
              <div key={cat.id} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={cat.label}
                      onChange={(e) => {
                        const updated = [...(data.tripPlanner || [])];
                        updated[catIdx].label = e.target.value;
                        setData({ ...data, tripPlanner: updated });
                      }}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-navy-950"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    ({cat.items?.length || 0} بطاقات وجهات)
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {cat.items?.map((item, itemIdx) => (
                    <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2.5 shadow-sm">
                      <div className="relative h-28 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        <span className="absolute top-2 right-2 rounded-full bg-navy-950/80 px-2 py-0.5 text-[10px] font-black text-gold-300 backdrop-blur-sm">
                          {item.badge}
                        </span>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">اسم الوجهة / التجربة</label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const updated = [...(data.tripPlanner || [])];
                            updated[catIdx].items[itemIdx].name = e.target.value;
                            setData({ ...data, tripPlanner: updated });
                          }}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-navy-950"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">المنطقة</label>
                          <input
                            type="text"
                            value={item.region}
                            onChange={(e) => {
                              const updated = [...(data.tripPlanner || [])];
                              updated[catIdx].items[itemIdx].region = e.target.value;
                              setData({ ...data, tripPlanner: updated });
                            }}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-0.5">السعر يبدأ من</label>
                          <input
                            type="text"
                            value={item.priceFrom}
                            onChange={(e) => {
                              const updated = [...(data.tripPlanner || [])];
                              updated[catIdx].items[itemIdx].priceFrom = e.target.value;
                              setData({ ...data, tripPlanner: updated });
                            }}
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-gold-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">مدة وتفاصيل السفر</label>
                        <input
                          type="text"
                          value={item.travelTime}
                          onChange={(e) => {
                            const updated = [...(data.tripPlanner || [])];
                            updated[catIdx].items[itemIdx].travelTime = e.target.value;
                            setData({ ...data, tripPlanner: updated });
                          }}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">الشارة المميزة</label>
                        <input
                          type="text"
                          value={item.badge}
                          onChange={(e) => {
                            const updated = [...(data.tripPlanner || [])];
                            updated[catIdx].items[itemIdx].badge = e.target.value;
                            setData({ ...data, tripPlanner: updated });
                          }}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-navy-950 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">الصورة المعتمدة</label>
                        <select
                          value={item.image}
                          onChange={(e) => {
                            const updated = [...(data.tripPlanner || [])];
                            updated[catIdx].items[itemIdx].image = e.target.value;
                            setData({ ...data, tripPlanner: updated });
                          }}
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-[11px] text-navy-950"
                        >
                          {AVAILABLE_IMAGES.map((img) => (
                            <option key={img.url} value={img.url}>
                              {img.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Weekend Deals */}
      {activeTab === 'weekendDeals' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 space-y-6">
          <div>
            <h2 className="font-display text-base font-black text-navy-950">
              تعديل عروض عطلة نهاية الأسبوع (Weekend Deals)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              تحكم في أسعار العروض، نسب الخصم، الوجهات، والصور المرافقة لكل عرض.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {data.weekendDeals.map((deal, idx) => (
              <div key={deal.id} className="rounded-2xl border border-slate-200 p-5 space-y-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img src={deal.image} alt={deal.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={deal.title}
                      onChange={(e) => {
                        const updated = [...data.weekendDeals];
                        updated[idx].title = e.target.value;
                        setData({ ...data, weekendDeals: updated });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-black text-navy-950"
                      placeholder="عنوان العرض"
                    />
                    <input
                      type="text"
                      value={deal.destination}
                      onChange={(e) => {
                        const updated = [...data.weekendDeals];
                        updated[idx].destination = e.target.value;
                        setData({ ...data, weekendDeals: updated });
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600"
                      placeholder="الوجهة"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">السعر الأصلي</label>
                    <input
                      type="text"
                      value={deal.originalPrice}
                      onChange={(e) => {
                        const updated = [...data.weekendDeals];
                        updated[idx].originalPrice = e.target.value;
                        setData({ ...data, weekendDeals: updated });
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-500 line-through"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-1">سعر العرض</label>
                    <input
                      type="text"
                      value={deal.dealPrice}
                      onChange={(e) => {
                        const updated = [...data.weekendDeals];
                        updated[idx].dealPrice = e.target.value;
                        setData({ ...data, weekendDeals: updated });
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-black text-navy-950"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-red-600 mb-1">شارة الخصم</label>
                    <input
                      type="text"
                      value={deal.discount}
                      onChange={(e) => {
                        const updated = [...data.weekendDeals];
                        updated[idx].discount = e.target.value;
                        setData({ ...data, weekendDeals: updated });
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-bold text-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">صورة العرض</label>
                  <select
                    value={deal.image}
                    onChange={(e) => {
                      const updated = [...data.weekendDeals];
                      updated[idx].image = e.target.value;
                      setData({ ...data, weekendDeals: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-navy-950"
                  >
                    {AVAILABLE_IMAGES.map((img) => (
                      <option key={img.url} value={img.url}>
                        {img.label} ({img.url})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Popular Stays */}
      {activeTab === 'popularStays' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 space-y-6">
          <div>
            <h2 className="font-display text-base font-black text-navy-950">
              تعديل بيوت وملاذات يفضلها الضيوف (Popular Stays)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              تخصيص الفلل والملاذات الأكثر تقييماً وأسعارها ومميزاتها الحصرية.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {data.popularStays.map((stay, idx) => (
              <div key={stay.id} className="rounded-2xl border border-slate-200 p-5 space-y-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img src={stay.image} alt={stay.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={stay.name}
                      onChange={(e) => {
                        const updated = [...data.popularStays];
                        updated[idx].name = e.target.value;
                        setData({ ...data, popularStays: updated });
                      }}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-black text-navy-950"
                      placeholder="اسم مكان الإقامة"
                    />
                    <div className="mt-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={stay.city}
                        onChange={(e) => {
                          const updated = [...data.popularStays];
                          updated[idx].city = e.target.value;
                          setData({ ...data, popularStays: updated });
                        }}
                        className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] text-slate-600 w-24"
                        placeholder="المدينة"
                      />
                      <input
                        type="text"
                        value={stay.badge}
                        onChange={(e) => {
                          const updated = [...data.popularStays];
                          updated[idx].badge = e.target.value;
                          setData({ ...data, popularStays: updated });
                        }}
                        className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] text-gold-700 flex-1"
                        placeholder="الشارة"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">السعر المعروض</label>
                    <input
                      type="text"
                      value={stay.price}
                      onChange={(e) => {
                        const updated = [...data.popularStays];
                        updated[idx].price = e.target.value;
                        setData({ ...data, popularStays: updated });
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-black text-navy-950"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">التقييم</label>
                    <input
                      type="text"
                      value={stay.rating}
                      onChange={(e) => {
                        const updated = [...data.popularStays];
                        updated[idx].rating = e.target.value;
                        setData({ ...data, popularStays: updated });
                      }}
                      className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs font-bold text-navy-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">المميزات الرئيسية</label>
                  <input
                    type="text"
                    value={stay.highlights}
                    onChange={(e) => {
                      const updated = [...data.popularStays];
                      updated[idx].highlights = e.target.value;
                      setData({ ...data, popularStays: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-700"
                    placeholder="مسبح خاص • كونسيرج 24/7"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">الصورة المعروضة</label>
                  <select
                    value={stay.image}
                    onChange={(e) => {
                      const updated = [...data.popularStays];
                      updated[idx].image = e.target.value;
                      setData({ ...data, popularStays: updated });
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-navy-950"
                  >
                    {AVAILABLE_IMAGES.map((img) => (
                      <option key={img.url} value={img.url}>
                        {img.label} ({img.url})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Travel Routes */}
      {activeTab === 'travelRoutes' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 space-y-6">
          <div>
            <h2 className="font-display text-base font-black text-navy-950">
              تعديل مسارات التنقل السياحية بين المدن (Travel Routes)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              أشهر المسارات السياحية المنطلقة من الرياض وجدة والدمام إلى كافة فروع ومناطق المملكة.
            </p>
          </div>

          <div className="space-y-6">
            {data.travelRoutes.map((dep, depIdx) => (
              <div key={dep.city} className="rounded-2xl border border-slate-200 p-5 space-y-3 bg-slate-50/50">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-display text-sm font-black text-navy-950">{dep.label}</h3>
                  <span className="text-xs text-slate-500">{dep.routes.length} مسارات مسجلة</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {dep.routes.map((route, rIdx) => (
                    <div key={rIdx} className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                      <input
                        type="text"
                        value={route.to}
                        onChange={(e) => {
                          const updated = [...data.travelRoutes];
                          updated[depIdx].routes[rIdx].to = e.target.value;
                          setData({ ...data, travelRoutes: updated });
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-navy-950"
                        placeholder="الوجهة"
                      />
                      <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                        <input
                          type="text"
                          value={route.duration}
                          onChange={(e) => {
                            const updated = [...data.travelRoutes];
                            updated[depIdx].routes[rIdx].duration = e.target.value;
                            setData({ ...data, travelRoutes: updated });
                          }}
                          className="rounded border border-slate-200 p-1 text-slate-600"
                          placeholder="المدة"
                        />
                        <input
                          type="text"
                          value={route.priceFrom}
                          onChange={(e) => {
                            const updated = [...data.travelRoutes];
                            updated[depIdx].routes[rIdx].priceFrom = e.target.value;
                            setData({ ...data, travelRoutes: updated });
                          }}
                          className="rounded border border-slate-200 p-1 text-navy-950 font-bold"
                          placeholder="السعر"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 8: VIP Banner */}
      {activeTab === 'vipBanner' && (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 space-y-6">
          <div>
            <h2 className="font-display text-base font-black text-navy-950">
              تعديل بانر نادي نجوم السياحة VIP (برنامج الولاء)
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              تحكم في عنوان ووصف ومزايا ورابط الانضمام لبطاقة عضوية النخبة.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الشارة العلوية</label>
              <input
                type="text"
                value={data.vipBanner.badge}
                onChange={(e) =>
                  setData({
                    ...data,
                    vipBanner: { ...data.vipBanner, badge: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-navy-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">العنوان الرئيسي للبانر</label>
              <input
                type="text"
                value={data.vipBanner.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    vipBanner: { ...data.vipBanner, title: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-black text-navy-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الوصف التفصيلي</label>
              <textarea
                rows={3}
                value={data.vipBanner.subtitle}
                onChange={(e) =>
                  setData({
                    ...data,
                    vipBanner: { ...data.vipBanner, subtitle: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نص زر الانضمام</label>
                <input
                  type="text"
                  value={data.vipBanner.ctaText}
                  onChange={(e) =>
                    setData({
                      ...data,
                      vipBanner: { ...data.vipBanner, ctaText: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-navy-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رابط زر الانضمام</label>
                <input
                  type="text"
                  value={data.vipBanner.ctaLink}
                  onChange={(e) =>
                    setData({
                      ...data,
                      vipBanner: { ...data.vipBanner, ctaLink: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
