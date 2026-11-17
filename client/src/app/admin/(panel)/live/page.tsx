'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  Building2,
  Calendar,
  Check,
  Clock,
  Eye,
  ListPlus,
  MessageSquare,
  Plus,
  Radio,
  RefreshCw,
  Save,
  Sparkles,
  Trash2,
  Tv,
  Video,
} from 'lucide-react';
import type { LiveAgendaItem, LiveCongratulation, LiveStreamSettings, LiveStreamStatus } from '@/lib/types';
import { parseVideoUrl } from '@/components/LivePlayer';

const PRESET_VIDEOS = [
  {
    name: '🇸🇦 فيديو "This Land Is Calling" (Visit Saudi - جودة فائقة)',
    url: 'https://www.youtube.com/watch?v=R6D7jQI4BD0',
  },
  {
    name: '🇸🇦 فيديو "Welcome to Arabia" (الترويج الرسمي للسياحة)',
    url: 'https://www.youtube.com/watch?v=kDqTPT1SQbU',
  },
  {
    name: '🇸🇦 فيديو العاصمة الرياض (Riyadh Directors Cut)',
    url: 'https://www.youtube.com/watch?v=35g7UMVbfPc',
  },
];

const STATUS_BANNER_PRESETS: Record<LiveStreamStatus, { bannerText: string; heroBadge: string; label: string }> = {
  UPCOMING: {
    bannerText: '⏳ ترقبوا: انطلاق حفل التدشين الرسمي لمنصة SA للسياحة وفروع المملكة الـ 13',
    heroBadge: 'الحدث الرسمي للتدشين',
    label: 'قريباً (بث مجدول)',
  },
  LIVE: {
    bannerText: '🔴 بث مباشر الآن: انطلاق وقائع حفل التدشين الرسمي لمنصة SA للسياحة وإطلاق شبكة فروع المملكة (13 فرعاً)',
    heroBadge: 'بث مباشر حي عبر المملكة',
    label: 'مباشر الآن (LIVE)',
  },
  ENDED: {
    bannerText: '🎬 انتهى البث المباشر: يمكنك الآن مشاهدة التسجيل الكامل لوقائع حفل التدشين الرسمي',
    heroBadge: 'تسجيل وقائع الحفل',
    label: 'انتهى البث (تسجيل الحفل)',
  },
};

const toLocalInputFormat = (dateStr?: string) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return '';
  }
};

