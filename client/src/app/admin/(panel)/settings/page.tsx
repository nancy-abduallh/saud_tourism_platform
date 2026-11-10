'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ExternalLink,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  RotateCcw,
  Save,
  Share2,
  Sparkles,
  Twitter,
  Youtube,
  Clock,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { api } from '@/lib/client-api';
import { DEFAULT_SETTINGS } from '@/lib/default-data';
import type { SiteSettings } from '@/lib/types';

export default function SettingsPage() {
  const [form, setForm] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await api<SiteSettings>('/admin/settings', { auth: true });
      if (data) {
        setForm({
          instagramUrl: data.instagramUrl ?? DEFAULT_SETTINGS.instagramUrl,
          twitterUrl: data.twitterUrl ?? DEFAULT_SETTINGS.twitterUrl,
          youtubeUrl: data.youtubeUrl ?? DEFAULT_SETTINGS.youtubeUrl,
          tiktokUrl: data.tiktokUrl ?? DEFAULT_SETTINGS.tiktokUrl,
          snapchatUrl: data.snapchatUrl ?? DEFAULT_SETTINGS.snapchatUrl,
          linkedinUrl: data.linkedinUrl ?? DEFAULT_SETTINGS.linkedinUrl,
          whatsappNumber: data.whatsappNumber ?? DEFAULT_SETTINGS.whatsappNumber,
          whatsappMessage: data.whatsappMessage ?? DEFAULT_SETTINGS.whatsappMessage,
          phone: data.phone ?? DEFAULT_SETTINGS.phone,
          email: data.email ?? DEFAULT_SETTINGS.email,
          address: data.address ?? DEFAULT_SETTINGS.address,
          workingHours: data.workingHours ?? DEFAULT_SETTINGS.workingHours,
          footerDescription: data.footerDescription ?? DEFAULT_SETTINGS.footerDescription,
          copyrightText: data.copyrightText ?? DEFAULT_SETTINGS.copyrightText,
        });
      }
    } catch (err: any) {
      showToast('error', err.message || 'فشل تحميل الإعدادات');
    } finally {
      setLoading(false);
    }
  }

  function showToast(type: 'success' | 'error', message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4500);
  }

  function handleChange(field: keyof SiteSettings, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      const updated = await api<SiteSettings>('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(form),
        auth: true,
      });
      if (updated) setForm(updated);
      showToast('success', 'تم حفظ وتحديث روابط الفوتر وقنوات التواصل بنجاح');
    } catch (err: any) {
      showToast('error', err.message || 'فشل حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  }

  function handleResetDefault() {
    if (confirm('هل أنت متأكد من استعادة القيم الافتراضية؟')) {
      setForm(DEFAULT_SETTINGS);
      showToast('success', 'تمت استعادة القيم الافتراضية. اضغط "حفظ التغييرات" لتأكيدها.');
    }
  }

  const cleanWaNumber = (form.whatsappNumber || '').replace(/[^0-9]/g, '');
  const testWaUrl = cleanWaNumber
    ? `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(form.whatsappMessage || '')}`
    : '#';

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-gold-500" />
          <span className="text-sm font-medium text-slate-500">جاري تحميل إعدادات الفوتر وقنوات التواصل...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed start-1/2 top-6 z-50 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-6 py-3.5 shadow-2xl backdrop-blur-md ${
              toast.type === 'success'
                ? 'border border-emerald-500/30 bg-emerald-900/90 text-emerald-100'
                : 'border border-rose-500/30 bg-rose-900/90 text-rose-100'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-300" />
            )}
            <span className="text-sm font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-gradient text-navy-950 shadow-gold">
              <Share2 size={20} />
            </span>
            <div>
              <h1 className="font-display text-2xl font-black text-navy-950">إعدادات الفوتر والروابط وقنوات التواصل</h1>
              <p className="mt-0.5 text-xs text-slate-500">
                إدارة روابط وسائل التواصل الاجتماعي، رقم الواتساب المباشر، ومعلومات التواصل في أسفل الموقع
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefault}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RotateCcw size={15} /> استعادة الافتراضي
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={saving}
            className="btn-gold flex items-center gap-2 px-5 py-2.5 text-xs font-bold shadow-lg"
          >
            {saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save size={16} />}
            حفظ التغييرات
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: WhatsApp Configuration */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                <MessageCircle size={22} />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-navy-900">رقم الواتساب والمحادثة المباشرة</h2>
                <p className="text-xs text-slate-500">يتحكم في زر الواتساب العائم في أسفل الموقع ورابط التواصل السريع</p>
              </div>
            </div>

            {cleanWaNumber && (
              <a
                href={testWaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
              >
                تجربة الرابط فورياً <ExternalLink size={13} />
              </a>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold text-navy-900">
                رقم الواتساب (مع كود الدولة) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  dir="ltr"
                  value={form.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  placeholder="966500000000"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                />
                <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  مثال: 966501234567
                </span>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                أدخل الرقم الدولي مباشرة دون أصفار في البداية وبدون علامة الزائد (+) (مثال للسعودية: 9665xxxxxxx).
              </p>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-navy-900">
                الرسالة التلقائية الافتراضية للعميل
              </label>
              <input
                type="text"
                value={form.whatsappMessage ?? ''}
                onChange={(e) => handleChange('whatsappMessage', e.target.value)}
                placeholder="مرحباً، أود الاستفسار عن باقات وتجارب SA للسياحة الفاخرة"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
              <p className="mt-1.5 text-[11px] text-slate-400">
                هذه الرسالة تظهر مكتوبة وجاهزة للعميل عند فتح محادثة الواتساب مع المنصة.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Social Media Links */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-50 text-gold-600 ring-1 ring-gold-200">
                <Share2 size={22} />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-navy-900">روابط منصات التواصل الاجتماعي</h2>
                <p className="text-xs text-slate-500">تظهر في العمود الأول للفوتر كأيقونات ذهبية تفاعلية</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {/* Instagram */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-navy-900">
                <Instagram size={15} className="text-pink-600" /> إنستغرام (Instagram)
              </label>
              <div className="relative">
                <input
                  type="url"
                  dir="ltr"
                  value={form.instagramUrl}
                  onChange={(e) => handleChange('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/your-account"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                />
                {form.instagramUrl && (
                  <a
                    href={form.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute end-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-navy-900"
                    title="فتح الرابط"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Twitter / X */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-navy-900">
                <Twitter size={15} className="text-sky-500" /> إكس / تويتر (X / Twitter)
              </label>
              <div className="relative">
                <input
                  type="url"
                  dir="ltr"
                  value={form.twitterUrl}
                  onChange={(e) => handleChange('twitterUrl', e.target.value)}
                  placeholder="https://x.com/your-account"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                />
                {form.twitterUrl && (
                  <a
                    href={form.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute end-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-navy-900"
                    title="فتح الرابط"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* YouTube */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-navy-900">
                <Youtube size={15} className="text-red-600" /> يوتيوب (YouTube)
              </label>
              <div className="relative">
                <input
                  type="url"
                  dir="ltr"
                  value={form.youtubeUrl}
                  onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                  placeholder="https://youtube.com/@your-channel"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                />
                {form.youtubeUrl && (
                  <a
                    href={form.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute end-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-navy-900"
                    title="فتح الرابط"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* TikTok */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-navy-900">
                <span className="font-black text-black">TikTok</span> تيك توك
              </label>
              <div className="relative">
                <input
                  type="url"
                  dir="ltr"
                  value={form.tiktokUrl}
                  onChange={(e) => handleChange('tiktokUrl', e.target.value)}
                  placeholder="https://tiktok.com/@your-account"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                />
                {form.tiktokUrl && (
                  <a
                    href={form.tiktokUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute end-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-navy-900"
                    title="فتح الرابط"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Snapchat */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-navy-900">
                <span className="font-black text-amber-500">Snapchat</span> سناب شات
              </label>
              <div className="relative">
                <input
                  type="url"
                  dir="ltr"
                  value={form.snapchatUrl}
                  onChange={(e) => handleChange('snapchatUrl', e.target.value)}
                  placeholder="https://snapchat.com/add/your-account"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                />
                {form.snapchatUrl && (
                  <a
                    href={form.snapchatUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute end-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-navy-900"
                    title="فتح الرابط"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* LinkedIn */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold text-navy-900">
                <Linkedin size={15} className="text-blue-700" /> لينكد إن (LinkedIn)
              </label>
              <div className="relative">
                <input
                  type="url"
                  dir="ltr"
                  value={form.linkedinUrl}
                  onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/company/your-company"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                />
                {form.linkedinUrl && (
                  <a
                    href={form.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute end-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-navy-900"
                    title="فتح الرابط"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Official Contact Details */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-200">
                <Phone size={22} />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-navy-900">معلومات التواصل الرسمية</h2>
                <p className="text-xs text-slate-500">تظهر في صفحة التواصل المباشرة وميتاداتا المنصة</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-navy-900">
                <Phone size={14} className="text-gold-500" /> رقم الهاتف الرسمي
              </label>
              <input
                type="text"
                dir="ltr"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+966 11 000 0000"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-navy-900">
                <Mail size={14} className="text-gold-500" /> البريد الإلكتروني الرسمي
              </label>
              <input
                type="email"
                dir="ltr"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="info@saudtourism.sa"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-navy-900">
                <MapPin size={14} className="text-gold-500" /> المقر والعنوان
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="الرياض، المملكة العربية السعودية"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-1.5 text-xs font-bold text-navy-900">
                <Clock size={14} className="text-gold-500" /> ساعات العمل والكونسيرج
              </label>
              <input
                type="text"
                value={form.workingHours}
                onChange={(e) => handleChange('workingHours', e.target.value)}
                placeholder="كونسيرج VIP متاح 24/7"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Footer Texts & Branding */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-50 text-purple-600 ring-1 ring-purple-200">
                <FileText size={22} />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-navy-900">نصوص وهوية الفوتر</h2>
                <p className="text-xs text-slate-500">النبذة التعريفية بجانب الشعار وحقوق الملكية في نهاية الموقع</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold text-navy-900">النبذة التعريفية للمنصة في الفوتر</label>
              <textarea
                rows={3}
                value={form.footerDescription}
                onChange={(e) => handleChange('footerDescription', e.target.value)}
                placeholder="نصنع رحلات سعودية فاخرة تجمع بين عراقة التاريخ وروعة الطبيعة وأرقى مستويات الضيافة."
                className="w-full rounded-xl border border-slate-200 p-4 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold text-navy-900">نص حقوق الملكية والنشر</label>
              <input
                type="text"
                value={form.copyrightText}
                onChange={(e) => handleChange('copyrightText', e.target.value)}
                placeholder="© 2026 سعود للسياحة. جميع الحقوق محفوظة."
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="overflow-hidden rounded-2xl border-2 border-gold-400/40 bg-navy-950 p-6 text-white shadow-xl">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-gold-300">
              <Sparkles size={16} />
              <span className="font-display text-sm font-bold">معاينة مباشرة لمظهر الفوتر في الموقع</span>
            </div>
            <span className="text-xs text-white/50">تحديث فوري أثناء الكتابة</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-md">
              <p className="text-xs leading-6 text-white/70">{form.footerDescription}</p>
              <div className="mt-3 text-[11px] text-white/40">{form.copyrightText}</div>
            </div>

            <div className="flex items-center gap-3">
              {form.instagramUrl && (
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/40 text-gold-300 shadow-sm">
                  <Instagram size={18} />
                </span>
              )}
              {form.twitterUrl && (
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/40 text-gold-300 shadow-sm">
                  <Twitter size={18} />
                </span>
              )}
              {form.youtubeUrl && (
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/40 text-gold-300 shadow-sm">
                  <Youtube size={18} />
                </span>
              )}
              {form.linkedinUrl && (
                <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-500/40 text-gold-300 shadow-sm">
                  <Linkedin size={18} />
                </span>
              )}
              {form.whatsappNumber && (
                <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white shadow-lg">
                  <MessageCircle size={20} />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleResetDefault}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RotateCcw size={16} /> استعادة الافتراضي
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-gold flex items-center gap-2 px-8 py-3 text-sm font-bold shadow-xl"
          >
            {saving ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Save size={18} />}
            حفظ كافة التغييرات
          </button>
        </div>
      </form>
    </div>
  );
}