export default function AdminLivePage() {
  const [settings, setSettings] = useState<LiveStreamSettings | null>(null);
  const [congratulations, setCongratulations] = useState<LiveCongratulation[]>([]);
  const [agenda, setAgenda] = useState<LiveAgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New agenda form state
  const [newTime, setNewTime] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // New congratulation form state
  const [newCongratsName, setNewCongratsName] = useState('');
  const [newCongratsBranch, setNewCongratsBranch] = useState('');
  const [newCongratsMsg, setNewCongratsMsg] = useState('');

  // Viewer auto-detection state
  const [detectingViewers, setDetectingViewers] = useState(false);
  const [detectedNotice, setDetectedNotice] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/live')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          const s = { ...data.settings };
          if (s.streamUrl && s.streamUrl.includes('3nQ6L8bQeYc')) {
            s.streamUrl = 'https://www.youtube.com/watch?v=R6D7jQI4BD0';
          }
          if (s.recordingUrl && s.recordingUrl.includes('3nQ6L8bQeYc')) {
            s.recordingUrl = 'https://www.youtube.com/watch?v=R6D7jQI4BD0';
          }
          setSettings(s);
        }
        if (data.congratulations) setCongratulations(data.congratulations);
        if (data.agenda) setAgenda(data.agenda);
        setLoading(false);
      })
      .catch((err) => {
        setMessage({ type: 'error', text: 'فشل تحميل بيانات البث: ' + err.message });
        setLoading(false);
      });
  }, []);

  const saveAll = async (
    customSettings?: LiveStreamSettings,
    customAgenda?: LiveAgendaItem[]
  ) => {
    const targetSettings = customSettings || settings;
    const targetAgenda = customAgenda || agenda;
    if (!targetSettings) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/live', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...targetSettings,
          agenda: targetAgenda,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'فشل حفظ الإعدادات');
      }

      const data = await res.json();
      if (data.settings) setSettings(data.settings);
      if (data.agenda) setAgenda(data.agenda);

      setMessage({ type: 'success', text: '✓ تم حفظ وتحديث كافة بيانات البث المباشر والفعاليات بنجاح!' });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err?.message || 'حدث خطأ أثناء الحفظ' });
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = (newStatus: LiveStreamStatus) => {
    if (!settings) return;
    const preset = STATUS_BANNER_PRESETS[newStatus];
    const updated: LiveStreamSettings = {
      ...settings,
      status: newStatus,
      isLive: newStatus === 'LIVE',
      bannerEnabled: true,
      bannerText: preset?.bannerText || settings.bannerText,
      heroBadge: preset?.heroBadge || settings.heroBadge,
    };
    setSettings(updated);
    // Persist immediately on click!
    saveAll(updated, agenda);
  };

  const handleDetectLiveViewers = async () => {
    if (!settings || !settings.streamUrl) {
      alert('يرجى إدخال رابط البث المباشر أولاً');
      return;
    }
    setDetectingViewers(true);
    setDetectedNotice(null);
    try {
      const res = await fetch(`/api/live/viewers?url=${encodeURIComponent(settings.streamUrl)}`, { cache: 'no-store' });
      const data = await res.json();
      if (data?.count) {
        const updated: LiveStreamSettings = {
          ...settings,
          viewerCount: data.count,
          autoDetectViewers: true,
        };
        setSettings(updated);
        saveAll(updated, agenda);
        if (data.source === 'youtube_live') {
          setDetectedNotice(`✓ تم الكشف بنجاح من يوتيوب لايف: ${Number(data.count).toLocaleString('ar-SA')} مشاهد متواجد الآن`);
        } else if (data.source === 'youtube_views') {
          setDetectedNotice(`✓ تم فحص الفيديو: ${Number(data.count).toLocaleString('ar-SA')} مشاهدة مسجلة`);
        } else {
          setDetectedNotice(`✓ تم ضبط الحضور المباشر: ${Number(data.count).toLocaleString('ar-SA')} مشاهد`);
        }
      }
    } catch {
      setDetectedNotice('تعذر الاتصال برابط البث لجلب المشاهدين');
    } finally {
      setDetectingViewers(false);
      setTimeout(() => setDetectedNotice(null), 6000);
    }
  };

  const handleAddAgendaItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime.trim() || !newTitle.trim()) {
      alert('يرجى إدخال الوقت وعنوان الفقرة');
      return;
    }

    const newItem: LiveAgendaItem = {
      id: Date.now(),
      time: newTime.trim(),
      title: newTitle.trim(),
      description: newDesc.trim(),
      sortOrder: agenda.length + 1,
    };

    const updatedAgenda = [...agenda, newItem];
    setAgenda(updatedAgenda);
    setNewTime('');
    setNewTitle('');
    setNewDesc('');
    saveAll(settings || undefined, updatedAgenda);
  };

  const handleDeleteAgendaItem = (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الفقرة من برنامج الحفل؟')) return;
    const updatedAgenda = agenda.filter((a) => a.id !== id);
    setAgenda(updatedAgenda);
    saveAll(settings || undefined, updatedAgenda);
  };

  const handleUpdateAgendaField = (id: number, field: keyof LiveAgendaItem, val: string) => {
    const updated = agenda.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: val };
      }
      return item;
    });
    setAgenda(updated);
  };

  const handleDeleteCongratulation = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه التهنئة؟')) return;

    try {
      const res = await fetch(`/api/admin/live/congratulations/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('فشل حذف التهنئة');

      setCongratulations(congratulations.filter((c) => c.id !== id));
      setMessage({ type: 'success', text: 'تم حذف التهنئة بنجاح من قاعدة البيانات والموقع' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      alert(err?.message || 'حدث خطأ');
    }
  };

  const handleAddCongratulation = async () => {
    if (!newCongratsName.trim() || !newCongratsBranch.trim() || !newCongratsMsg.trim()) {
      alert('يرجى ملء جميع حقول التهنئة');
      return;
    }

    try {
      const res = await fetch('/api/live/congratulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: newCongratsName.trim(),
          branchOrCity: newCongratsBranch.trim(),
          message: newCongratsMsg.trim(),
        }),
      });

      if (!res.ok) throw new Error('فشل إضافة التهنئة');
      const data = await res.json();
      if (data.congratulation) {
        setCongratulations([data.congratulation, ...congratulations]);
        setNewCongratsName('');
        setNewCongratsBranch('');
        setNewCongratsMsg('');
        setMessage({ type: 'success', text: 'تمت إضافة التهنئة وحفظها في قاعدة البيانات بنجاح' });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err: any) {
      alert(err?.message || 'حدث خطأ أثناء إضافة التهنئة');
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
      </div>
    );
  }

  const activeVideoUrl =
    settings.status === 'ENDED' && settings.recordingUrl
      ? settings.recordingUrl
      : settings.streamUrl;

  const preview = parseVideoUrl(activeVideoUrl);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 p-6 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400">
              <Radio size={16} className="animate-pulse" /> إدارة البث المباشر وحفل التدشين
            </div>
            <h1 className="mt-1 font-display text-2xl font-black sm:text-3xl">
              التحكم في البث المباشر والتدشين الوطني
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              إدارة وقائع البث المباشر لحفل تدشين منصة SA للسياحة وفروع المملكة الـ 13، التحكم الفوري برابط البث والعد التنازلي وبرنامج فعاليات الحفل.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/live"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20"
            >
              <Eye size={15} /> معاينة صفحة البث للزوار ↗
            </a>

            <button
              type="button"
              onClick={() => saveAll()}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-6 py-2.5 text-xs font-black text-navy-950 shadow-gold transition hover:opacity-90 disabled:opacity-50"
            >
              <Save size={15} />
              <span>{saving ? 'جاري الحفظ...' : 'حفظ كافة التعديلات'}</span>
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`flex items-center gap-3 rounded-2xl p-4 text-sm font-semibold transition-all ${
            message.type === 'success'
              ? 'border border-emerald-500/40 bg-emerald-50 text-emerald-800 shadow-sm'
              : 'border border-red-500/40 bg-red-50 text-red-800 shadow-sm'
          }`}
        >
          {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* 3 Status Selector Cards (Immediate Click Action) */}
      <div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          اختر حالة البث الحالية (الضغط يُطبق التغيير فوراً على الموقع):
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Status: UPCOMING */}
          <button
            type="button"
            onClick={() => handleStatusChange('UPCOMING')}
            className={`flex flex-col items-start rounded-2xl border p-5 text-start transition cursor-pointer ${
              settings.status === 'UPCOMING'
                ? 'border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-500/50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-amber-500" />
                <span className="font-bold text-slate-900">قريباً (بث مجدول) ⏳</span>
              </div>
              {settings.status === 'UPCOMING' && (
                <span className="rounded-full bg-amber-600 text-white px-2 py-0.5 text-[10px] font-bold">
                  مفعل الآن
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-600">
              يُظهر للزوار شاشة عد تنازلي فخمة حتى موعد التدشين (الخميس 03:00 م) مع برنامج الفعاليات وإمكانية الإضافة لتقويم Google.
            </p>
          </button>

          {/* Status: LIVE */}
          <button
            type="button"
            onClick={() => handleStatusChange('LIVE')}
            className={`flex flex-col items-start rounded-2xl border p-5 text-start transition cursor-pointer ${
              settings.status === 'LIVE'
                ? 'border-red-500 bg-red-50/80 shadow-md ring-2 ring-red-500/50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
                </span>
                <span className="font-bold text-red-900">مباشر الآن (LIVE) 🔴</span>
              </div>
              {settings.status === 'LIVE' && (
                <span className="rounded-full bg-red-600 text-white px-2 py-0.5 text-[10px] font-bold">
                  مفعل الآن
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-600">
              الحفل يُبث لايف الآن! تفعيل المشغل الفوري المباشر والشريط التنبيهي الأحمر وتفاعل وتبريكات الفروع الحية.
            </p>
          </button>

          {/* Status: ENDED */}
          <button
            type="button"
            onClick={() => handleStatusChange('ENDED')}
            className={`flex flex-col items-start rounded-2xl border p-5 text-start transition cursor-pointer ${
              settings.status === 'ENDED'
                ? 'border-blue-500 bg-blue-50/80 shadow-md ring-2 ring-blue-500/50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-blue-500" />
                <span className="font-bold text-slate-900">انتهى البث (تسجيل الحفل) 🎬</span>
              </div>
              {settings.status === 'ENDED' && (
                <span className="rounded-full bg-blue-600 text-white px-2 py-0.5 text-[10px] font-bold">
                  مفعل الآن
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-600">
              انتهت الفعاليات ويُعرض التسجيل الكامل للحفل للزوار والمتابعين لمشاهدته وإعادته في أي وقت.
            </p>
          </button>
        </div>
      </div>

      {/* Main Settings & Video Grid */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left 7 Columns: Core Settings */}
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Tv size={18} className="text-gold-600" /> تفاصيل ورابط البث
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                عنوان حفل التدشين <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                الوصف التعريفي للحدث
              </label>
              <textarea
                rows={2}
                value={settings.subtitle || ''}
                onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:border-gold-500 focus:outline-none"
              />
            </div>

            {/* Video Stream URL with Quick Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                رابط البث المباشر (YouTube / Vimeo / Facebook / Twitch / Embed / HLS) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=... أو فيميو أو تويتش أو كود iframe"
                value={settings.streamUrl}
                onChange={(e) => setSettings({ ...settings, streamUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-gold-500 focus:outline-none font-mono"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                يقبل كافة المنصات: يوتيوب (Live أو عادي)، فيميو (Vimeo)، فيسبوك لايف، تويتش (Twitch)، روابط البث المباشر (m3u8)، أو كود التضمين الكامل &lt;iframe&gt;.
              </p>

              {/* Quick Preset Buttons */}
              <div className="mt-2.5 flex flex-wrap gap-2">
                <span className="text-[11px] font-bold text-slate-500 self-center">فيديوهات جاهزة للتجربة:</span>
                {PRESET_VIDEOS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSettings({ ...settings, streamUrl: p.url, recordingUrl: p.url });
                    }}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition hover:bg-gold-50 hover:border-gold-400 hover:text-gold-900"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  موعد الحفل وتاريخ الانطلاق (للعد التنازلي)
                </label>
                <input
                  type="datetime-local"
                  value={toLocalInputFormat(settings.scheduledAt)}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSettings({
                        ...settings,
                        scheduledAt: e.target.value,
                      });
                    }
                  }}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-gold-500 focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  مضبوط على الخميس القادم 03:00 م (15:00).
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    عدّاد المشاهدين الحاضرين
                  </label>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      settings.autoDetectViewers !== false
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {settings.autoDetectViewers !== false ? '🟢 كشف تلقائي نشط' : 'يدوي'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    value={settings.viewerCount || 1420}
                    onChange={(e) =>
                      setSettings({ ...settings, viewerCount: Number(e.target.value) || 0 })
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs font-bold focus:border-gold-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleDetectLiveViewers}
                    disabled={detectingViewers || !settings.streamUrl}
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 disabled:opacity-50 cursor-pointer"
                    title="فحص وجلب عدد المشاهدين الحقيقيين الآن من رابط البث"
                  >
                    <RefreshCw size={13} className={detectingViewers ? 'animate-spin' : ''} />
                    <span>{detectingViewers ? 'جاري الفحص...' : 'فحص الرابط'}</span>
                  </button>
                </div>

                {detectedNotice && (
                  <p className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    {detectedNotice}
                  </p>
                )}

                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer pt-0.5">
                  <input
                    type="checkbox"
                    checked={settings.autoDetectViewers !== false}
                    onChange={(e) => {
                      const updated = { ...settings, autoDetectViewers: e.target.checked };
                      setSettings(updated);
                      saveAll(updated, agenda);
                    }}
                    className="h-4 w-4 rounded text-gold-500 focus:ring-gold-400 cursor-pointer"
                  />
                  <span>تحديث تلقائي مستمر لعدد المشاهدين من رابط البث (YouTube Live Sync)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                رابط تسجيل الحفل (بعد الانتهاء)
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={settings.recordingUrl || ''}
                onChange={(e) => setSettings({ ...settings, recordingUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-gold-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Banner & Interaction Settings */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-gold-600" /> الشريط التنبيهي والتفاعل
            </h2>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <div className="text-sm font-bold text-slate-800">
                  تفعيل الشريط التنبيهي العلوي بالموقع
                </div>
                <div className="text-xs text-slate-500">
                  شريط جذاب يظهر في أعلى كافة صفحات الموقع لتوجيه الزوار للبث المباشر.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.bannerEnabled}
                onChange={(e) => {
                  const updated = { ...settings, bannerEnabled: e.target.checked };
                  setSettings(updated);
                  saveAll(updated, agenda);
                }}
                className="h-5 w-5 rounded text-gold-500 focus:ring-gold-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  نص الشريط التنبيهي العلوي بالموقع
                </label>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    settings.status === 'LIVE'
                      ? 'bg-red-100 text-red-700 ring-1 ring-red-400'
                      : settings.status === 'ENDED'
                      ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-400'
                      : 'bg-amber-100 text-amber-800 ring-1 ring-amber-400'
                  }`}
                >
                  الحالة المربوطة: {STATUS_BANNER_PRESETS[settings.status]?.label || settings.status}
                </span>
              </div>
              <input
                type="text"
                value={settings.bannerText}
                onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs focus:border-gold-500 focus:outline-none"
              />
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[11px] text-slate-500 font-medium">قوالب جاهزة:</span>
                <button
                  type="button"
                  onClick={() => {
                    const updated = { ...settings, bannerText: STATUS_BANNER_PRESETS.UPCOMING.bannerText };
                    setSettings(updated);
                    saveAll(updated, agenda);
                  }}
                  className="rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 hover:bg-amber-100 transition"
                >
                  ⏳ قالب المجدول
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const updated = { ...settings, bannerText: STATUS_BANNER_PRESETS.LIVE.bannerText };
                    setSettings(updated);
                    saveAll(updated, agenda);
                  }}
                  className="rounded-lg border border-red-300 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-800 hover:bg-red-100 transition"
                >
                  🔴 قالب لايف الآن
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const updated = { ...settings, bannerText: STATUS_BANNER_PRESETS.ENDED.bannerText };
                    setSettings(updated);
                    saveAll(updated, agenda);
                  }}
                  className="rounded-lg border border-blue-300 bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-800 hover:bg-blue-100 transition"
                >
                  🎬 قالب تسجيل الحفل
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
              <div>
                <div className="text-sm font-bold text-slate-800">
                  السماح بالتبريكات والتهاني المباشرة
                </div>
                <div className="text-xs text-slate-500">
                  تمكين الفروع والزوار من نشر تبريكاتهم لايف على شاشة البث.
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.allowComments}
                onChange={(e) => {
                  const updated = { ...settings, allowComments: e.target.checked };
                  setSettings(updated);
                  saveAll(updated, agenda);
                }}
                className="h-5 w-5 rounded text-gold-500 focus:ring-gold-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Video Live Preview & Congratulations */}
        <div className="space-y-6 lg:col-span-5">
          {/* Live Preview Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Video size={16} className="text-gold-600" /> معاينة المشغل الفورية
              </h3>
              <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[11px] font-semibold">
                {preview.type}
              </span>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              {preview.embedUrl ? (
                preview.type === 'direct' ? (
                  <video src={preview.embedUrl} controls className="h-full w-full object-contain" />
                ) : (
                  <iframe
                    src={preview.embedUrl}
                    title="Live Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                )
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                  لا يوجد رابط صالح للمعاينة
                </div>
              )}
            </div>

            <p className="mt-2 text-[11px] text-slate-500">
              هذه المعاينة توضح تماماً كيف سيشاهد الزوار الفيديو على صفحة البث.
            </p>
          </div>

          {/* Congratulations Management Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare size={16} className="text-gold-600" /> إدارة التبريكات والتهاني (
                {congratulations.length})
              </h3>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pe-1">
              {congratulations.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{c.senderName}</span>
                      <span className="rounded-md bg-gold-100 px-2 py-0.5 text-[10px] font-semibold text-gold-800">
                        {c.branchOrCity}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-600 leading-relaxed">{c.message}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteCongratulation(c.id)}
                    className="text-slate-400 hover:text-red-500 p-1"
                    title="حذف التهنئة"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {congratulations.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-400">
                  لا توجد تهاني مسجلة حالياً
                </div>
              )}
            </div>

            {/* Quick Add Congratulation Form */}
            <div className="mt-4 border-t border-slate-100 pt-3">
              <details className="group">
                <summary className="cursor-pointer text-xs font-bold text-gold-700 hover:text-gold-900 flex items-center gap-1 select-none">
                  <Plus size={14} /> إضافة تهنئة جديدة يدوياً
                </summary>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="اسم المهنئ *"
                      value={newCongratsName}
                      onChange={(e) => setNewCongratsName(e.target.value)}
                      className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-gold-500"
                    />
                    <input
                      type="text"
                      placeholder="الفرع أو المدينة *"
                      value={newCongratsBranch}
                      onChange={(e) => setNewCongratsBranch(e.target.value)}
                      className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-gold-500"
                    />
                  </div>
                  <textarea
                    placeholder="نص التهنئة والتبريك *"
                    rows={2}
                    value={newCongratsMsg}
                    onChange={(e) => setNewCongratsMsg(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs outline-none focus:border-gold-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCongratulation}
                    className="w-full rounded-lg bg-gold-gradient py-1.5 font-bold text-navy-950 shadow-sm hover:opacity-90 transition"
                  >
                    حفظ التهنئة في قاعدة البيانات
                  </button>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          AGENDA & CEREMONY EVENTS PROGRAM (برنامج فعاليات الحفل)
          ========================================================================= */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-600">
              <ListPlus size={16} /> برنامج فعاليات الحفل (الأجندة)
            </div>
            <h2 className="mt-1 font-display text-xl font-bold text-slate-900">
              إدارة وتعديل فقرات حفل التدشين الرسمي
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              تظهر هذه الفقرات في صفحة البث للزوار لتوضيح جدول ومواعيد فعاليات حفل التدشين.
            </p>
          </div>

          <button
            type="button"
            onClick={() => saveAll(settings || undefined, agenda)}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-gold-gradient px-5 py-2 text-xs font-black text-navy-950 shadow-gold transition hover:opacity-90"
          >
            <Save size={14} />
            <span>حفظ جدول الفعاليات</span>
          </button>
        </div>

        {/* Add New Agenda Item Form */}
        <form
          onSubmit={handleAddAgendaItem}
          className="mb-8 rounded-xl border border-gold-400/40 bg-gold-50/40 p-4 space-y-3"
        >
          <div className="text-xs font-bold text-gold-900 flex items-center gap-1.5">
            <Plus size={15} /> إضافة فقرة جديدة إلى برنامج الحفل:
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                وقت الفقرة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: 03:00 م أو 03:15 م"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                عنوان الفقرة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="مثال: الافتتاح والسلام الملكي السعودي"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              تفاصيل ووصف الفقرة
            </label>
            <input
              type="text"
              placeholder="مثال: استقبال ضيوف الشرف وممثلي فروع المملكة وانطلاق مراسم الحفل."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-navy-950 text-white px-4 py-2 text-xs font-bold hover:bg-navy-900 transition"
            >
              <Plus size={14} /> إضافة الفقرة
            </button>
          </div>
        </form>

        {/* Existing Agenda Items List */}
        <div className="space-y-3">
          {agenda.map((item, idx) => (
            <div
              key={item.id || idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-500/20 text-gold-800 text-xs font-black shrink-0">
                  {idx + 1}
                </span>

                <div className="grid gap-2 sm:grid-cols-3 flex-1">
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => handleUpdateAgendaField(item.id, 'time', e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-gold-500"
                  />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateAgendaField(item.id, 'title', e.target.value)}
                    className="sm:col-span-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 focus:border-gold-500"
                  />
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleUpdateAgendaField(item.id, 'description', e.target.value)}
                    className="sm:col-span-3 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDeleteAgendaItem(item.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                  title="حذف الفقرة"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {agenda.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              لا توجد فقرات مسجلة في برنامج الحفل. أضف فقرة جديدة من النموذج أعلاه.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
